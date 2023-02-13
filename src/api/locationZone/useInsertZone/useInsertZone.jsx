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
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, { variant: 'success' });
          getZoneList();
          setIsInsertModalOpen(false);
          setInsertInputValue('');
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setInsertLoading(false));
  };
  return [insertRequest];
};

export default useInsertZone;
