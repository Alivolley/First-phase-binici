import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useEditZone = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getZoneList,
    setIsEditModalOpen,
    setEditLoading,
    inputValue,
  ) => {
    axiosClient
      .put(`InventoryGeo/Zone/Update`, {
        guid,
        display: inputValue,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getZoneList();
          setIsEditModalOpen(false);
        } else {
          enqueueSnackbar('خطای شبکه', { variant: 'error' });
        }
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar('خطای شبکه', { variant: 'error' });
      })
      .finally(() => setEditLoading(false));
  };
  return [editRequest];
};

export default useEditZone;
