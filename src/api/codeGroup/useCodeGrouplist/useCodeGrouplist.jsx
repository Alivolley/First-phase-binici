import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useCodeGrouplist = () => {
  const [loading, setLoading] = useState(true);
  const [codeGroupList, setCodeGroupList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getCodeGroupList = () => {
    setLoading(true);

    axiosClient
      .get('SettingProduct/CoddingGroup/List')
      .then(res => {
        if (res.status === 200) {
          setpageRef(res.data.value);
          setCodeGroupList(prev => {
            const orderedList = res.data.value.list.map(element => ({
              id: element.guid,
              title: element.display,
              length: element.length,
              type: element.type,
              typeDisplay: element.typeDisplay,
            }));
            return orderedList;
          });
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getCodeGroupList, loading, codeGroupList, pageRef];
};

export default useCodeGrouplist;
