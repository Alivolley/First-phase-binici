import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useBasket = guid => {
  const [loading, setLoading] = useState(true);
  const [basketList, setBasketList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getBasketList = () => {
    setLoading(true);

    axiosClient
      .get(`InventoryShoppingCart/List?Guid=${guid}`)
      .then(res => {
        if (res.status === 200) {
          setpageRef(res.data.value);
          setBasketList(prev => {
            const orderedList = res.data.value.list.map(element => ({
              id: element.guid,
              title: element.display,
              type: element.type,
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

  return [getBasketList, loading, basketList, pageRef];
};

export default useBasket;
