import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useBasketType = () => {
  const [loading, setLoading] = useState(true);
  const [basketTypeList, setBasketTypeList] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const getBasketTypeList = () => {
    setLoading(true);

    axiosClient
      .get(`InventoryShoppingCart/GetShoppingCartTypes`)
      .then(res => {
        if (res.status === 200) {
          setBasketTypeList(res.data.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getBasketTypeList, loading, basketTypeList];
};

export default useBasketType;
