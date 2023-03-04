import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useCodingProfileType = () => {
  const [loading, setLoading] = useState(true);
  const [codingProfileTypeList, setCodingProfileTypeList] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const getCodingProfileTypeList = () => {
    setLoading(true);

    axiosClient
      .get(`SettingProduct/CoddingProfile/GetAllProfileTypes`)
      .then(res => {
        if (res.status === 200) {
          setCodingProfileTypeList(res.data.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getCodingProfileTypeList, loading, codingProfileTypeList];
};

export default useCodingProfileType;
