import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import React from 'react';

const ProductsListInsertModal = ({
  open,
  handleClose,
  insertLoading,
  onInsert,
  insertInputValue,
  insertInputOnchange,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      <DialogTitle>اضافه کردن محصول جدید</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          label="نام محصول جدید"
          variant="standard"
          value={insertInputValue}
          onChange={insertInputOnchange}
          sx={{ minWidth: 300 }}
        />
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
          onClick={() => onInsert()}
          loading={insertLoading}
        >
          ثبت
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProductsListInsertModal;
