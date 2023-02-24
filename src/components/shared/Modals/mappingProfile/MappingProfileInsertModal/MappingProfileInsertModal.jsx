import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useMappingProfileInsert from 'api/mappingProfile/useMappingProfileInsert/useMappingProfileInsert';
import React, { useState } from 'react';

const MappingProfileInsertModal = ({
  open,
  handleClose,
  getMappingProfileList,
}) => {
  const [mapName, setMapName] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [insertLoading, setInsertLoading] = useState(false);

  const [insertRequest] = useMappingProfileInsert();

  const submitCodeGroup = () => {
    if (mapName) {
      setEmptyError(false);
      setInsertLoading(true);
      insertRequest(
        getMappingProfileList,
        handleClose,
        setInsertLoading,
        mapName,
        setMapName,
      );
    } else {
      setEmptyError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      <DialogTitle>افزودن مپ پرفایل</DialogTitle>

      <DialogContent>
        <FilledWrapper>
          <FilledLabel>عنوان</FilledLabel>
          <TextField
            autoFocus
            variant="standard"
            value={mapName}
            onChange={e => setMapName(e.target.value)}
            sx={{ minWidth: 300 }}
            error={!mapName && emptyError}
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

export default MappingProfileInsertModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;
