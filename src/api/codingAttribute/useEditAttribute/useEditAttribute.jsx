import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useEditAttribute = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getAttributeList,
    handleClose,
    setEditLoading,
    attrName,
    attrValue,
  ) => {
    axiosClient
      .put(`SettingProduct/CoddingAttribute/Update`, {
        guid,
        display: attrName,
        value: attrValue,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getAttributeList();
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

export default useEditAttribute;
