import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useMappingProfileInsert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    getMappingProfileList,
    handleClose,
    setInsertLoading,
    mapName,
    setMapName,
  ) => {
    axiosClient
      .post(`SettingProduct/MappingProfile/Insert`, {
        display: mapName,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, { variant: 'success' });
          getMappingProfileList();
          handleClose();
          setMapName('');
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

export default useMappingProfileInsert;
