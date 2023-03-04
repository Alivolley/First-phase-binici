import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarBrandEdit = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getCarFactoryList,
    closeModal,
    setEditLoading,
    brandName,
    key,
  ) => {
    axiosClient
      .put(`SettingSystem/Car/Brand/Update`, {
        guid,
        display: brandName,
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

export default useCarBrandEdit;
