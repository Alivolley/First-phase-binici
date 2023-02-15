import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useCodeGroupType = () => {
  const [loading, setLoading] = useState(true);
  const [codeGroupTypeList, setCodeGroupTypeList] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const getCodeGroupTypeList = () => {
    setLoading(true);

    axiosClient
      .get(`SettingProduct/CoddingGroup/GetAllCoddingGroupTypes`)
      .then(res => {
        if (res.status === 200) {
          setCodeGroupTypeList(res.data.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getCodeGroupTypeList, loading, codeGroupTypeList];
};

export default useCodeGroupType;
