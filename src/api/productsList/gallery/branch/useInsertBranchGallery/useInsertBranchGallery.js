import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useInsertBranchGallery = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const insertBranchGallery = (guid, downloadKeys, onSuccess) => {
    if (loading) {
      enqueueSnackbar('عملیات در حال انجام است.', {
        variant: 'info',
      });
      return;
    }
    setLoading(true);
    axiosClient
      .post(`Product/Branch/Gallery/Insert`, { guid, downloadKeys })
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
    insertBranchGallery,
    insertBranchGalleryLoading: loading,
  };
};

export default useInsertBranchGallery;
