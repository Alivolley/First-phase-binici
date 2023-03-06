import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useDeleteBaseNode() {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const deleteBaseNode = (guid, refreshData) => {
    setLoading(true);
    axiosClient
      .delete('/Product/Origin/Graph/BaseNode/Delete', {
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

  return [loading, deleteBaseNode];
}
