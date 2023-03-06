import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useGetOriginGallery = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const getOriginGallery = guid => {
    setLoading(true);
    axiosClient
      .get(`Product/Origin/Gallery/List`, { params: { guid } })
      .then(res => {
        if (res.status === 200 && res.data.result) {
          setData(res.data);
          setError(false)
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
    getOriginGallery,
    getOriginGalleryData: data,
    getOriginGalleryLoading: loading,
    getOriginGalleryError: error && !loading,
    setOriginGalleryData: setData,
  };
};

export default useGetOriginGallery;
