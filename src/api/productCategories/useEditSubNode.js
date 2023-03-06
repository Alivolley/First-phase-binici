import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useEditSubNode() {
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const editSubNode = (guid, nodeGuid, refreshData) => {
    setLoading(true);
    axiosClient
      .put('/Product/Origin/Graph/SubNode/Update', {
        guid,
        nodeGuid,
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

  return [loading, editSubNode];
}
