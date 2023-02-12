import useBasket from 'api/baskets/useBasket/useBasket';
import useDeleteBasket from 'api/baskets/useDeleteBasket/useDeleteBasket';
import useEditZone from 'api/locationZone/useEditZone/useEditZone';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import BasketEditModal from 'components/shared/Modals/basket/BasketEditModal/BasketEditModal';
import BasketInsertModal from 'components/shared/Modals/basket/BasketInsertModal/BasketInsertModal';
import { Table } from 'components/shared/Table/Table';
import useTableBasketColumns from 'hooks/basket/useTableBasketColumns';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Baskets = () => {
  const { guid } = useParams();
  const [getBasketList, loading, basketList, pageRef] = useBasket(guid);
  const [rows, setRows] = useState(basketList);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenBasket, setEditChosenBasket] = useState({});
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);

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
      setEditChosenBasket(row);
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

  // const editHandle = id => {
  //   setEditLoading(true);
  //   editRequest(
  //     id,
  //     getBasketList,
  //     setIsEditModalOpen,
  //     setEditLoading,
  //     inputValue,
  //   );
  // };

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
        addLable="افزودن سبد"
        onAddClick={() => setIsInsertModalOpen(true)}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <BasketEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenBasket={editChosenBasket}
        getBasketList={getBasketList}
      />

      <BasketInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getBasketList={getBasketList}
        guid={guid}
      />
    </>
  );
};

export default Baskets;
