import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarModelEdit = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getCarModelList,
    closeModal,
    setEditLoading,
    modelName,
    key,
  ) => {
    axiosClient
      .put(`SettingSystem/Car/Model/Update`, {
        guid,
        display: modelName,
        imageKey: key,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
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
      .finally(() => setEditLoading(false));
  };
  return [editRequest];
};

export default useCarModelEdit;
