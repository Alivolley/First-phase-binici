import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useGetBranchGallery = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const getBranchGallery = guid => {
    setLoading(true);
    axiosClient
      .get(`Product/Branch/Gallery/List`, { params: { guid } })
      .then(res => {
        if (res.status === 200 && res.data.result) {
          setData(res.data);
          setError(false);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
          setError(true);
        }
      })
      .catch(err => {
        enqueueSnackbar('خطایی در برقراری ارتباط رخ داد.', {
          variant: 'error',
        });
        setError(true);
      })
      .finally(() => setLoading(false));
  };
  return {
    getBranchGallery,
    getBranchGalleryData: data,
    getBranchGalleryLoading: loading,
    getBranchGalleryError: error && !loading,
    setBranchGalleryData: setData,
  };
};

export default useGetBranchGallery;
