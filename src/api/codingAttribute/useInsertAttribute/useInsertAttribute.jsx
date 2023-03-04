import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useInsertAttribute = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    groupGuid,
    getAttributeList,
    handleClose,
    setInsertLoading,
    attrName,
    attrValue,
    setAttrName,
    setAttrValue,
    // eslint-disable-next-line max-params
  ) => {
    axiosClient
      .post(`SettingProduct/CoddingAttribute/Insert`, {
        groupGuid,
        display: attrName,
        value: attrValue,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ثبت با موفقیت انجام شد`, { variant: 'success' });
          getAttributeList();
          handleClose();
          setAttrName('');
          setAttrValue('');
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

export default useInsertAttribute;
