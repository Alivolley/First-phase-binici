import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useCarModelList = guid => {
  const [loading, setLoading] = useState(true);
  const [carModelList, setCarModelList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getCarModelList = () => {
    setLoading(true);

    axiosClient
      .get(`SettingSystem/Car/Model/List?Guid=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setpageRef(res.data.value);
          setCarModelList(prev => {
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

  return [getCarModelList, loading, carModelList, pageRef];
};

export default useCarModelList;
