import { Table } from 'components/shared/Table/Table';
import useLocationsTableColumns from 'hooks/private/homePage/useLocationsTableColumns';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useLocationZone from '../../api/private/useLocationZone/useLocationZone';

const LocationDetail = () => {
  const { guid } = useParams();
  const [getZoneList, loading, zoneList, pageRef] = useLocationZone(guid);
  const [rows, setRows] = useState(zoneList);

  console.log(zoneList);
  const navigate = useNavigate();

  useEffect(() => {
    getZoneList();
  }, []);

  useEffect(() => {
    setRows(zoneList);
  }, [zoneList]);

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
        rowsData={zoneList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
      />
    </>
  );
};

export default LocationDetail;
