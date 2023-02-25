import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarModelDelete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteRequest = (
    guid,
    getCarModelList,
    setIsDeleteModalOpen,
    setDeleteLoading,
  ) => {
    axiosClient
      .delete(`SettingSystem/Car/Model/Delete?GUID=${guid}`)
      .then(res => {
        if (res.status === 200) {
          getCarModelList();
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

export default useCarModelDelete;
