import { Table } from 'components/shared/Table/Table';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCarProductionTimeList from '../../api/carProductionTime/useCarProductionTimeList/useCarProductionTimeList';
import CarProductionTimeInsert from '../../components/shared/Modals/carProductionTime/CarProductionTimeInsert/CarProductionTimeInsert';
import useCarProductionTimeTableColumns from '../../hooks/carProductionTime/useCarProductionTimeTableColumns';

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

  //   const [deleteRequest] = useCarSeriesDelete();

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
    // deleteRequest(id, getCarSeriesList, setIsDeleteModalOpen, setDeleteLoading);
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
    </>
  );
};

export default CarProductionTime;
