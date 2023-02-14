import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useEditProduct = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getProsuctList,
    closeModal,
    setInsertLoading,
    productName,
    preFixName,
    explain,
    key,
    // eslint-disable-next-line max-params
  ) => {
    console.log(key);
    axiosClient
      .put(`Product/Origin/Update`, {
        guid,
        title: productName,
        preFix: preFixName,
        description: explain,
        imageKey: key,
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getProsuctList();
          closeModal();
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setInsertLoading(false));
  };
  return [editRequest];
};

export default useEditProduct;
