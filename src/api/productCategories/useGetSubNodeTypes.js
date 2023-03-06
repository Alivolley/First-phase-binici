import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useGetSubNodeTypes() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const getSubNodeTypes = (guid, isParent, type) => {
    setLoading(true);
    axiosClient
      .get('/Product/Origin/Graph/Node/GetAll', {
        params: {
          GUID: guid,
          IsParent: isParent,
          Type: type,
        },
      })
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

  return [loading, items, getSubNodeTypes];
}
