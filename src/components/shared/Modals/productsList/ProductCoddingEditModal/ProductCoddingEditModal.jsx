import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';

import React, { useEffect, useState } from 'react';
import useUpdateCoddingManual from 'api/coddingManual/useUpdateCoddingManual/useUpdateCoddingManual';

const ProductCoddingEditModal = ({
  open,
  handleClose,
  chosenProduct,
  onUpdate,
}) => {
  //   console.log(chosenProduct);
  const [mapName, setMapName] = useState('');

  const { loading, update } = useUpdateCoddingManual();

  useEffect(() => {
    if (chosenProduct?.id) setMapName(chosenProduct.codding);
  }, [chosenProduct]);

  const submitCodeGroup = () => {
    if (mapName) {
      update(chosenProduct?.id, mapName, () => onUpdate(mapName));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      <DialogTitle>ویرایش کدینگ</DialogTitle>

      <DialogContent>
        <FilledWrapper>
          <FilledLabel>عنوان</FilledLabel>
          <TextField
            autoFocus
            variant="standard"
            multiline
            value={mapName}
            onChange={e => setMapName(e.target.value)}
            sx={{ minWidth: 300 }}
            error={!mapName}
          />
        </FilledWrapper>
      </DialogContent>

      <DialogActions sx={{ gap: 1, padding: 3 }}>
        <Button onClick={handleClose} variant="contained" disabled={loading}>
          انصراف
        </Button>
        <LoadingButton
          variant="contained"
          color="warning"
          onClick={submitCodeGroup}
          loading={loading}
        >
          اضافه کردن
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProductCoddingEditModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;
