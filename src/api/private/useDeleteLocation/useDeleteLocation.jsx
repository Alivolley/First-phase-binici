import axios from 'axios';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useCookies } from 'react-cookie';

const useDeleteLocation = () => {
  const [{ token }] = useCookies();
  const { enqueueSnackbar } = useSnackbar();

  const deleteRequest = (
    guid,
    getLocationList,
    setIsModalOpen,
    setDeleteLoading,
  ) => {
    axios
      .delete(
        `https://dev.iranhostserver.ir/InventoryGeo/Location/Delete?GUID=${guid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        getLocationList();
        setIsModalOpen(false);
        enqueueSnackbar(`حذف با موفقیت انجام شد`, { variant: 'success' });
      })
      .catch(err => {
        console.log(err);
        enqueueSnackbar('خطای شبکه', { variant: 'error' });
      })
      .finally(() => setDeleteLoading(false));
  };
  return [deleteRequest];
};

export default useDeleteLocation;
