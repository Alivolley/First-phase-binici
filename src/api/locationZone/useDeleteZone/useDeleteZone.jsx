import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useDeleteZone = () => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteRequest = (
    guid,
    getZoneList,
    setIsDeleteModalOpen,
    setDeleteLoading,
  ) => {
    axiosClient
      .delete(`InventoryGeo/Zone/Delete?GUID=${guid}`)
      .then(res => {
        if (res.status === 200) {
          getZoneList();
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

export default useDeleteZone;
