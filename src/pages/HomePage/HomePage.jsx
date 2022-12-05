import { PageTemplate } from 'components/layout/PageTemplate/PageTemplate';
import { Table } from 'components/shared/Table/Table';
import { useMembersTableColumns } from 'hooks/private/homePage/useMembersTableColumns';
import { rowsData } from 'mocks/membersListMockData';
import { useCallback, useEffect, useState } from 'react';

const HomePage = () => {
  const [rows, setRows] = useState(rowsData);

  useEffect(() => {
    setRows(rowsData);
  }, [rowsData]);

  const showDescription = useCallback(row => () => console.log(row), []);
  const showAdditionals = useCallback(row => () => console.log(row), []);

  const [columnsData] = useMembersTableColumns(
    showDescription,
    showAdditionals,
  );

  return (
    <div>لورم ایپسوم</div>
    // <Table
    //   columns={columnsData}
    //   rowsData={rowsData}
    //   rows={rows}
    //   isDeletable
    //   setRows={filteredRows => setRows(filteredRows)}
    // />
  );
};

export default HomePage;
