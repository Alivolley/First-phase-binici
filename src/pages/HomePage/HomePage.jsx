import useLocationListApi from 'api/private/useLocationList/useLocationList';
import { PageTemplate } from 'components/layout/PageTemplate/PageTemplate';
import { Table } from 'components/shared/Table/Table';
import useLocationsTableColumns from 'hooks/private/homePage/useLocationsTableColumns';
import { useMembersTableColumns } from 'hooks/private/homePage/useMembersTableColumns';
import { rowsData } from 'mocks/membersListMockData';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [getLocationList, loading, locationList, pageRef] =
    useLocationListApi();
  const [rows, setRows] = useState(locationList);

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
  const deleteItem = useCallback(row => () => console.log(row, 'delete'), []);
  const editItem = useCallback(row => () => console.log(row, 'edit'), []);

  const [columnsData] = useLocationsTableColumns(
    goToInfoPage,
    deleteItem,
    editItem,
  );

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
    </>
  );
};

export default HomePage;
