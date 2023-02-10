import useEditZone from 'api/locationZone/useEditZone/useEditZone';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import ZoneEditModal from 'components/shared/Modals/locationDetail/ZoneEditModal/ZoneEditModal';
import { Table } from 'components/shared/Table/Table';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useBasket from '../../api/baskets/useBasket/useBasket';
import useDeleteBasket from '../../api/baskets/useDeleteBasket/useDeleteBasket';
import useTableBasketColumns from '../../hooks/basket/useTableBasketColumns';

const Baskets = () => {
  const { guid } = useParams();
  const [getBasketList, loading, basketList, pageRef] = useBasket(guid);
  const [rows, setRows] = useState(basketList);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenLocation, setEditChosenLocation] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();
  const [deleteRequest] = useDeleteBasket();
  const [editRequest] = useEditZone();

  useEffect(() => {
    getBasketList();
  }, []);

  useEffect(() => {
    setRows(basketList);
  }, [basketList]);

  const printBasket = useCallback(row => () => window.print(), []);
  const deleteItem = useCallback(
    row => () => {
      setDeleteChosenLocation(row);
      setIsDeleteModalOpen(true);
    },
    [],
  );
  const editItem = useCallback(
    row => () => {
      setInputValue(row.title);
      setEditChosenLocation(row);
      setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useTableBasketColumns(
    printBasket,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getBasketList, setIsDeleteModalOpen, setDeleteLoading);
  };

  const editHandle = id => {
    setEditLoading(true);
    editRequest(
      id,
      getBasketList,
      setIsEditModalOpen,
      setEditLoading,
      inputValue,
    );
  };

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={basketList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <ZoneEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        title={editChosenLocation.title}
        locationId={editChosenLocation.id}
        editLoading={editLoading}
        onEdit={editHandle}
        editInputValue={inputValue}
        inputOnchange={e => setInputValue(e.target.value)}
      />
    </>
  );
};

export default Baskets;
