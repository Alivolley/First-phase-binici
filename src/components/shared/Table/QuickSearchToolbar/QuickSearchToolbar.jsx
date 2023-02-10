import styled from '@emotion/styled';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

export const QuickSearchToolbar = props => {
  return (
    <Box>
      <HeaderWrapper>
        <TextField
          variant="outlined"
          value={props.value}
          onChange={props.onChange}
          placeholder="جست و جو ..."
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
          sx={{
            'boxShadow': '0 2px 4px rgba(0,0,0,0.2) inset',
            'border': '2px solid #27348B',
            'borderRadius': '10px',
            'm': theme => theme.spacing(1, 0.5, 1.5),
            '& .MuiSvgIcon-root': {
              mr: 0.5,
            },
          }}
        />

        <AddBtn variant="contained" onClick={props.onAddClick}>
          {props.addLable}
        </AddBtn>
      </HeaderWrapper>
      <GridToolbarContainer>
        <GridToolbarFilterButton sx={{ color: grey[600], ml: 2 }} />
        <GridToolbarDensitySelector sx={{ color: grey[600], ml: 2 }} />
        <GridToolbarColumnsButton sx={{ color: grey[600], ml: 2 }} />
      </GridToolbarContainer>
    </Box>
  );
};

const Container = styled(Box)`
  ${({ theme }) => ({
    p: 2,
    pb: 0,
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  })}
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media all and (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: flex-start;
    margin-top: 15px;
    padding-right: 10px;
  }
`;

const AddBtn = styled(Button)`
  margin-left: 10px;
  background-color: #27348b;
`;
