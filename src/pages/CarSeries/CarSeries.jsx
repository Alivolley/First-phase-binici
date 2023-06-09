import useCarSeriesDelete from 'api/carSeries/useCarSeriesDelete/useCarSeriesDelete';
import useCarSeriesList from 'api/carSeries/useCarSeriesList/useCarSeriesList';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import CarSeriesEditModal from 'components/shared/Modals/carSeries/CarSeriesEditModal/CarSeriesEditModal';
import CarSeriesInsertModal from 'components/shared/Modals/carSeries/CarSeriesInsertModal/CarSeriesInsertModal';
import { Table } from 'components/shared/Table/Table';
import useCarSeriesTableColumns from 'hooks/carSeries/useCarSeriesTableColumns';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CarSeries = () => {
  const { guid } = useParams();
  const [getCarSeriesList, loading, carSeriesList, pageRef] =
    useCarSeriesList(guid);
  const [rows, setRows] = useState(carSeriesList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenCarSeries, setEditChosenCarSeries] = useState({});

  const [deleteRequest] = useCarSeriesDelete();

  const navigate = useNavigate();

  useEffect(() => {
    getCarSeriesList();
  }, []);

  useEffect(() => {
    setRows(carSeriesList);
  }, [carSeriesList]);

  const goToInfoPage = useCallback(
    row => () => navigate(`/carProductionTime/${row.id}`),
    [],
  );

  const deleteItem = useCallback(
    row => () => {
      setDeleteChosenLocation(row);
      setIsDeleteModalOpen(true);
    },
    [],
  );

  const editItem = useCallback(
    row => () => {
      setEditChosenCarSeries(row);
      setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useCarSeriesTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getCarSeriesList, setIsDeleteModalOpen, setDeleteLoading);
  };

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={carSeriesList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="ثبت سری خودرو"
        onAddClick={() => setIsInsertModalOpen(true)}
      />

      <CarSeriesInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getCarSeriesList={getCarSeriesList}
        modelGuid={guid}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <CarSeriesEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenCarSeries={editChosenCarSeries}
        getCarSeriesList={getCarSeriesList}
      />
    </>
  );
};

export default CarSeries;
