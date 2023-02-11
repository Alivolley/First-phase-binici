import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useInsertZone = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    id,
    getZoneList,
    setIsInsertModalOpen,
    setInsertLoading,
    insertInputValue,
    setInsertInputValue,
  ) => {
    axiosClient
      .post(`InventoryGeo/Zone/Insert`, {
        locationGuid: id,
        display: insertInputValue,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getZoneList();
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

export default useInsertZone;
