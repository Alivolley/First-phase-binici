import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import axiosClient from '../../../lib/axiosClient';

const useLocationList = () => {
  const [loading, setLoading] = useState(true);
  const [locationList, setLocationList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const [{ token }] = useCookies();
  const { enqueueSnackbar } = useSnackbar();

  const getLocationList = () => {
    setLoading(true);

    // axiosClient
    //   .get(`InventoryGeo/Location/List`

    axios
      .get('https://dev.iranhostserver.ir/InventoryGeo/Location/List', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
