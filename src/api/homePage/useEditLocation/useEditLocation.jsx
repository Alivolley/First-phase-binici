import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useEditLocation = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getLocationList,
    setIsEditModalOpen,
    setEditLoading,
    inputValue,
  ) => {
    axiosClient
      .put(`InventoryGeo/Location/Update`, {
        guid,
        display: inputValue,
      })
      .then(res => {
        getLocationList();
        setIsEditModalOpen(false);
        enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar('خطای شبکه', { variant: 'error' });
      })
      .finally(() => setEditLoading(false));
  };
  return [editRequest];
};

export default useEditLocation;
