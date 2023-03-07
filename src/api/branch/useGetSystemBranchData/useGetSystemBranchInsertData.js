import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useGetSystemBranchInsert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});

  const getBranchInsert = guid => {
    setLoading(true);
    axiosClient
      .get(
        guid ? `Product/Branch/Codding/System/Update` : `Product/Branch/Insert`,
        { params: { guid } },
      )
      .then(res => {
        if (res?.status === 200 && res?.data?.result) {
          setData(res?.data);
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
    getBranchInsert,
    getBranchInsertData: data,
    getBranchInsertLoading: loading,
    getBranchInsertError: error && !loading,
    setGetBranchInsertData: setData,
  };
};

export default useGetSystemBranchInsert;
