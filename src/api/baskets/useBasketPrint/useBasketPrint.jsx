import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useBasketPrint = guid => {
  const [loading, setLoading] = useState(true);
  const [basketItem, setBasketItem] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const getBasketItem = () => {
    setLoading(true);

    axiosClient
      .get(`InventoryShoppingCart/Print?Guid=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setBasketItem(res.data.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getBasketItem, loading, basketItem];
};

export default useBasketPrint;
