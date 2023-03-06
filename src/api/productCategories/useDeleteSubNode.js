import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useDeleteSubNode() {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const deleteSubNode = (guid, refreshData) => {
    setLoading(true);
    axiosClient
      .delete('/Product/Origin/Graph/SubNode/Delete', {
        params: {
          GUID: guid,
        },
      })
      .then(res => {
        if (res.status === 200) {
          refreshData();
          enqueueSnackbar(res.data.message, { variant: 'success' });
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

  return [loading, deleteSubNode];
}
