import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useEditCodeGroup = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    id,
    getCodeGroupList,
    handleClose,
    setEditLoading,
    codeName,
    codeType,
  ) => {
    axiosClient
      .put(`SettingProduct/CoddingGroup/Update`, {
        guid: id,
        display: codeName,
        length: 0,
        type: codeType,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getCodeGroupList();
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

export default useEditCodeGroup;
