import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useInsertOriginGallery = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const insertOriginGallery = (guid, downloadKeys, onSuccess) => {
    if (loading) {
      enqueueSnackbar('عملیات در حال انجام است.', {
        variant: 'info',
      });
      return;
    }
    setLoading(true);
    axiosClient
      .post(`Product/Origin/Gallery/Insert`, { guid, downloadKeys })
      .then(res => {
        if (res.status === 200 && res.data.result) {
          if (onSuccess) onSuccess(res.data.result);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        enqueueSnackbar('خطایی در برقراری ارتباط رخ داد.', {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  };
  return {
    insertOriginGallery,
    insertOriginGalleryLoading: loading,
  };
};

export default useInsertOriginGallery;
