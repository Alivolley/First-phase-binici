import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import axiosClient from '../../../lib/axiosClient';

const useLocationListApi = () => {
  const [loading, setLoading] = useState(true);
  const [locationList, setLocationList] = useState([]);
  const [refTitle, setRefTitle] = useState('');

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
        setRefTitle(res.data.value.refTitle);
        setLocationList(prev => {
          const lisss = res.data.value.list.map(element => ({
            id: element.guid,
            title: element.display,
          }));

          return lisss;
        });
      })
      .catch(() => enqueueSnackbar('خطای شبکه', { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getLocationList, loading, locationList, refTitle];
};

export default useLocationListApi;
