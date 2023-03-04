import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import useGetInfoProductDetail from 'api/productDetail/useGetInfoProductDetail/useGetInfoProductDetail';
import useGetPackageTypeList from 'api/productDetail/useGetPackageTypeList/useGetPackageTypeList';
import useProductPackagingEdit from 'api/productDetail/useProductPackagingEdit/useProductPackagingEdit';
import React, { useEffect, useState } from 'react';

import SpinnerLoader from '../../../SpinnerLoader/SpinnerLoader';

const ProductPackagingEditModal = ({
  open,
  handleClose,
  chosenProduct,
  getProductDetail,
}) => {
  const [packageName, setPackageName] = useState('');
  const [explain, setExplain] = useState('');
  const [packageLenght, setPackageLenght] = useState('');
  const [packageType, setPackageType] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [getPackageTypeList, loading, packageTypeList] =
    useGetPackageTypeList();
  const [editRequest] = useProductPackagingEdit();
  const [getEditInfo, getInfoLoading, gottenProduct] =
    useGetInfoProductDetail();

  useEffect(() => {
    getPackageTypeList();
  }, []);

  useEffect(() => {
    chosenProduct.id &&
      getEditInfo(
        chosenProduct.id,
        setPackageName,
        setExplain,
        setPackageLenght,
        setPackageType,
      );
  }, [chosenProduct]);

  const submitCodeGroup = () => {
    if (packageName && explain && packageLenght && packageType) {
      setEmptyError(false);
      setEditLoading(true);
      editRequest(
        chosenProduct.id,
        getProductDetail,
        handleClose,
        setEditLoading,
        packageName,
        explain,
        packageLenght,
        packageType,
      );
    } else {
      setEmptyError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      <DialogTitle>ویرایش پکیج</DialogTitle>

      {getInfoLoading ? (
        <SpinnerLoader />
      ) : (
        <>
          <DialogContent>
            <FilledWrapper>
              <FilledLabel>عنوان</FilledLabel>
              <TextField
                autoFocus
                variant="standard"
                value={packageName}
                onChange={e => setPackageName(e.target.value)}
                sx={{ minWidth: 300 }}
                error={!packageName && emptyError}
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
              <FilledLabel>تعداد</FilledLabel>
              <TextField
                autoFocus
                variant="standard"
                value={packageLenght}
                onChange={e => setPackageLenght(e.target.value)}
                sx={{ minWidth: 300 }}
                error={!packageLenght && emptyError}
                type="number"
                label="عدد"
              />
            </FilledWrapper>

            <FilledWrapper>
              <FilledLabel>نوع</FilledLabel>
              <FormControl
                variant="standard"
                sx={{ width: '100%', paddingRight: 3 }}
                error={!packageType && emptyError}
              >
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={packageType}
                  onChange={e => setPackageType(e.target.value)}
                >
                  {loading ? (
                    <SpinnerLoader />
                  ) : (
                    packageTypeList.map(type => (
                      <MenuItem
                        value={type.key}
                        key={type.key}
                        sx={{ direction: 'rtl' }}
                      >
                        {type.value}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </FilledWrapper>
          </DialogContent>

          <DialogActions sx={{ gap: 1, padding: 3 }}>
            <Button
              onClick={handleClose}
              variant="contained"
              disabled={editLoading}
            >
              انصراف
            </Button>
            <LoadingButton
              variant="contained"
              color="warning"
              onClick={submitCodeGroup}
              loading={editLoading}
            >
              ویرایش کردن
            </LoadingButton>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ProductPackagingEditModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
`;

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

const FilledLabel = styled.label``;
