import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useUpdateCoddingManual = () => {
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const update = (guid, name, success) => {
    setLoading(true);

    axiosClient
      .post(`Product/Branch/Codding/Manual/Update`, { guid, manual: name })
      .then(res => {
        if (res.status === 200) {
          if (success) success();
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return { update, loading };
};

export default useUpdateCoddingManual;
