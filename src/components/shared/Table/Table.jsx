import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { escapeRegExp, rowDataSearchFilter } from 'utils/js/private/tableUtils';

import { QuickSearchToolbar } from './QuickSearchToolbar/QuickSearchToolbar';
import { TableCustomFooter } from './TableCustomFooter/TableCustomFooter';
import { TableCustomPagination } from './TableCustomPagination/TableCustomPagination';

export const Table = props => {
  const { columns, rowsData, rows, disableSelection, isDeletable, setRows } =
    props;

  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState('6');

  const [selectionModel, setSelectionModel] = useState([]);

  const requestSearch = searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = rowDataSearchFilter(rowsData, searchRegex);
    setRows(filteredRows);
  };

  return (
    <Container>
      <DataGrid
        pagination
        rows={rows}
        columns={columns}
        density="comfortable"
        pageSize={Number(pageSize)}
        checkboxSelection={!disableSelection}
        onSelectionModelChange={newSelectionModel => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        disableSelectionOnClick
        components={{
          Toolbar: QuickSearchToolbar,
          Pagination: TableCustomPagination,
          Footer: TableCustomFooter,
        }}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: event => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
          footer: {
            rowsCount: selectionModel.length,
            pageSize,
            isDeletable,
            setPageSize: value => setPageSize(value),
            onDeleteRows: () => {
              const rowsCopy = [...rows];
              const updatedRows = rowsCopy.filter(
                row => !selectionModel.includes(row.id),
              );
              setRows(updatedRows);
            },
          },
        }}
      />
    </Container>
  );
};

const Container = styled(Box)`
  ${({ theme }) => ({
    'width': '100%',
    'height': '640px',
    'direction': 'ltr',
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: theme.palette.brand.blue.primary,
      color: theme.palette.primary.contrastText,
    },
  })}
`;
