import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useCarFactoryInsert from 'api/carFactory/useCarFactoryInsert/useCarFactoryInsert';
import useImageKey from 'api/uploader/useImageKey/useImageKey';
import React, { useState } from 'react';

const CarFactoryInsertModal = ({ open, handleClose, getCarFactoryList }) => {
  const [factoryName, setFactoryName] = useState('');
  const [factoryImg, setFactoryImg] = useState();
  const [emptyError, setEmptyError] = useState(false);
  const [insertLoading, setInsertLoading] = useState(false);

  const [imageRequest] = useImageKey();
  const [insertRequest] = useCarFactoryInsert();

  const insertProduct = key => {
    insertRequest(
      getCarFactoryList,
      closeModal,
      setInsertLoading,
      factoryName,
      key,
    );
  };

  const uploadImage = () => {
    if (factoryName && factoryImg) {
      setInsertLoading(true);
      setEmptyError(false);

      const formData = new FormData();
      formData.append('Files', factoryImg);
      imageRequest(formData, insertProduct);
    } else {
      setEmptyError(true);
    }
  };

  const closeModal = () => {
    handleClose();
    setFactoryName('');
    setFactoryImg();
    setEmptyError(false);
  };

  return (
    <Dialog open={open} onClose={closeModal} sx={{ direction: 'rtl' }}>
      <DialogTitle>ثبت کارخانه خودرو</DialogTitle>

      <DialogContent>
        <FilledWrapper>
          <FilledLabel>عنوان</FilledLabel>
          <TextField
            autoFocus
            variant="standard"
            value={factoryName}
            onChange={e => setFactoryName(e.target.value)}
            sx={{ minWidth: 300 }}
            error={!factoryName && emptyError}
          />
        </FilledWrapper>

        <FilledWrapper>
          <FilledLabel>انتخاب عکس</FilledLabel>
          <InputWrapper error={!factoryImg && emptyError}>
            {factoryImg ? 'تغییر عکس' : 'انتخاب کنید'}
            <FileInput
              type="file"
              onChange={e => setFactoryImg(e.target.files[0])}
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

export default CarFactoryInsertModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;

const TextArea = styled.textarea`
  resize: vertical;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  ${({ error }) => error && 'border: 2px solid #d32f2f;'}

  &:focus {
    outline-color: #1976d2;
  }
`;

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
