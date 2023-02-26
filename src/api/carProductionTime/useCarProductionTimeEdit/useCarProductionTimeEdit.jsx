import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarProductionTimeEdit = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getCarProductionTimeList,
    handleClose,
    setEditLoading,
    carProductionName,
  ) => {
    axiosClient
      .put(`SettingSystem/Car/ProductionTime/Update`, {
        guid,
        display: carProductionName,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getCarProductionTimeList();
          handleClose();
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

export default useCarProductionTimeEdit;
