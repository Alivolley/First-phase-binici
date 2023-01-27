import styled from '@emotion/styled';
import { Delete } from '@mui/icons-material';
import {
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { GridSelectedRowCount } from '@mui/x-data-grid';

import { TableCustomPagination } from '../TableCustomPagination/TableCustomPagination';

export const TableCustomFooter = props => {
  const { rowsCount, pageSize, isDeletable, setPageSize, onDeleteRows } = props;

  return (
    <Container>
      <RowsWrapper>
        {rowsCount > 0 && (
          <>
            {isDeletable ? (
              <IconButton aria-label="Delete" onClick={onDeleteRows}>
                <Delete />
              </IconButton>
            ) : null}
            <GridSelectedRowCount selectedRowCount={rowsCount} />
          </>
        )}
      </RowsWrapper>
      <Options>
        <Stack direction="row" spacing={1} alignItems="flex-end" mr={3}>
          <Typography id="rows-per-page-label" variant="body2" component="span">
            تعداد در هر صفحه
          </Typography>

          <Box sx={{ width: '60px', display: 'flex', alignItems: 'center' }}>
            <FormControl variant="standard" fullWidth>
              <Select
                labelId="pageSize-label"
                id="pageSize-selection"
                value={pageSize.toString()}
                defaultValue="6"
                sx={{ textAlign: 'center' }}
                onChange={e => setPageSize(e.target.value)}
              >
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="12">12</MenuItem>
                <MenuItem value="18">18</MenuItem>
                <MenuItem value="24">24</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <TableCustomPagination />
      </Options>
    </Container>
  );
};

const Container = styled(Box)`
  ${({ theme }) => ({
    padding: '12px 10px 12px 4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  })}
`;

const RowsWrapper = styled(Box)`
  ${({ theme }) => ({
    padding: '0',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  })}
`;

const Options = styled(Box)`
  ${({ theme }) => ({
    padding: '0',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  })}
`;
