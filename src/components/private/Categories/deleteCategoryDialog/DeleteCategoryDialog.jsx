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
import useDeleteCategory from 'api/categories/useDeleteCategory';

const DeleteCategoryDialog = props => {
  const [loading, deleteCategory] = useDeleteCategory();

  return (
    <Dialog
      open={props.show}
      onClose={props.closeHandler}
      sx={{ direction: 'rtl' }}
    >
      <DialogTitle>حذف دسته بندی</DialogTitle>

      <DialogContent>از حذف اطمینان دارید؟</DialogContent>

      <DialogActions sx={{ gap: 1, padding: 3 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={() =>
            deleteCategory(props.selectedCategoryGuid, props.refreshData)
          }
        >
          حذف
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

export default DeleteCategoryDialog;
