import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useMappingProfileList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const getData = () => {
    setLoading(true);

    axiosClient
      .get('SettingProduct/MappingProfile/GetAll')
      .then(res => {
        if (res.status === 200) {
          setData(res.data.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getData, loading];
};

export default useMappingProfileList;
