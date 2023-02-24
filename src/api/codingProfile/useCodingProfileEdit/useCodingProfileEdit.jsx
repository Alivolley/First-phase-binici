import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCodingProfileEdit = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getCodingProfileList,
    handleClose,
    setEditLoading,
    codeName,
    codePrefix,
    codeType,
  ) => {
    axiosClient
      .put(`SettingProduct/CoddingProfile/Update`, {
        guid,
        display: codeName,
        prefix: codePrefix,
        type: codeType,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getCodingProfileList();
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

export default useCodingProfileEdit;
