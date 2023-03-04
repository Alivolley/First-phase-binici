import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useGetPackageTypeList = () => {
  const [loading, setLoading] = useState(true);
  const [packageTypeList, setPackageTypeList] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const getPackageTypeList = () => {
    setLoading(true);

    axiosClient
      .get(`Product/Branch/Packaging/GetAllLabelType`)
      .then(res => {
        if (res.status === 200) {
          setPackageTypeList(res.data.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getPackageTypeList, loading, packageTypeList];
};

export default useGetPackageTypeList;
