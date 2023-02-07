import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import React from 'react';

const DeleteModal = ({
  open,
  handleClose,
  title,
  locationId,
  deleteLoading,
  onDelete,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
        <DialogTitle>
          آیا از حذف <q>{title}</q> مطمئن هستید ؟
        </DialogTitle>

        <DialogActions sx={{ gap: 1 }}>
          <Button
            onClick={handleClose}
            variant="contained"
            disabled={deleteLoading}
          >
            انصراف
          </Button>
          <LoadingButton
            variant="contained"
            color="error"
            onClick={() => onDelete(locationId)}
            loading={deleteLoading}
          >
            حذف
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
