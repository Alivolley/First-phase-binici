import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useMappingProfileEdit from 'api/mappingProfile/useMappingProfileEdit/useMappingProfileEdit';
import React, { useEffect, useState } from 'react';

const MappingProfileEditModal = ({
  open,
  handleClose,
  chosenBasket,
  getMappingProfileList,
}) => {
  const [mapName, setMapName] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [editRequest] = useMappingProfileEdit();

  useEffect(() => {
    setMapName(chosenBasket.title);
  }, [chosenBasket]);

  const submitCodeGroup = () => {
    if (mapName) {
      setEmptyError(false);
      setEditLoading(true);
      editRequest(
        chosenBasket.id,
        getMappingProfileList,
        handleClose,
        setEditLoading,
        mapName,
      );
    } else {
      setEmptyError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      <DialogTitle>ویرایش مپ پرفایل</DialogTitle>

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
          disabled={editLoading}
        >
          انصراف
        </Button>
        <LoadingButton
          variant="contained"
          color="warning"
          onClick={submitCodeGroup}
          loading={editLoading}
        >
          اضافه کردن
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default MappingProfileEditModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;
