import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useProductsList = () => {
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState({});
  const [pageRef, setpageRef] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const getProductsList = (params = {}) => {
    if (!productList[params.page || 1]) {
      setLoading(true);
    }

    axiosClient
      .get('Product/Origin/List', { params })
      .then(res => {
        if (res.status === 200) {
          setpageRef(res.data.value);
          setProductList(prev => {
            const orderedList = res.data.value.list.map(element => ({
              id: element.guid,
              title: element.title,
              hasGraph: element.hasGraph,
              imageKey: element.imageKey,
              imageURL: element.imageURL,
            }));

            return { ...prev, [params?.page || 1] : orderedList };
          });
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => setLoading(false));
  };

  return [getProductsList, loading, productList, pageRef];
};

export default useProductsList;
