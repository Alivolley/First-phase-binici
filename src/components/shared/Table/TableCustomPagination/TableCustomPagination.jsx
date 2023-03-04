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