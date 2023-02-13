import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useInsertProduct = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    getProsuctList,
    closeModal,
    setInsertLoading,
    productName,
    preFixName,
    explain,
    GottenImageKey,
  ) => {
    axiosClient
      .post(`Product/Origin/Insert`, {
        title: productName,
        preFix: preFixName,
        description: explain,
        imageKey: GottenImageKey,
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, { variant: 'success' });
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
  return [insertRequest];
};

export default useInsertProduct;
