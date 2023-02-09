import { Table } from 'components/shared/Table/Table';
import useZoneTableColumns from 'hooks/locationDetail/useZoneTableColumns';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useDeleteZone from '../../api/locationZone/useDeleteZone/useDeleteZone';
import useEditZone from '../../api/locationZone/useEditZone/useEditZone';
import useLocationZone from '../../api/locationZone/useLocationZone/useLocationZone';
import DeleteModal from '../../components/shared/DeleteModal/DeleteModal';
import ZoneEditModal from '../../components/shared/EditModals/locationDetail/ZoneEditModal/ZoneEditModal';

const LocationDetail = () => {
  const { guid } = useParams();
  const [getZoneList, loading, zoneList, pageRef] = useLocationZone(guid);
  const [rows, setRows] = useState(zoneList);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenLocation, setEditChosenLocation] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();
  const [deleteRequest] = useDeleteZone();
  const [editRequest] = useEditZone();

  useEffect(() => {
    getZoneList();
  }, []);

  useEffect(() => {
    setRows(zoneList);
  }, [zoneList]);

  const goToInfoPage = useCallback(
    row => () =>
      // navigate(`/locations/${row.id}`)
      console.log('info'),
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
      setInputValue(row.title);
      setEditChosenLocation(row);
      setIsEditModalOpen(true);
    },
    [],
  );
  const basketsItem = useCallback(row => () => console.log(row, 'basket'), []);

  const [columnsData] = useZoneTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
    basketsItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getZoneList, setIsDeleteModalOpen, setDeleteLoading);
  };

  const editHandle = id => {
    setEditLoading(true);
    editRequest(
      id,
      getZoneList,
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
        rowsData={zoneList}
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

export default LocationDetail;
