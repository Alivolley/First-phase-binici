import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useLocationZone = guid => {
  const [loading, setLoading] = useState(true);
  const [zoneList, setZoneList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getZoneList = () => {
    setLoading(true);

    axiosClient
      .get(`InventoryGeo/Zone/List?Guid=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setpageRef(res.data.value);
          setZoneList(prev => {
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

  return [getZoneList, loading, zoneList, pageRef];
};

export default useLocationZone;
