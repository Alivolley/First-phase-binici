import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarSeriesInsert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    modelGuid,
    getCarModelList,
    closeModal,
    setInsertLoading,
    modelName,
    key,
  ) => {
    axiosClient
      .post(`SettingSystem/Car/Series/Insert`, {
        modelGuid,
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

export default useCarSeriesInsert;
