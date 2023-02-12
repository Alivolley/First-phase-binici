import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useInsertBasket = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    guid,
    getBasketList,
    handleClose,
    setInsertLoading,
    basketName,
    basketType,
    setBasketName,
    setBasketType,
    // eslint-disable-next-line max-params
  ) => {
    axiosClient
      .post(`InventoryShoppingCart/Insert`, {
        zoneGuid: guid,
        display: basketName,
        type: basketType,
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, { variant: 'success' });
          getBasketList();
          handleClose();
          setBasketName('');
          setBasketType('');
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setInsertLoading(false));
  };
  return [insertRequest];
};

export default useInsertBasket;
