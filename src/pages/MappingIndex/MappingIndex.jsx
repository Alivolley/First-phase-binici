import useMappingIndexList from 'api/mappingIndex/useMappingIndexList/useMappingIndexList';
import { Table } from 'components/shared/Table/Table';
import useMappingIndexTableColumns from 'hooks/mappingIndex/useMappingIndexTableColumns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MappingIndex = () => {
  const { guid } = useParams();

  const [getMappingIndexList, loading, mappingIndexList, pageRef] =
    useMappingIndexList(guid);

  const [rows, setRows] = useState(mappingIndexList);

  useEffect(() => {
    getMappingIndexList();
  }, []);

  useEffect(() => {
    setRows(mappingIndexList);
  }, [mappingIndexList]);

  const [columnsData] = useMappingIndexTableColumns();
  return (
    <>
      <div>{pageRef.refTitle}</div>
      <Table
        columns={columnsData}
        rowsData={mappingIndexList}
        rows={rows}
        isDeletable
        setRows={filteredRows => setRows(filteredRows)}
        isLoading={loading}
      />
    </>
  );
};

export default MappingIndex;
