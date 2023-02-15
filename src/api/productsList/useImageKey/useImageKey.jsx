import axios from 'axios';
import { useSnackbar } from 'notistack';

const useImageKey = () => {
  const { enqueueSnackbar } = useSnackbar();

  const imageRequest = (image, insertProduct) => {
    axios
      .post(`https://dl.iranhostserver.ir/Uploader/Process`, image, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        if (res.status === 200) {
          insertProduct(res.data);
        } else {
          enqueueSnackbar(res.message, { variant: 'error' });
        }
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };
  return [imageRequest];
};

export default useImageKey;
