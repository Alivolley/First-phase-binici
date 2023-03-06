import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useDeleteOriginGallery = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const setDefaultOriginGallery = (guid, productGUID, onSuccess) => {
    if (loading) {
      enqueueSnackbar('عملیات در حال انجام است.', {
        variant: 'info',
      });
      return;
    }
    setLoading(true);
    axiosClient
      .put(`Product/Origin/Gallery/SetDefault`, { guid, productGUID })
      .then(res => {
        if (res.status === 200 && res.data.result) {
          if (onSuccess) onSuccess(guid);
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
    setDefaultOriginGallery,
    setDefaultOriginGalleryLoading: loading,
  };
};

export default useDeleteOriginGallery;
