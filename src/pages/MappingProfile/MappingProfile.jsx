import useMappingProfileDelete from 'api/mappingProfile/useMappingProfileDelete/useMappingProfileDelete';
import useMappingProfileList from 'api/mappingProfile/useMappingProfileList/useMappingProfileList';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import MappingProfileEditModal from 'components/shared/Modals/mappingProfile/MappingProfileEditModal/MappingProfileEditModal';
import MappingProfileInsertModal from 'components/shared/Modals/mappingProfile/MappingProfileInsertModal/MappingProfileInsertModal';
import { Table } from 'components/shared/Table/Table';
import useMappingProfilTableColumns from 'hooks/mappingProfile/useMappingProfilTableColumns';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MappingProfile = () => {
  const [getMappingProfileList, loading, mappingProfileList, pageRef] =
    useMappingProfileList();

  const [rows, setRows] = useState(mappingProfileList);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenCode, setEditChosenCode] = useState({});

  const navigate = useNavigate();
  const [deleteRequest] = useMappingProfileDelete();

  //   const [deleteRequest] = useCodingProfileDelete();

  useEffect(() => {
    getMappingProfileList();
  }, []);

  useEffect(() => {
    setRows(mappingProfileList);
  }, [mappingProfileList]);

  const goToInfoPage = useCallback(
    row => () => console.log(row),
    //  navigate(`/codingAttribute/${row.id}`),
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

  const [columnsData] = useMappingProfilTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(
      id,
      getMappingProfileList,
      setIsDeleteModalOpen,
      setDeleteLoading,
    );
  };

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={mappingProfileList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="ثبت مپ پروفایل"
        onAddClick={() => setIsInsertModalOpen(true)}
      />

      <MappingProfileInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getMappingProfileList={getMappingProfileList}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <MappingProfileEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenBasket={editChosenCode}
        getMappingProfileList={getMappingProfileList}
      />
    </>
  );
};

export default MappingProfile;
