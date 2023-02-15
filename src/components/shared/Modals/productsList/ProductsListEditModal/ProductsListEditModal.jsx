import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useEditProduct from 'api/productsList/useEditProduct/useEditProduct';
import useGetEditInfo from 'api/productsList/useGetEditInfo/useGetEditInfo';
import useImageKey from 'api/productsList/useImageKey/useImageKey';
import React, { useEffect, useState } from 'react';

import SpinnerLoader from '../../../SpinnerLoader/SpinnerLoader';

const ProductsListEditModal = ({
  open,
  handleClose,
  getProsuctList,
  mainInfo,
}) => {
  const [productName, setProductName] = useState('');
  const [preFixName, setPreFixName] = useState('');
  const [explain, setExplain] = useState('');
  const [productImg, setProductImg] = useState();
  const [emptyError, setEmptyError] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [imageRequest] = useImageKey();
  const [editRequest] = useEditProduct();
  const [getEditInfo, loading, gottenProduct] = useGetEditInfo();

  useEffect(() => {
    mainInfo.id &&
      getEditInfo(mainInfo.id, setProductName, setPreFixName, setExplain);
  }, [mainInfo]);

  const editProduct = key => {
    editRequest(
      gottenProduct.guid,
      getProsuctList,
      closeModal,
      setEditLoading,
      productName,
      preFixName,
      explain,
      key,
    );
  };

  const uploadImage = () => {
    if (productName && preFixName && explain) {
      setEditLoading(true);
      setEmptyError(false);

      if (productImg) {
        console.log('object');
        const formData = new FormData();
        formData.append('Files', productImg);
        imageRequest(formData, editProduct);
      } else {
        editProduct(gottenProduct.imageKey);
      }
    } else {
      setEmptyError(true);
    }
  };

  const closeModal = () => {
    handleClose();
    setProductImg();
    setEmptyError(false);
  };

  return (
    <Dialog open={open} onClose={closeModal} sx={{ direction: 'rtl' }}>
      <DialogTitle>ویرایش محصول</DialogTitle>

      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <DialogContent>
            <FilledWrapper>
              <FilledLabel>نام محصول</FilledLabel>
              <TextField
                autoFocus
                variant="standard"
                value={productName}
                onChange={e => setProductName(e.target.value)}
                sx={{ minWidth: 300 }}
                error={!productName && emptyError}
              />
            </FilledWrapper>

            <FilledWrapper>
              <FilledLabel>پیشوند</FilledLabel>
              <TextField
                variant="standard"
                value={preFixName}
                onChange={e => setPreFixName(e.target.value)}
                sx={{ minWidth: 300 }}
                error={!preFixName && emptyError}
              />
            </FilledWrapper>

            <FilledWrapper>
              <FilledLabel>توضیحات</FilledLabel>
              <TextArea
                rows="5"
                value={explain}
                onChange={e => setExplain(e.target.value)}
                error={!explain && emptyError}
              />
            </FilledWrapper>

            <FilledWrapper>
              <FilledLabel>انتخاب عکس</FilledLabel>
              <InputWrapper>
                تغییر عکس
                <FileInput
                  type="file"
                  onChange={e => setProductImg(e.target.files[0])}
                  accept="image/*"
                />
              </InputWrapper>
            </FilledWrapper>
          </DialogContent>

          <DialogActions sx={{ gap: 1, padding: 3 }}>
            <Button
              onClick={closeModal}
              variant="contained"
              disabled={editLoading}
            >
              انصراف
            </Button>
            <LoadingButton
              variant="contained"
              color="warning"
              onClick={uploadImage}
              loading={editLoading}
            >
              اعمال تغییرات
            </LoadingButton>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ProductsListEditModal;

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
