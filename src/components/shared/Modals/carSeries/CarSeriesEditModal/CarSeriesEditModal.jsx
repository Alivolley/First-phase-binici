import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useCarSeriesEdit from 'api/carSeries/useCarSeriesEdit/useCarSeriesEdit';
import useImageKey from 'api/uploader/useImageKey/useImageKey';
import React, { useEffect, useState } from 'react';

const CarSeriesEditModal = ({
  open,
  handleClose,
  chosenCarSeries,
  getCarSeriesList,
}) => {
  const [seriesName, setSeriesName] = useState('');
  const [seriesImg, setSeriesImg] = useState();
  const [emptyError, setEmptyError] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [imageRequest] = useImageKey();
  const [editRequest] = useCarSeriesEdit();

  useEffect(() => {
    setSeriesName(chosenCarSeries.title);
  }, [chosenCarSeries]);

  const editProduct = key => {
    editRequest(
      chosenCarSeries.id,
      getCarSeriesList,
      closeModal,
      setEditLoading,
      seriesName,
      key,
    );
  };

  const uploadImage = () => {
    if (seriesName) {
      setEditLoading(true);
      setEmptyError(false);

      if (seriesImg) {
        const formData = new FormData();
        formData.append('Files', seriesImg);
        imageRequest(formData, editProduct);
      } else {
        editProduct(chosenCarSeries.imageKey);
      }
    } else {
      setEmptyError(true);
    }
  };

  const closeModal = () => {
    handleClose();
    setSeriesName('');
    setSeriesImg();
    setEmptyError(false);
  };

  return (
    <Dialog open={open} onClose={closeModal} sx={{ direction: 'rtl' }}>
      <DialogTitle>ویرایش مدل خودرو</DialogTitle>

      <DialogContent>
        <FilledWrapper>
          <FilledLabel>عنوان</FilledLabel>
          <TextField
            autoFocus
            variant="standard"
            value={seriesName}
            onChange={e => setSeriesName(e.target.value)}
            sx={{ minWidth: 300 }}
            error={!seriesName && emptyError}
          />
        </FilledWrapper>

        <FilledWrapper>
          <FilledLabel>انتخاب عکس</FilledLabel>
          <InputWrapper>
            تغییر عکس
            <FileInput
              type="file"
              onChange={e => setSeriesImg(e.target.files[0])}
              accept="image/*"
            />
          </InputWrapper>
        </FilledWrapper>
      </DialogContent>

      <DialogActions sx={{ gap: 1, padding: 3 }}>
        <Button onClick={closeModal} variant="contained" disabled={editLoading}>
          انصراف
        </Button>
        <LoadingButton
          variant="contained"
          color="warning"
          onClick={uploadImage}
          loading={editLoading}
        >
          ثبت
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CarSeriesEditModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;

const InputWrapper = styled.div`
  width: 60%;
  background-color: #27348b;
  color: white;
  ${({ error }) => error && 'color: #d32f2f;'}
  position: relative;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
`;

const FileInput = styled.input`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
`;
