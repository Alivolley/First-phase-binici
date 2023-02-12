import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useEditBasket = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    id,
    getBasketList,
    handleClose,
    setEditLoading,
    basketName,
    basketType,
  ) => {
    axiosClient
      .put(`/InventoryShoppingCart/Update`, {
        guid: id,
        display: basketName,
        type: basketType,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, { variant: 'success' });
          getBasketList();
          handleClose();
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setEditLoading(false));
  };
  return [editRequest];
};

export default useEditBasket;
