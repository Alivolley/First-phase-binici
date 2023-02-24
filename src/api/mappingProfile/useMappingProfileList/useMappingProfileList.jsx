import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useMappingProfileList = () => {
  const [loading, setLoading] = useState(true);
  const [mappingProfileList, setMappingProfileList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getMappingProfileList = () => {
    setLoading(true);

    axiosClient
      .get('SettingProduct/MappingProfile/List')
      .then(res => {
        console.log(res.data.value.list);
        if (res.status === 200) {
          setpageRef(res.data.value);
          setMappingProfileList(prev => {
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

  return [getMappingProfileList, loading, mappingProfileList, pageRef];
};

export default useMappingProfileList;
