import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useProductDetail = guid => {
  const [loading, setLoading] = useState(true);
  const [productDetailObj, setProductDetailObj] = useState({});
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getProductDetail = () => {
    setLoading(true);

    axiosClient
      .get(`Product/Origin/Details?Guid=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setProductDetailObj(res.data.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getProductDetail, loading, productDetailObj];
};

export default useProductDetail;
