import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';

const useProductPackagingEdit = () => {
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getProductDetail,
    handleClose,
    setEditLoading,
    packageName,
    explain,
    packageLenght,
    packageType,
    // eslint-disable-next-line max-params
  ) => {
    axiosClient
      .put(`Product/Branch/Packaging/Update`, {
        guid,
        display: packageName,
        description: explain,
        count: packageLenght,
        labelType: packageType,
      })
      .then(res => {
        if (res.status === 200) {
          enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
          getProductDetail();
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

export default useProductPackagingEdit;
