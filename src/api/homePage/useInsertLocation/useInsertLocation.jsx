import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useInsertLocation = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    getLocationList,
    setIsInsertModalOpen,
    setInsertLoading,
    insertInputValue,
    setInsertInputValue,
  ) => {
    axiosClient
      .post(`InventoryGeo/Location/Insert`, {
        display: insertInputValue,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getLocationList();
          setIsInsertModalOpen(false);
          setInsertInputValue('');
        } else {
          enqueueSnackbar('خطای شبکه', { variant: 'error' });
        }
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar('خطای شبکه', { variant: 'error' });
      })
      .finally(() => setInsertLoading(false));
  };
  return [insertRequest];
};

export default useInsertLocation;
