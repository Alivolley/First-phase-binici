import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useCodingProfileInsert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    getCodingProfileList,
    handleClose,
    setInsertLoading,
    codeName,
    codePrefix,
    codeType,
    setCodeName,
    setCodePrefix,
    setCodeType,
    // eslint-disable-next-line max-params
  ) => {
    axiosClient
      .post(`SettingProduct/CoddingProfile/Insert`, {
        display: codeName,
        prefix: codePrefix,
        type: codeType,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, { variant: 'success' });
          getCodingProfileList();
          handleClose();
          setCodeName('');
          setCodePrefix('');
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

export default useCodingProfileInsert;
