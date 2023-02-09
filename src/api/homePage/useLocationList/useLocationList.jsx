import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useLocationList = () => {
  const [loading, setLoading] = useState(true);
  const [locationList, setLocationList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getLocationList = () => {
    setLoading(true);

    axiosClient
      .get('InventoryGeo/Location/List')
      .then(res => {
        setpageRef(res.data.value);
        setLocationList(prev => {
          const orderedList = res.data.value.list.map(element => ({
            id: element.guid,
            title: element.display,
          }));

          return orderedList;
        });
      })
      .catch(() => enqueueSnackbar('خطای شبکه', { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getLocationList, loading, locationList, pageRef];
};

export default useLocationList;
