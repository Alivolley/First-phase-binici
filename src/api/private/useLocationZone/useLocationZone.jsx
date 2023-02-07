import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const useLocationZone = guid => {
  const [loading, setLoading] = useState(true);
  const [zoneList, setZoneList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const [{ token }] = useCookies();
  const { enqueueSnackbar } = useSnackbar();

  const getZoneList = () => {
    setLoading(true);

    // axiosClient
    //   .get(`InventoryGeo/Location/List`

    axios
      .get(
        `https://dev.iranhostserver.ir/InventoryGeo/Zone/List?Guid=${guid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        console.log(res);
        setpageRef(res.data.value);
        setZoneList(prev => {
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

  return [getZoneList, loading, zoneList, pageRef];
};

export default useLocationZone;
