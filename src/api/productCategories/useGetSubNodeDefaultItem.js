import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useGetNodeDefaultItem() {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const getdefaultItem = guid => {
    setLoading(true);
    axiosClient
      .get('/Product/Origin/Graph/SubNode/Update', {
        params: {
          GUID: guid,
        },
      })
      .then(res => {
        if (res.status === 200) {
          setItem(res.data.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => {
        setLoading(false);
      });
  };

  return [loading, item, getdefaultItem];
}
