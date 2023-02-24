import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useInsertCodeGroup = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    getCodeGroupList,
    handleClose,
    setInsertLoading,
    codeName,
    codeLenght,
    codeType,
    setCodeName,
    setCodeLenght,
    setCodeType,
    // eslint-disable-next-line max-params
  ) => {
    axiosClient
      .post(`SettingProduct/CoddingGroup/Insert`, {
        display: codeName,
        length: codeLenght,
        type: codeType,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, { variant: 'success' });
          getCodeGroupList();
          handleClose();
          setCodeName('');
          setCodeLenght('');
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
