import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useDeleteBasket = () => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteRequest = (
    guid,
    getBasketList,
    setIsDeleteModalOpen,
    setDeleteLoading,
  ) => {
    axiosClient
      .delete(`InventoryShoppingCart/Delete?GUID=${guid}`)
      .then(res => {
        if (res.status === 200) {
          getBasketList();
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

export default useDeleteBasket;
