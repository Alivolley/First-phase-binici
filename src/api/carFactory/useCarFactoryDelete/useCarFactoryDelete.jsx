import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarFactoryDelete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteRequest = (
    guid,
    getCarFactoryList,
    setIsDeleteModalOpen,
    setDeleteLoading,
  ) => {
    axiosClient
      .delete(`SettingSystem/Car/Factory/Delete?GUID=${guid}`)
      .then(res => {
        if (res.status === 200) {
          getCarFactoryList();
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

export default useCarFactoryDelete;
