import useCarBrandDelete from 'api/carBrand/useCarBrandDelete/useCarBrandDelete';
import useCarBrandList from 'api/carBrand/useCarBrandList/useCarBrandList';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import CarBrandInsertModal from 'components/shared/Modals/carBrand/CarBrandInsertModal/CarBrandInsertModal';
import { Table } from 'components/shared/Table/Table';
import useCarBrandTableColumns from 'hooks/carBrand/useCarBrandTableColumns';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarBrandEditModal from '../../components/shared/Modals/carBrand/CarBrandEditModal/CarBrandEditModal';

const CarBrand = () => {
  const { guid } = useParams();
  const [getCarBrandList, loading, carBrandList, pageRef] =
    useCarBrandList(guid);
  const [rows, setRows] = useState(carBrandList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenCarBrand, setEditChosenCarBrand] = useState({});

  const [deleteRequest] = useCarBrandDelete();

  useEffect(() => {
    getCarBrandList();
  }, []);

  useEffect(() => {
    setRows(carBrandList);
  }, [carBrandList]);

  const goToInfoPage = useCallback(
    row => () => console.log('object'),
    // navigate(`/codingAttribute/${row.id}`),
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
      setEditChosenCarBrand(row);
      setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useCarBrandTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getCarBrandList, setIsDeleteModalOpen, setDeleteLoading);
  };

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={carBrandList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="ثبت برند خودرو"
        onAddClick={() => setIsInsertModalOpen(true)}
      />

      <CarBrandInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getCarBrandList={getCarBrandList}
        factoryGuid={guid}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <CarBrandEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenCarBrand={editChosenCarBrand}
        getCarBrandList={getCarBrandList}
      />
    </>
  );
};

export default CarBrand;
