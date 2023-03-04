import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useCarModelEdit from 'api/carModel/useCarModelEdit/useCarModelEdit';
import useImageKey from 'api/uploader/useImageKey/useImageKey';
import React, { useEffect, useState } from 'react';

const CarModelEditModal = ({
  open,
  handleClose,
  chosenCarModel,
  getCarModelList,
}) => {
  const [modelName, setModelName] = useState('');
  const [modelImg, setModelImg] = useState();
  const [emptyError, setEmptyError] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [imageRequest] = useImageKey();
  const [editRequest] = useCarModelEdit();

  useEffect(() => {
    setModelName(chosenCarModel.title);
  }, [chosenCarModel]);

  const editProduct = key => {
    editRequest(
      chosenCarModel.id,
      getCarModelList,
      closeModal,
      setEditLoading,
      modelName,
      key,
    );
  };

  const uploadImage = () => {
    if (modelName) {
      setEditLoading(true);
      setEmptyError(false);

      if (modelImg) {
        const formData = new FormData();
        formData.append('Files', modelImg);
        imageRequest(formData, editProduct);
      } else {
        editProduct(chosenCarModel.imageKey);
      }
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
      <DialogTitle>ویرایش مدل خودرو</DialogTitle>

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
          <InputWrapper>
            تغییر عکس
            <FileInput
              type="file"
              onChange={e => setModelImg(e.target.files[0])}
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

export default CarModelEditModal;

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
