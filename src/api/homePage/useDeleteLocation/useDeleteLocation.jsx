import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useDeleteLocation = () => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteRequest = (
    guid,
    getLocationList,
    setIsDeleteModalOpen,
    setDeleteLoading,
  ) => {
    axiosClient
      .delete(`InventoryGeo/Location/Delete?GUID=${guid}`)
      .then(res => {
        getLocationList();
        setIsDeleteModalOpen(false);
        enqueueSnackbar(`حذف با موفقیت انجام شد`, { variant: 'success' });
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar('خطای شبکه', { variant: 'error' });
      })
      .finally(() => setDeleteLoading(false));
  };
  return [deleteRequest];
};

export default useDeleteLocation;
