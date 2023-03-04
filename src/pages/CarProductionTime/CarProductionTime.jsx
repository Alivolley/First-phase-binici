import useCarProductionTimeDelete from 'api/carProductionTime/useCarProductionTimeDelete/useCarProductionTimeDelete';
import useCarProductionTimeList from 'api/carProductionTime/useCarProductionTimeList/useCarProductionTimeList';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import CarProductionTimeEdit from 'components/shared/Modals/carProductionTime/CarProductionTimeEdit/CarProductionTimeEdit';
import CarProductionTimeInsert from 'components/shared/Modals/carProductionTime/CarProductionTimeInsert/CarProductionTimeInsert';
import { Table } from 'components/shared/Table/Table';
import useCarProductionTimeTableColumns from 'hooks/carProductionTime/useCarProductionTimeTableColumns';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CarProductionTime = () => {
  const { guid } = useParams();
  const [getCarProductionTimeList, loading, carProductionTimeList, pageRef] =
    useCarProductionTimeList(guid);
  const [rows, setRows] = useState(carProductionTimeList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenCarProductionTime, setEditChosenCarProductionTime] =
    useState({});

  const [deleteRequest] = useCarProductionTimeDelete();

  useEffect(() => {
    getCarProductionTimeList();
  }, []);

  useEffect(() => {
    setRows(carProductionTimeList);
  }, [carProductionTimeList]);

  const deleteItem = useCallback(
    row => () => {
      setDeleteChosenLocation(row);
      setIsDeleteModalOpen(true);
    },
    [],
  );

  const editItem = useCallback(
    row => () => {
      setEditChosenCarProductionTime(row);
      setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useCarProductionTimeTableColumns(deleteItem, editItem);

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(
      id,
      getCarProductionTimeList,
      setIsDeleteModalOpen,
      setDeleteLoading,
    );
  };

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={carProductionTimeList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="ثبت سال ساخت خودرو"
        onAddClick={() => setIsInsertModalOpen(true)}
      />

      <CarProductionTimeInsert
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getCarProductionTimeList={getCarProductionTimeList}
        seriesGuid={guid}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <CarProductionTimeEdit
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenCarProductionTime={editChosenCarProductionTime}
        getCarProductionTimeList={getCarProductionTimeList}
      />
    </>
  );
};

export default CarProductionTime;
