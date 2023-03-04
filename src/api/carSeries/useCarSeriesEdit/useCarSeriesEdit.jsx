import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarSeriesEdit = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getCarSeriesList,
    closeModal,
    setEditLoading,
    seriesName,
    key,
  ) => {
    axiosClient
      .put(`SettingSystem/Car/Series/Update`, {
        guid,
        display: seriesName,
        imageKey: key,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getCarSeriesList();
          closeModal();
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

export default useCarSeriesEdit;
