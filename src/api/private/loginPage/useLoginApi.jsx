import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

export const useLoginApi = () => {
  const [_, setCookie] = useCookies(['token']);
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const login = (phoneNumber, otpCode) => {
    setLoading(true);

    axiosClient
      .post('Account/OTPVerifyCode', {
        phoneNumber,
        otpCode,
      })
      .then(res => {
        console.log(res);
        if (res.data.value.token !== null) {
          setCookie('token', res.data.value.token, {
            path: '/',
          });
        } else {
          enqueueSnackbar(res.data.message, { variant: 'error' });
        }
      })
      .catch(() => {
        enqueueSnackbar('خطای شبکه', { variant: 'error' });
      })
      .finally(() => setLoading(false));
  };

  return [loading, login];
};
