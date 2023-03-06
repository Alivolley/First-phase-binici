import styled from '@emotion/styled';
import { DataGrid } from '@mui/x-data-grid';
import React, { useCallback, useEffect } from 'react';

const AccordionTable = ({ columns, rows }) => {

  return (
    <Container>
      <DataGrid
        sx={{ height: '100%', marginTop: 3 }}
        rows={rows}
        columns={columns}
        density="comfortable"
        hideFooter
      />
    </Container>
  );
};

export default AccordionTable;

const Container = styled.div`
  height: 300px;
`;
