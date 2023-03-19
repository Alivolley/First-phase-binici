import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useUpdateCoddingMapping = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const update = ({ guid, mappingID, mappingProfileGuid }, success) => {
    setLoading(true);
    axiosClient
      .put(`Product/Branch/Codding/Mapping/Update`, {
        guid,
        mappingID,
      })
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

  const getData = guid => {
    setLoading(true);
    axiosClient
      .get(`Product/Branch/Codding/Mapping/Update`, { params: { guid } })
      .then(res => {
        if (res.status === 200) {
          setData(res.data?.value);
          if (error) setError(false);
        } else {
          setError(true);
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  return { update, getData, loading, data, error, setData };
};

export default useUpdateCoddingMapping;
