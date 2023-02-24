import useAttributeList from 'api/codingAttribute/useAttributeList/useAttributeList';
import useDeleteAttribute from 'api/codingAttribute/useDeleteAttribute/useDeleteAttribute';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import CodeAttributeInsertModal from 'components/shared/Modals/codeAttribute/CodeAttributeInsertModal/CodeAttributeInsertModal';
import { Table } from 'components/shared/Table/Table';
import useTableAttributeColumns from 'hooks/codingAttribute/useTableAttributeColumns';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CodingAttribute = () => {
  const { guid } = useParams();
  const [getAttributeList, loading, attributeList, pageRef] =
    useAttributeList(guid);
  const [rows, setRows] = useState(attributeList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [deleteRequest] = useDeleteAttribute();

  useEffect(() => {
    getAttributeList();
  }, []);

  useEffect(() => {
    setRows(attributeList);
  }, [attributeList]);

  const deleteItem = useCallback(
    row => () => {
      setDeleteChosenLocation(row);
      setIsDeleteModalOpen(true);
    },
    [],
  );

  const editItem = useCallback(
    row => () => {
      //   setEditChosenBasket(row);
      //   setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useTableAttributeColumns(deleteItem, editItem);

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getAttributeList, setIsDeleteModalOpen, setDeleteLoading);
  };

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={attributeList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="ثبت مقدار"
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

      <CodeAttributeInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getAttributeList={getAttributeList}
        groupGuid={guid}
      />
    </>
  );
};

export default CodingAttribute;
