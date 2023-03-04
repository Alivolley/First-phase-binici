import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCarProductionTimeInsert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    seriesGuid,
    getCarProductionTimeList,
    handleClose,
    setInsertLoading,
    carProductionName,
    setCarProductionName,
  ) => {
    axiosClient
      .post(`SettingSystem/Car/ProductionTime/Insert`, {
        seriesGuid,
        display: carProductionName,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, { variant: 'success' });
          getCarProductionTimeList();
          handleClose();
          setCarProductionName('');
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

export default useCarProductionTimeInsert;
