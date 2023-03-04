import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useGetInfoProductDetail = () => {
  const [getInfoLoading, setGetInfoLoading] = useState(true);
  const [gottenProduct, setGottenProduct] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const getEditInfo = (
    guid,
    setPackageName,
    setExplain,
    setPackageLenght,
    setPackageType,
  ) => {
    setGetInfoLoading(true);

    axiosClient
      .get(`Product/Branch/Packaging/Update?GUID=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setGottenProduct(res.data.value);
          setPackageName(res.data.value.display);
          setExplain(res.data.value.description || '');
          setPackageLenght(res.data.value.count);
          setPackageType(res.data.value.labelType);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setGetInfoLoading(false));
  };

  return [getEditInfo, getInfoLoading, gottenProduct];
};

export default useGetInfoProductDetail;
