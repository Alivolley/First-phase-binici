import useLocationList from 'api/private/useLocationList/useLocationList';
import { Table } from 'components/shared/Table/Table';
import useLocationsTableColumns from 'hooks/private/homePage/useLocationsTableColumns';
import { useMembersTableColumns } from 'hooks/private/homePage/useMembersTableColumns';
import { rowsData } from 'mocks/membersListMockData';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDeleteLocation from '../../api/private/useDeleteLocation/useDeleteLocation';
import DeleteModal from '../../components/shared/DeleteModal/DeleteModal';

const HomePage = () => {
  const [getLocationList, loading, locationList, pageRef] = useLocationList();

  const [rows, setRows] = useState(locationList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenLocation, setChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [deleteRequest] = useDeleteLocation();

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
      setChosenLocation(row);
      setIsModalOpen(true);
    },
    [],
  );
  const editItem = useCallback(row => () => console.log(row, 'edit'), []);

  const [columnsData] = useLocationsTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getLocationList, setIsModalOpen, setDeleteLoading);
  };

  const closeDeleteModal = () => setIsModalOpen(false);

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
      />

      <DeleteModal
        open={isModalOpen}
        handleClose={closeDeleteModal}
        title={chosenLocation.title}
        locationId={chosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />
    </>
  );
};

export default HomePage;
