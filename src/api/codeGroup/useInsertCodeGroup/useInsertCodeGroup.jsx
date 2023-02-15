import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useInsertCodeGroup = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    getCodeGroupList,
    handleClose,
    setInsertLoading,
    codeName,
    codeType,
    setCodeName,
    setCodeType,
  ) => {
    axiosClient
      .post(`SettingProduct/CoddingGroup/Insert`, {
        display: codeName,
        length: 0,
        type: codeType,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, { variant: 'success' });
          getCodeGroupList();
          handleClose();
          setCodeName('');
          setCodeType('');
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

export default useInsertCodeGroup;
