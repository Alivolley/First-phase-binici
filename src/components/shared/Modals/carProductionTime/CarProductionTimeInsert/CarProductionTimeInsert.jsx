import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useCarProductionTimeInsert from 'api/carProductionTime/useCarProductionTimeInsert/useCarProductionTimeInsert';
import React, { useState } from 'react';

const CarProductionTimeInsert = ({
  open,
  handleClose,
  getCarProductionTimeList,
  seriesGuid,
}) => {
  const [carProductionName, setCarProductionName] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [insertLoading, setInsertLoading] = useState(false);

  const [insertRequest] = useCarProductionTimeInsert();

  const submitCodeGroup = () => {
    if (carProductionName) {
      setEmptyError(false);
      setInsertLoading(true);
      insertRequest(
        seriesGuid,
        getCarProductionTimeList,
        handleClose,
        setInsertLoading,
        carProductionName,
        setCarProductionName,
      );
    } else {
      setEmptyError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      <DialogTitle>ثبت سال ساخت خودرو</DialogTitle>

      <DialogContent>
        <FilledWrapper>
          <FilledLabel>عنوان</FilledLabel>
          <TextField
            autoFocus
            variant="standard"
            value={carProductionName}
            onChange={e => setCarProductionName(e.target.value)}
            sx={{ minWidth: 300 }}
            error={!carProductionName && emptyError}
          />
        </FilledWrapper>
      </DialogContent>

      <DialogActions sx={{ gap: 1, padding: 3 }}>
        <Button
          onClick={handleClose}
          variant="contained"
          disabled={insertLoading}
        >
          انصراف
        </Button>
        <LoadingButton
          variant="contained"
          color="warning"
          onClick={submitCodeGroup}
          loading={insertLoading}
        >
          اضافه کردن
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CarProductionTimeInsert;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;
