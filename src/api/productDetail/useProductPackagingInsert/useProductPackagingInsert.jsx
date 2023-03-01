import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useProductPackagingInsert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const insertRequest = (
    branchGuid,
    getProductDetail,
    handleClose,
    setInsertLoading,
    packageName,
    explain,
    packageLenght,
    packageType,
    setPackageName,
    setExplain,
    setPackageLenght,
    setPackageType,
    // eslint-disable-next-line max-params
  ) => {
    axiosClient
      .post(`Product/Branch/Packaging/Insert`, {
        branchGuid,
        display: packageName,
        description: explain,
        count: packageLenght,
        labelType: packageType,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`افزودن با موفقیت انجام شد`, { variant: 'success' });
          getProductDetail();
          handleClose();
          setPackageName('');
          setExplain('');
          setPackageLenght('');
          setPackageType('');
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

export default useProductPackagingInsert;
