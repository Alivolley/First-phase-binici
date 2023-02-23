import useAttributeList from 'api/codingAttribute/useAttributeList/useAttributeList';
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

  useEffect(() => {
    getAttributeList();
  }, []);

  useEffect(() => {
    setRows(attributeList);
  }, [attributeList]);

  const deleteItem = useCallback(
    row => () => {
      //   setDeleteChosenLocation(row);
      //   setIsDeleteModalOpen(true);
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
    </>
  );
};

export default CodingAttribute;
