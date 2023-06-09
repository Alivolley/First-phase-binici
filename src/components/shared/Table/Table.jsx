import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import dataGridLocalText from 'utils/js/dataGridLocalText';
import { escapeRegExp, rowDataSearchFilter } from 'utils/js/private/tableUtils';

import { QuickSearchToolbar } from './QuickSearchToolbar/QuickSearchToolbar';
import { TableCustomFooter } from './TableCustomFooter/TableCustomFooter';
import { TableCustomPagination } from './TableCustomPagination/TableCustomPagination';

export const Table = props => {
  const {
    columns,
    rowsData,
    rows,
    disableSelection,
    isDeletable,
    setRows,
    isLoading,
    addLable,
    onAddClick,
    apiRef,
  } = props;

  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState('6');

  const [selectionModel, setSelectionModel] = useState([]);

  const requestSearch = searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = rowDataSearchFilter(rowsData, searchRegex);
    setRows(filteredRows);
  };

  const onScroll = useCallback(
    event => {
      const x = apiRef.current?.getScrollPosition().left;
      apiRef.current.columnHeadersContainerElementRef.current.scrollLeft = x;
    },
    [apiRef?.current, apiRef],
  );

  useEffect(() => {
    setTimeout(() => {
      apiRef.current?.windowRef?.current?.removeEventListener(
        'scroll',
        onScroll,
      );
      apiRef.current?.windowRef?.current?.addEventListener('scroll', onScroll);
    }, 0);
    return () => {
      apiRef?.current?.windowRef?.current?.removeEventListener(
        'scroll',
        onScroll,
      );
    };
  }, [apiRef, onScroll, columns.length]);

  return (
    <Container>
      <DataGrid
        loading={isLoading}
        localeText={dataGridLocalText}
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
            addLable,
            onAddClick,
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
        sx={{
          '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
            outline: 'none !important',
          },
          'root': {
            '& .MuiDataGrid-columnsContainer': {
              direction: 'ltr',
            },
            '& .MuiDataGrid-virtualScroller': {
              direction: 'ltr',
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
    '& *': {
      direction: 'rtl'
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: theme.palette.brand.blue.primary,
      color: theme.palette.primary.contrastText,
    },
  })}
`;
