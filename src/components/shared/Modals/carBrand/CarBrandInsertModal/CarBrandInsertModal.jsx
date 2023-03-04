import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useCarBrandInsert from 'api/carBrand/useCarBrandInsert/useCarBrandInsert';
import useImageKey from 'api/uploader/useImageKey/useImageKey';
import React, { useState } from 'react';

const CarBrandInsertModal = ({
  open,
  handleClose,
  getCarBrandList,
  factoryGuid,
}) => {
  const [brandName, setBrandName] = useState('');
  const [brandImg, setBrandImg] = useState();
  const [emptyError, setEmptyError] = useState(false);
  const [insertLoading, setInsertLoading] = useState(false);

  const [imageRequest] = useImageKey();
  const [insertRequest] = useCarBrandInsert();

  const insertProduct = key => {
    insertRequest(
      factoryGuid,
      getCarBrandList,
      closeModal,
      setInsertLoading,
      brandName,
      key,
    );
  };

  const uploadImage = () => {
    if (brandName && brandImg) {
      setInsertLoading(true);
      setEmptyError(false);

      const formData = new FormData();
      formData.append('Files', brandImg);
      imageRequest(formData, insertProduct);
    } else {
      setEmptyError(true);
    }
  };

  const closeModal = () => {
    handleClose();
    setBrandName('');
    setBrandImg();
    setEmptyError(false);
  };

  return (
    <Dialog open={open} onClose={closeModal} sx={{ direction: 'rtl' }}>
      <DialogTitle>ثبت برند خودرو</DialogTitle>

      <DialogContent>
        <FilledWrapper>
          <FilledLabel>عنوان</FilledLabel>
          <TextField
            autoFocus
            variant="standard"
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
            sx={{ minWidth: 300 }}
            error={!brandName && emptyError}
          />
        </FilledWrapper>

        <FilledWrapper>
          <FilledLabel>انتخاب عکس</FilledLabel>
          <InputWrapper error={!brandImg && emptyError}>
            {brandImg ? 'تغییر عکس' : 'انتخاب کنید'}
            <FileInput
              type="file"
              onChange={e => setBrandImg(e.target.files[0])}
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

export default CarBrandInsertModal;

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
