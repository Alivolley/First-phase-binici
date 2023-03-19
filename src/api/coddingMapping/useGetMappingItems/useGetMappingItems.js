import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useGetMappingItems = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const getData = (mappingProfile, SearchTerm) => {
    setLoading(true);

    axiosClient
      .get(`SettingProduct/MappingIndex/Search`, {
        params: { mappingProfile, SearchTerm },
      })
      .then(res => {
        if (res.status === 200) {
          setData(res.data?.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return { getData, loading, data };
};

export default useGetMappingItems;
