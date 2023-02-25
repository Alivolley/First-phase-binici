import useCarFactoryList from 'api/carFactory/useCarFactoryList/useCarFactoryList';
import { Table } from 'components/shared/Table/Table';
import useCarFactoryTableColumns from 'hooks/carFactory/useCarFactoryTableColumns';
import React, { useCallback, useEffect, useState } from 'react';
import CarFactoryInsertModal from '../../components/shared/Modals/carFactory/CarFactoryInsertModal/CarFactoryInsertModal';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import useCarFactoryDelete from '../../api/carFactory/useCarFactoryDelete/useCarFactoryDelete';

const CarFactory = () => {
  const [getCarFactoryList, loading, carFactoryList, pageRef] =
    useCarFactoryList();

  const [rows, setRows] = useState(carFactoryList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenCode, setEditChosenCode] = useState({});

  const [deleteRequest] = useCarFactoryDelete();

  useEffect(() => {
    getCarFactoryList();
  }, []);

  useEffect(() => {
    setRows(carFactoryList);
  }, [carFactoryList]);

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
      setEditChosenCode(row);
      setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useCarFactoryTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(
      id,
      getCarFactoryList,
      setIsDeleteModalOpen,
      setDeleteLoading,
    );
  };

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={carFactoryList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="ثبت کارخانه خودرو"
        onAddClick={() => setIsInsertModalOpen(true)}
      />

      <CarFactoryInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getCarFactoryList={getCarFactoryList}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />
    </>
  );
};

export default CarFactory;
