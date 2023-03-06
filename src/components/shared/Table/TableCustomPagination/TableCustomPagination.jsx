import Pagination from '@mui/material/Pagination';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

export const TableCustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      sx={{ direction: 'ltr' }}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
};

export const TableCustomApiPagination = ({
  countPages,
  page,
  onPageChange,
}) => {
  return (
    <Pagination
      color="primary"
      count={countPages}
      page={page}
      sx={{ direction: 'ltr' }}
      onChange={(event, value) => onPageChange(value)}
    />
  );
};
