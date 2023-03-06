import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useEditBaseNode() {
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const editBaseNode = (guid, baseNodeType, refreshData) => {
    setLoading(true);
    axiosClient
      .put('/Product/Origin/Graph/BaseNode/Update', {
        guid,
        baseNodeType,
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

  return [loading, editBaseNode];
}
