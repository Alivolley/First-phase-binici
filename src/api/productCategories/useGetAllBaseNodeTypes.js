import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useGetAllBaseNodeTypes() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const getAllBaseNodeTypes = () => {
    setLoading(true);
    axiosClient
      .get('/Product/Origin/Graph/BaseNode/AllBaseNodeType')
      .then(res => {
        if (res.status === 200) {
          setItems(res.data.value);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => enqueueSnackbar(err.message, { variant: 'error' }))
      .finally(() => {
        setLoading(false);
      });
  };

  return [loading, items, getAllBaseNodeTypes];
}
