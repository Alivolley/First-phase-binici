import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useCreateCategory() {
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const createCategory = (values, guid, refreshData) => {
    setLoading(true);
    axiosClient
      .post('/Category/Create', {
        categoryGuid: guid,
        name: values.name,
        order: values.order,
      })
      .then(res => {
        console.log(res.data);
        if (res.data.state === 1) {
          enqueueSnackbar(res.data.message, { variant: 'success' });
          refreshData();
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => {
        setLoading(false);
      });
  };

  return [loading, createCategory];
}
