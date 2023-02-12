import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useDeleteProduct = () => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteRequest = (
    guid,
    getProductsList,
    setIsDeleteModalOpen,
    setDeleteLoading,
  ) => {
    axiosClient
      .delete(`Product/Origin/Delete?GUID=${guid}`)
      .then(res => {
        if (res.status === 200) {
          getProductsList();
          setIsDeleteModalOpen(false);
          enqueueSnackbar(`حذف با موفقیت انجام شد`, { variant: 'success' });
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setDeleteLoading(false));
  };
  return [deleteRequest];
};

export default useDeleteProduct;
