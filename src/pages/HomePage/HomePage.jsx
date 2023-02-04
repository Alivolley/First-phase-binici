import useLocationListApi from 'api/private/useLocationListApi/useLocationListApi';
import { PageTemplate } from 'components/layout/PageTemplate/PageTemplate';
import { Table } from 'components/shared/Table/Table';
import useLocationsTableColumns from 'hooks/private/homePage/useLocationsTableColumns';
import { useMembersTableColumns } from 'hooks/private/homePage/useMembersTableColumns';
import { rowsData } from 'mocks/membersListMockData';
import { useCallback, useEffect, useMemo, useState } from 'react';

const HomePage = () => {
  const [getLocationList, loading, locationList, refTitle] =
    useLocationListApi();
  const [rows, setRows] = useState(locationList);

  useEffect(() => {
    getLocationList();
  }, []);

  useEffect(() => {
    setRows(locationList);
  }, [locationList]);

  const showDescription = useCallback(row => () => console.log(row), []);
  const showAdditionals = useCallback(row => () => console.log(row), []);

  const [columnsData] = useLocationsTableColumns(
    showDescription,
    showAdditionals,
  );

  return (
    <>
      <div>{refTitle}</div>
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
