import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useCarSeriesInsert from 'api/carSeries/useCarSeriesInsert/useCarSeriesInsert';
import useImageKey from 'api/uploader/useImageKey/useImageKey';
import React, { useState } from 'react';

const CarSeriesInsertModal = ({
  open,
  handleClose,
  getCarSeriesList,
  modelGuid,
}) => {
  const [seriesName, setSeriesName] = useState('');
  const [seriesImg, setSeriesImg] = useState();
  const [emptyError, setEmptyError] = useState(false);
  const [insertLoading, setInsertLoading] = useState(false);

  const [imageRequest] = useImageKey();
  const [insertRequest] = useCarSeriesInsert();

  const insertProduct = key => {
    insertRequest(
      modelGuid,
      getCarSeriesList,
      closeModal,
      setInsertLoading,
      seriesName,
      key,
    );
  };

  const uploadImage = () => {
    if (seriesName && seriesImg) {
      setInsertLoading(true);
      setEmptyError(false);

      const formData = new FormData();
      formData.append('Files', seriesImg);
      imageRequest(formData, insertProduct);
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
      <DialogTitle>ثبت سری خودرو</DialogTitle>

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
          <InputWrapper error={!seriesImg && emptyError}>
            {seriesImg ? 'تغییر عکس' : 'انتخاب کنید'}
            <FileInput
              type="file"
              onChange={e => setSeriesImg(e.target.files[0])}
              accept="image/*"
            />
          </InputWrapper>
        </FilledWrapper>
      </DialogContent>

      <DialogActions sx={{ gap: 1, padding: 3 }}>
        <Button
          onClick={closeModal}
          variant="contained"
          disabled={insertLoading}
        >
          انصراف
        </Button>
        <LoadingButton
          variant="contained"
          color="warning"
          onClick={uploadImage}
          loading={insertLoading}
        >
          ثبت
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CarSeriesInsertModal;

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
