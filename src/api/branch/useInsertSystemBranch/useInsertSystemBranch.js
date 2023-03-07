import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

const useInsertSystemBranch = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const insertSystemBranch = (isUpdate, data = {}, onSuccess) => {
    if (loading) {
      enqueueSnackbar('عملیات در حال انجام است.', {
        variant: 'info',
      });
      return;
    }
    setLoading(true);
    axiosClient({
      url: isUpdate
        ? `Product/Branch/Codding/System/Update`
        : `Product/Branch/Insert`,
      data: { ...data },
      method: isUpdate ? 'put' : 'post',
    })
      .then(res => {
        if (res.status === 200 && res.data.result) {
          if (onSuccess) onSuccess(res.data.result);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        enqueueSnackbar('خطایی در برقراری ارتباط رخ داد.', {
          variant: 'error',
        });
      })
      .finally(() => setLoading(false));
  };
  return {
    insertSystemBranch,
    insertSystemBranchLoading: loading,
  };
};

export default useInsertSystemBranch;
