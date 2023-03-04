import useDeleteLocation from 'api/homePage/useDeleteLocation/useDeleteLocation';
import useEditLocation from 'api/homePage/useEditLocation/useEditLocation';
import useInsertLocation from 'api/homePage/useInsertLocation/useInsertLocation';
import useLocationList from 'api/homePage/useLocationList/useLocationList';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import LocationEditModal from 'components/shared/Modals/homePage/LocationEditModal/LocationEditModal';
import LocationInsertModal from 'components/shared/Modals/homePage/LocationInsertModal/LocationInsertModal';
import { Table } from 'components/shared/Table/Table';
import useLocationsTableColumns from 'hooks/homePage/useLocationsTableColumns';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [getLocationList, loading, locationList, pageRef] = useLocationList();

  const [rows, setRows] = useState(locationList);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [editChosenLocation, setEditChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [insertLoading, setInsertLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [insertInputValue, setInsertInputValue] = useState('');

  const [deleteRequest] = useDeleteLocation();
  const [editRequest] = useEditLocation();
  const [insertRequest] = useInsertLocation();

  const navigate = useNavigate();

  useEffect(() => {
    getLocationList();
  }, []);

  useEffect(() => {
    setRows(locationList);
  }, [locationList]);

  const goToInfoPage = useCallback(
    row => () => navigate(`/locations/${row.id}`),
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

  const [columnsData] = useLocationsTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getLocationList, setIsDeleteModalOpen, setDeleteLoading);
  };

  const editHandle = id => {
    if (inputValue) {
      setEditLoading(true);
      editRequest(
        id,
        getLocationList,
        setIsEditModalOpen,
        setEditLoading,
        inputValue,
      );
    }
  };

  const insertHandle = () => {
    if (insertInputValue) {
      setInsertLoading(true);
      insertRequest(
        getLocationList,
        setIsInsertModalOpen,
        setInsertLoading,
        insertInputValue,
        setInsertInputValue,
      );
    }
  };

  const editInputHandler = e => setInputValue(e.target.value);

  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={locationList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
        addLable="اضافه کردن مکان جدید"
        onAddClick={() => setIsInsertModalOpen(true)}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={closeDeleteModal}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <LocationEditModal
        open={isEditModalOpen}
        handleClose={closeEditModal}
        title={editChosenLocation.title}
        locationId={editChosenLocation.id}
        editLoading={editLoading}
        onEdit={editHandle}
        editInputValue={inputValue}
        inputOnchange={editInputHandler}
      />

      <LocationInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        insertLoading={insertLoading}
        onInsert={insertHandle}
        insertInputValue={insertInputValue}
        insertInputOnchange={e => setInsertInputValue(e.target.value)}
      />
    </>
  );
};

export default HomePage;
