import styled from '@emotion/styled';
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const TableDatePicker = props => {
  const { startDate, endDate, setStartDate, setEndDate } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <DatePicker
          label="Start Date"
          openTo="year"
          value={startDate}
          onChange={newValue => {
            setStartDate(newValue);
          }}
          renderInput={params => <TextField {...params} />}
        />
        <Box sx={{ mx: 2 }}> to </Box>
        <DatePicker
          label="End Date"
          openTo="year"
          value={endDate}
          onChange={newValue => {
            setEndDate(newValue);
          }}
          renderInput={params => <TextField {...params} />}
        />
      </Container>
    </LocalizationProvider>
  );
};

const Container = styled(Box)`
  ${({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '18px',
  })}
`;
