import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useCarModelInsert from 'api/carModel/useCarModelInsert/useCarModelInsert';
import useImageKey from 'api/uploader/useImageKey/useImageKey';
import React, { useState } from 'react';

const CarModelInsertModal = ({
  open,
  handleClose,
  getCarModelList,
  brandGuid,
}) => {
  const [modelName, setModelName] = useState('');
  const [modelImg, setModelImg] = useState();
  const [emptyError, setEmptyError] = useState(false);
  const [insertLoading, setInsertLoading] = useState(false);

  const [imageRequest] = useImageKey();
  const [insertRequest] = useCarModelInsert();

  const insertProduct = key => {
    insertRequest(
      brandGuid,
      getCarModelList,
      closeModal,
      setInsertLoading,
      modelName,
      key,
    );
  };

  const uploadImage = () => {
    if (modelName && modelImg) {
      setInsertLoading(true);
      setEmptyError(false);

      const formData = new FormData();
      formData.append('Files', modelImg);
      imageRequest(formData, insertProduct);
    } else {
      setEmptyError(true);
    }
  };

  const closeModal = () => {
    handleClose();
    setModelName('');
    setModelImg();
    setEmptyError(false);
  };

  return (
    <Dialog open={open} onClose={closeModal} sx={{ direction: 'rtl' }}>
      <DialogTitle>ثبت مدل خودرو</DialogTitle>

      <DialogContent>
        <FilledWrapper>
          <FilledLabel>عنوان</FilledLabel>
          <TextField
            autoFocus
            variant="standard"
            value={modelName}
            onChange={e => setModelName(e.target.value)}
            sx={{ minWidth: 300 }}
            error={!modelName && emptyError}
          />
        </FilledWrapper>

        <FilledWrapper>
          <FilledLabel>انتخاب عکس</FilledLabel>
          <InputWrapper error={!modelImg && emptyError}>
            {modelImg ? 'تغییر عکس' : 'انتخاب کنید'}
            <FileInput
              type="file"
              onChange={e => setModelImg(e.target.files[0])}
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

export default CarModelInsertModal;

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
