import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useCarProductionTimeList = guid => {
  const [loading, setLoading] = useState(true);
  const [carProductionTimeList, setCarProductionTimeList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getCarProductionTimeList = () => {
    setLoading(true);

    axiosClient
      .get(`SettingSystem/Car/ProductionTime/List?Guid=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setpageRef(res.data.value);
          setCarProductionTimeList(prev => {
            const orderedList = res.data.value.list.map(element => ({
              id: element.guid,
              title: element.display,
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

  return [getCarProductionTimeList, loading, carProductionTimeList, pageRef];
};

export default useCarProductionTimeList;
