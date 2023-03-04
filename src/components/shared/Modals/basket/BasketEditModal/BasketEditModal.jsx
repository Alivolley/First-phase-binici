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
import useBasketType from 'api/baskets/useBasketType/useBasketType';
import useEditBasket from 'api/baskets/useEditBasket/useEditBasket';
import React, { useEffect, useState } from 'react';

import SpinnerLoader from '../../../SpinnerLoader/SpinnerLoader';

const BasketEditModal = ({
  open,
  handleClose,
  chosenBasket,
  getBasketList,
}) => {
  const [basketName, setBasketName] = useState('');
  const [basketType, setBasketType] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [getBasketTypeList, loading, basketTypeList] = useBasketType();
  const [editRequest] = useEditBasket();

  useEffect(() => {
    getBasketTypeList();
  }, []);

  useEffect(() => {
    setBasketName(chosenBasket.title);
    setBasketType(chosenBasket.type);
  }, [chosenBasket]);

  const submitBasket = () => {
    if (basketName && basketType) {
      setEmptyError(false);
      setEditLoading(true);
      editRequest(
        chosenBasket.id,
        getBasketList,
        handleClose,
        setEditLoading,
        basketName,
        basketType,
      );
    } else {
      setEmptyError(true);
    }
  };

  const closeModal = () => {
    handleClose();
    setEmptyError(false);
  };

  return (
    <Dialog open={open} onClose={closeModal} sx={{ direction: 'rtl' }}>
      <DialogTitle>ویرایش سبد</DialogTitle>

      <DialogContent>
        {basketType && basketName ? (
          <>
            <FilledWrapper>
              <FilledLabel>نام سبد</FilledLabel>
              <TextField
                autoFocus
                variant="standard"
                value={basketName}
                onChange={e => setBasketName(e.target.value)}
                sx={{ minWidth: 300 }}
                error={!basketName && emptyError}
              />
            </FilledWrapper>

            <FilledWrapper>
              <FilledLabel>نوع</FilledLabel>
              <FormControl
                variant="standard"
                sx={{ width: '100%', paddingRight: 3 }}
                error={!basketType && emptyError}
              >
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={basketType}
                  onChange={e => setBasketType(e.target.value)}
                >
                  {loading ? (
                    <SpinnerLoader />
                  ) : (
                    basketTypeList.map(type => (
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
          </>
        ) : (
          <SpinnerLoader />
        )}
      </DialogContent>

      <DialogActions sx={{ gap: 1, padding: 3 }}>
        <Button onClick={closeModal} variant="contained" disabled={editLoading}>
          انصراف
        </Button>
        <LoadingButton
          variant="contained"
          color="warning"
          onClick={submitBasket}
          loading={editLoading}
        >
          اضافه کردن
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default BasketEditModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;
