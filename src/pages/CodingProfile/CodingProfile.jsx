import useCodingProfileList from 'api/codingProfile/useCodingProfileLiset/useCodingProfileLiset';
import { Table } from 'components/shared/Table/Table';
import useCodingProfileTableColumns from 'hooks/codingProfile/useCodingProfileTableColumns';
import React, { useCallback, useEffect, useState } from 'react';

const CodingProfile = () => {
  const [getCodingProfileList, loading, codingProfileList, pageRef] =
    useCodingProfileList();

  const [rows, setRows] = useState(codingProfileList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);

  useEffect(() => {
    getCodingProfileList();
  }, []);

  useEffect(() => {
    setRows(codingProfileList);
  }, [codingProfileList]);

  const deleteItem = useCallback(
    row => () => {
      //   setDeleteChosenLocation(row);
      //   setIsDeleteModalOpen(true);
    },
    [],
  );

  const editItem = useCallback(
    row => () => {
      //   setEditChosenCode(row);
      //   setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useCodingProfileTableColumns(deleteItem, editItem);

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={codingProfileList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="ثبت کد پروفایل"
        onAddClick={() => setIsInsertModalOpen(true)}
      />
    </>
  );
};

export default CodingProfile;
