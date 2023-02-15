import useCodeGrouplist from 'api/codeGroup/useCodeGrouplist/useCodeGrouplist';
import CodeGroupInsertModal from 'components/shared/Modals/codeGroup/CodeGroupInsertModal/CodeGroupInsertModal';
import { Table } from 'components/shared/Table/Table';
import useCodeGroupTableColumns from 'hooks/codeGroup/useCodeGroupTableColumns';
import React, { useCallback, useEffect, useState } from 'react';

const CodeGroup = () => {
  const [getCodeGroupList, loading, codeGroupList, pageRef] =
    useCodeGrouplist();

  const [rows, setRows] = useState(codeGroupList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenProduct, setEditChosenProduct] = useState({});

  useEffect(() => {
    getCodeGroupList();
  }, []);

  useEffect(() => {
    setRows(codeGroupList);
  }, [codeGroupList]);

  const goToInfoPage = useCallback(
    row => () =>
      //  navigate(`/locations/${row.id}`),
      console.log(row),
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
      setEditChosenProduct(row);
      setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useCodeGroupTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
  );

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={codeGroupList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="ثبت گروه کد"
        onAddClick={() => setIsInsertModalOpen(true)}
      />

      <CodeGroupInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getCodeGroupList={getCodeGroupList}
      />
    </>
  );
};

export default CodeGroup;
