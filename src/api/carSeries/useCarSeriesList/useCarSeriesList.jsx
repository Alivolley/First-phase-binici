import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useCarSeriesList = guid => {
  const [loading, setLoading] = useState(true);
  const [carSeriesList, setCarSeriesList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getCarSeriesList = () => {
    setLoading(true);

    axiosClient
      .get(`SettingSystem/Car/Series/List?Guid=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setpageRef(res.data.value);
          setCarSeriesList(prev => {
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

  return [getCarSeriesList, loading, carSeriesList, pageRef];
};

export default useCarSeriesList;
