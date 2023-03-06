import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useCreateSubNode() {
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const createSubNode = (values, refreshData) => {
    setLoading(true);
    axiosClient
      .post('/Product/Origin/Graph/SubNode/Insert', {
        ...values,
      })
      .then(res => {
        if (res.status === 200) {
          const data = {
            ...res.data.value,
            title: res.data.value.display,
            children: [],
          };
          refreshData(data);
          enqueueSnackbar(res.data.message, { variant: 'success' });
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => {
        setLoading(false);
      });
  };

  return [loading, createSubNode];
}
