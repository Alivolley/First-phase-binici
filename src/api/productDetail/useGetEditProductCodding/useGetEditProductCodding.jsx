import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useGetEditProductCodding = () => {
  const [loading, setLoading] = useState(true);
  const [gottenProduct, setGottenProduct] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const getEditInfo = (guid, setProductName) => {
    setLoading(true);

    axiosClient
      .get(`Product/Branch/Codding/System/Update?GUID=${guid}`)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          setGottenProduct(res.data.value);
          setProductName(res.data.value.title);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getEditInfo, loading, gottenProduct];
};

export default useGetEditProductCodding;
