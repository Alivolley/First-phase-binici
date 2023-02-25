import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarFactoryInsert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    getCarFactoryList,
    closeModal,
    setInsertLoading,
    factoryName,
    key,
  ) => {
    axiosClient
      .post(`SettingSystem/Car/Factory/Insert`, {
        display: factoryName,
        imageKey: key,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, {
            variant: 'success',
          });
          getCarFactoryList();
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

export default useCarFactoryInsert;
