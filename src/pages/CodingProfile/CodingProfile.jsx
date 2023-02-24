import useCodingProfileDelete from 'api/codingProfile/useCodingProfileDelete/useCodingProfileDelete';
import useCodingProfileList from 'api/codingProfile/useCodingProfileLiset/useCodingProfileLiset';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import CodingProfileEditModal from 'components/shared/Modals/codingProfile/CodingProfileEditModal/CodingProfileEditModal';
import CodingProfileInsertModal from 'components/shared/Modals/codingProfile/CodingProfileInsertModal/CodingProfileInsertModal';
import { Table } from 'components/shared/Table/Table';
import useCodingProfileTableColumns from 'hooks/codingProfile/useCodingProfileTableColumns';
import React, { useCallback, useEffect, useState } from 'react';

const CodingProfile = () => {
  const [getCodingProfileList, loading, codingProfileList, pageRef] =
    useCodingProfileList();

  const [rows, setRows] = useState(codingProfileList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenCode, setEditChosenCode] = useState({});

  const [deleteRequest] = useCodingProfileDelete();

  useEffect(() => {
    getCodingProfileList();
  }, []);

  useEffect(() => {
    setRows(codingProfileList);
  }, [codingProfileList]);

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

  const [columnsData] = useCodingProfileTableColumns(deleteItem, editItem);

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(
      id,
      getCodingProfileList,
      setIsDeleteModalOpen,
      setDeleteLoading,
    );
  };

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

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <CodingProfileInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getCodingProfileList={getCodingProfileList}
      />

      <CodingProfileEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenBasket={editChosenCode}
        getCodingProfileList={getCodingProfileList}
      />
    </>
  );
};

export default CodingProfile;
