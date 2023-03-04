import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useMappingProfileEdit = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getMappingProfileList,
    handleClose,
    setEditLoading,
    mapName,
  ) => {
    axiosClient
      .put(`SettingProduct/MappingProfile/Update`, {
        guid,
        display: mapName,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getMappingProfileList();
          handleClose();
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

export default useMappingProfileEdit;
