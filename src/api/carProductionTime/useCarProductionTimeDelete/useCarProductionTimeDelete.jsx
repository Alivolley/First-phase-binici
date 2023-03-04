import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarProductionTimeDelete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteRequest = (
    guid,
    getCarProductionTimeList,
    setIsDeleteModalOpen,
    setDeleteLoading,
  ) => {
    axiosClient
      .delete(`SettingSystem/Car/ProductionTime/Delete?GUID=${guid}`)
      .then(res => {
        if (res.status === 200) {
          getCarProductionTimeList();
          setIsDeleteModalOpen(false);
          enqueueSnackbar(`حذف با موفقیت انجام شد`, { variant: 'success' });
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setDeleteLoading(false));
  };
  return [deleteRequest];
};

export default useCarProductionTimeDelete;
