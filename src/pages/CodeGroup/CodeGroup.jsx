import useCodeGroupDelete from 'api/codeGroup/useCodeGroupDelete/useCodeGroupDelete';
import useCodeGrouplist from 'api/codeGroup/useCodeGrouplist/useCodeGrouplist';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import CodeGroupEditModal from 'components/shared/Modals/codeGroup/CodeGroupEditModal/CodeGroupEditModal';
import CodeGroupInsertModal from 'components/shared/Modals/codeGroup/CodeGroupInsertModal/CodeGroupInsertModal';
import { Table } from 'components/shared/Table/Table';
import useCodeGroupTableColumns from 'hooks/codeGroup/useCodeGroupTableColumns';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CodeGroup = () => {
  const [getCodeGroupList, loading, codeGroupList, pageRef] =
    useCodeGrouplist();

  const [rows, setRows] = useState(codeGroupList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenCode, setEditChosenCode] = useState({});

  const [deleteRequest] = useCodeGroupDelete();
  const navigate = useNavigate();

  useEffect(() => {
    getCodeGroupList();
  }, []);

  useEffect(() => {
    setRows(codeGroupList);
  }, [codeGroupList]);

  const goToInfoPage = useCallback(
    row => () => navigate(`/codingAttribute/${row.id}`),
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

  const [columnsData] = useCodeGroupTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getCodeGroupList, setIsDeleteModalOpen, setDeleteLoading);
  };

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

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <CodeGroupInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getCodeGroupList={getCodeGroupList}
      />

      <CodeGroupEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenBasket={editChosenCode}
        getCodeGroupList={getCodeGroupList}
      />
    </>
  );
};

export default CodeGroup;
