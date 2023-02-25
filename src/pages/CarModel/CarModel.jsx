import useCarModelDelete from 'api/carModel/useCarModelDelete/useCarModelDelete';
import useCarModelList from 'api/carModel/useCarModelList/useCarModelList';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import CarModelEditModal from 'components/shared/Modals/carModel/CarModelEditModal/CarModelEditModal';
import CarModelInsertModal from 'components/shared/Modals/carModel/CarModelInsertModal/CarModelInsertModal';
import { Table } from 'components/shared/Table/Table';
import useCarModelTableColumns from 'hooks/carModel/useCarModelTableColumns';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CarModel = () => {
  const { guid } = useParams();
  const [getCarModelList, loading, carModelList, pageRef] =
    useCarModelList(guid);
  const [rows, setRows] = useState(carModelList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenCarModel, setEditChosenCarModel] = useState({});

  const [deleteRequest] = useCarModelDelete();

  const navigate = useNavigate();

  useEffect(() => {
    getCarModelList();
  }, []);

  useEffect(() => {
    setRows(carModelList);
  }, [carModelList]);

  const goToInfoPage = useCallback(
    row => () => navigate(`/carSeries/${row.id}`),
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
      setEditChosenCarModel(row);
      setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useCarModelTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getCarModelList, setIsDeleteModalOpen, setDeleteLoading);
  };

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={carModelList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="ثبت مدل خودرو"
        onAddClick={() => setIsInsertModalOpen(true)}
      />

      <CarModelInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getCarModelList={getCarModelList}
        brandGuid={guid}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <CarModelEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenCarModel={editChosenCarModel}
        getCarModelList={getCarModelList}
      />
    </>
  );
};

export default CarModel;
