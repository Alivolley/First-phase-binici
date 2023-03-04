import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useCarBrandList = guid => {
  const [loading, setLoading] = useState(true);
  const [carBrandList, setCarBrandList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getCarBrandList = () => {
    setLoading(true);

    axiosClient
      .get(`SettingSystem/Car/Brand/List?Guid=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setpageRef(res.data.value);
          setCarBrandList(prev => {
            const orderedList = res.data.value.list.map(element => ({
              id: element.guid,
              title: element.display,
              imageKey: element.imageKey,
              imageURL: element.imageURL,
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

  return [getCarBrandList, loading, carBrandList, pageRef];
};

export default useCarBrandList;
