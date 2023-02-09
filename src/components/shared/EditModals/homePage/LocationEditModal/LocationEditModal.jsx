import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';

const LocationEditModal = ({
  open,
  handleClose,
  title,
  locationId,
  editLoading,
  onEdit,
  editInputValue,
  inputOnchange,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      <DialogTitle>ویرایش مکان</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          label="نام جدید مکان"
          variant="standard"
          value={editInputValue}
          onChange={inputOnchange}
          sx={{ minWidth: 300 }}
        />
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
          onClick={() => onEdit(locationId)}
          loading={editLoading}
        >
          ویرایش
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default LocationEditModal;
