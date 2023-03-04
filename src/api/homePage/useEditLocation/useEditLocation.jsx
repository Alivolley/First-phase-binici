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
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getLocationList();
          setIsEditModalOpen(false);
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

export default useEditLocation;
