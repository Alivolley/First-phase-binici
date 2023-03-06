import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useDeleteBranchGallery = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const deleteBranchGallery = (guid, productGUID, onSuccess) => {
    if (loading) {
      enqueueSnackbar('عملیات در حال انجام است.', {
        variant: 'info',
      });
      return;
    }
    setLoading(true);
    axiosClient({
      url: `Product/Branch/Gallery/Delete`,
      data: { guid, productGUID },
      method: 'delete',
    })
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
    deleteBranchGallery,
    deleteBranchGalleryLoading: loading,
  };
};

export default useDeleteBranchGallery;
