import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarBrandInsert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    factoryGuid,
    getCarBrandList,
    closeModal,
    setInsertLoading,
    brandName,
    key,
  ) => {
    axiosClient
      .post(`SettingSystem/Car/Brand/Insert`, {
        factoryGuid,
        display: brandName,
        imageKey: key,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ثبت با موفقیت انجام شد`, { variant: 'success' });
          getCarBrandList();
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

export default useCarBrandInsert;
