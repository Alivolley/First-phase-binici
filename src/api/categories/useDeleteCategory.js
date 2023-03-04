import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useDeleteCategory() {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const deleteCategory = (guid, refreshData) => {
    setLoading(true);
    axiosClient
      .post('/Category/Delete/', {
        categoryGuid: guid,
      })
      .then(res => {
        if (res.data.state === 1) {
          enqueueSnackbar(res.data.message, { variant: 'success' });
          refreshData();
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return [loading, deleteCategory];
}
