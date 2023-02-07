import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useCookies } from 'react-cookie';

const useEditLocation = () => {
  const [{ token }] = useCookies();
  const { enqueueSnackbar } = useSnackbar();

  const editRequest = (
    guid,
    getLocationList,
    setIsEditModalOpen,
    setEditLoading,
    inputValue,
  ) => {
    axios
      .put(
        `https://dev.iranhostserver.ir/InventoryGeo/Location/Update`,
        {
          guid,
          display: inputValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        getLocationList();
        setIsEditModalOpen(false);
        enqueueSnackbar(`ویرایش با موفقیت انجام شد`, { variant: 'success' });
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar('خطای شبکه', { variant: 'error' });
      })
      .finally(() => setEditLoading(false));
  };
  return [editRequest];
};

export default useEditLocation;
