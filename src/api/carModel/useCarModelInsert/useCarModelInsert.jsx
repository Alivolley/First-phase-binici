import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarModelInsert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    brandGuid,
    getCarModelList,
    closeModal,
    setInsertLoading,
    modelName,
    key,
  ) => {
    axiosClient
      .post(`SettingSystem/Car/Model/Insert`, {
        brandGuid,
        display: modelName,
        imageKey: key,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ثبت با موفقیت انجام شد`, { variant: 'success' });
          getCarModelList();
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

export default useCarModelInsert;
