import axiosClient from 'lib/axiosClient';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export const useGetLoginCodeApi = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  const getLoginCode = (phoneNumber, onSwithNextStep) => {
    setLoading(true);

    axiosClient
      .post('Account/OTPLogin', {
        phoneNumber,
        roleGuid: '46a09d81-c57f-4655-a8f5-027c66a6cfb1',
      })
      .then(res => {
        if (res.status === 200) {
          onSwithNextStep();
        } else {
          enqueueSnackbar(res.data.message, { variant: 'error' });
        }
      })
      .catch(() => {
        enqueueSnackbar('خطای شبکه', { variant: 'error' });
      })
      .finally(() => setLoading(false));
  };

  return [loading, getLoginCode];
};
