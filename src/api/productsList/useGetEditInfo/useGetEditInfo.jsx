import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useGetEditInfo = () => {
  const [loading, setLoading] = useState(true);
  const [gottenProduct, setGottenProduct] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const getEditInfo = (guid, setProductName, setPreFixName, setExplain) => {
    setLoading(true);

    axiosClient
      .get(`Product/Origin/Update?GUID=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setGottenProduct(res.data.value);
          setProductName(res.data.value.title);
          setPreFixName(res.data.value.preFix);
          setExplain(res.data.value.description);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getEditInfo, loading, gottenProduct];
};

export default useGetEditInfo;
