import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useCallback, useEffect, useRef, useState } from 'react';
import dataGridLocalText from 'utils/js/dataGridLocalText';
import { escapeRegExp, rowDataSearchFilter } from 'utils/js/private/tableUtils';

import { QuickSearchToolbar } from './QuickSearchToolbar/QuickSearchToolbar';
import { TableCustomApiPagination } from './TableCustomPagination/TableCustomPagination';

const Table = props => {
  const {
    columns,
    rowsData = [],
    rows = [],
    disableSelection,
    isDeletable,
    isLoading,
    addLable,
    onAddClick,
    apiRef,
    onPageChange,
    page,
    countPages,
    handleSearchApi,
  } = props;

  const [searchText, setSearchText] = useState('');

  const [selectionModel, setSelectionModel] = useState([]);

  const requestSearch = e => {
    setSearchText(e.target.value);
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

  function handleClearText() {
    setSearchText('');
  }

  function handleSearch() {
    handleSearchApi(searchText);
  }

  return (
    <Container>
      <DataGrid
        loading={isLoading}
        localeText={dataGridLocalText}
        rows={rows}
        columns={columns}
        density="comfortable"
        // pageSize={Number(pageSize)}
        checkboxSelection={!disableSelection}
        onSelectionModelChange={newSelectionModel => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        disableSelectionOnClick
        components={{
          Toolbar: QuickSearchToolbar,
          Pagination: TableCustomApiPagination,
        }}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: event => requestSearch(event),
            onSearchSubmit: handleSearch,
            clearSearch: () => handleClearText(),
            addLable,
            onAddClick,
          },
          pagination: {
            page,
            countPages,
            onPageChange,
          },
        }}
      />
    </Container>
  );
};

const Container = styled(Box)`
  ${({ theme }) => ({
    'width': '100%',
    'height': 'calc(100vh - 200px)',
    '& *': {
      direction: 'rtl',
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: theme.palette.brand.blue.primary,
      color: theme.palette.primary.contrastText,
    },
  })}
`;

export default Table;
