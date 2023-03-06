import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export default function useGetProductsTreeData() {
  const { enqueueSnackbar } = useSnackbar();

  const [getLoading, setGetLoading] = useState(true);
  const [treeData, setTreeData] = useState();

  const getTreeData = categoryGuid => {
    setGetLoading(true);
    axiosClient
      .get(`/Product/Origin/Graph/Get?GUID=${categoryGuid}`)
      .then(res => {
        if (res.status === 200) {
          const data = res.data.value.graph.map(obj =>
            JSON.parse(
              JSON.stringify(obj)
                .replaceAll('"display":', '"title":')
                .replaceAll('"nodes":', '"children":'),
            ),
          );

          setTreeData(data);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => {
        setGetLoading(false);
      });
  };

  return [getLoading, treeData, setTreeData, getTreeData];
}
