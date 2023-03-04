import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useCarFactoryList = () => {
  const [loading, setLoading] = useState(true);
  const [carFactoryList, setCarFactoryList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getCarFactoryList = () => {
    setLoading(true);

    axiosClient
      .get('SettingSystem/Car/Factory/List')
      .then(res => {
        if (res.status === 200) {
          setpageRef(res.data.value);
          setCarFactoryList(prev => {
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

  return [getCarFactoryList, loading, carFactoryList, pageRef];
};

export default useCarFactoryList;
