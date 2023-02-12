import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useProductsList = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getProductsList = () => {
    setLoading(true);

    axiosClient
      .get('Product/Origin/List')
      .then(res => {
        console.log(res);
        setpageRef(res.data.value);
        setProductList(prev => {
          const orderedList = res.data.value.list.map(element => ({
            id: element.guid,
            title: element.title,
          }));

          return orderedList;
        });
      })
      .catch(() => enqueueSnackbar('خطای شبکه', { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getProductsList, loading, productList, pageRef];
};

export default useProductsList;
