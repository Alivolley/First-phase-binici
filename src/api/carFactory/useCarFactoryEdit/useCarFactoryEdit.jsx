import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarFactoryEdit = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getCarFactoryList,
    closeModal,
    setEditLoading,
    factoryName,
    key,
  ) => {
    axiosClient
      .put(`SettingSystem/Car/Factory/Update`, {
        guid,
        display: factoryName,
        imageKey: key,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
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
      .finally(() => setEditLoading(false));
  };
  return [editRequest];
};

export default useCarFactoryEdit;
