import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useCodingProfileLiset = () => {
  const [loading, setLoading] = useState(true);
  const [codingProfileList, setCodingProfileList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getCodingProfileList = () => {
    setLoading(true);

    axiosClient
      .get('SettingProduct/CoddingProfile/List')
      .then(res => {
        console.log(res.data.value.list[0]);
        if (res.status === 200) {
          setpageRef(res.data.value);
          setCodingProfileList(prev => {
            const orderedList = res.data.value.list.map(element => ({
              id: element.guid,
              title: element.display,
              type: element.type,
              typeValue: element.typeValue,
              prefix: element.prefix,
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

  return [getCodingProfileList, loading, codingProfileList, pageRef];
};

export default useCodingProfileLiset;
