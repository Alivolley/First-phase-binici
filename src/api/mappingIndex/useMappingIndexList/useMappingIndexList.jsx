import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useMappingIndexList = guid => {
  const [loading, setLoading] = useState(true);
  const [mappingIndexList, setMappingIndexList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getMappingIndexList = () => {
    setLoading(true);

    axiosClient
      .get(`SettingProduct/MappingIndex/List?Guid=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setpageRef(res.data.value);
          setMappingIndexList(prev => {
            const orderedList = res.data.value.list.map(element => ({
              id: element.guid,
              title: element.display,
              code: element.code,
              mapped: element.mapped,
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

  return [getMappingIndexList, loading, mappingIndexList, pageRef];
};

export default useMappingIndexList;
