import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useGetPrintProductPackaging = guid => {
  const [loading, setLoading] = useState(true);
  const [productItem, setProductItem] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const getProductItem = () => {
    setLoading(true);

    axiosClient
      .get(`Product/Branch/Packaging/Print?Guid=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setProductItem(res.data.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getProductItem, loading, productItem];
};

export default useGetPrintProductPackaging;
