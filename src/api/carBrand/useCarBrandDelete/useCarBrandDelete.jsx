import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarBrandDelete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteRequest = (
    guid,
    getCarBrandList,
    setIsDeleteModalOpen,
    setDeleteLoading,
  ) => {
    axiosClient
      .delete(`SettingSystem/Car/Brand/Delete?GUID=${guid}`)
      .then(res => {
        if (res.status === 200) {
          getCarBrandList();
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

export default useCarBrandDelete;
