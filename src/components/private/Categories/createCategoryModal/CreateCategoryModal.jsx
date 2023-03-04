import { LoadingButton } from '@mui/lab';
import {
  Button,
  CircularProgress,
  DialogTitle,
  TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useCreateCategory from 'api/categories/useCreateCategory';
import React, { useState } from 'react';

const CreateCategoryModal = props => {
  const [loading, createCategory] = useCreateCategory();
  const [categoryValues, setCategoryValues] = useState({
    name: '',
    order: '',
  });

  return (
    <Dialog
      open={props.show}
      onClose={props.closeHandler}
      sx={{ direction: 'rtl' }}
    >
      <DialogTitle>افزودن دسته بندی</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          label="نام گروه"
          variant="standard"
          value={categoryValues.name}
          onChange={e =>
            setCategoryValues({ ...categoryValues, name: e.target.value })
          }
          sx={{ minWidth: 300 }}
        />
      </DialogContent>

      <DialogActions sx={{ gap: 1, padding: 3 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={() =>
            createCategory(
              categoryValues,
              props.selectedCategoryGuid,
              props.refreshData,
            )
          }
        >
          تایید
        </Button>
        <LoadingButton
          variant="contained"
          color="warning"
          loading={loading}
          onClick={props.closeHandler}
        >
          انصراف
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCategoryModal;
