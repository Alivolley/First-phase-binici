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
import useInsertBasket from 'api/baskets/useInsertBasket/useInsertBasket';
import React, { useEffect, useState } from 'react';

import SpinnerLoader from '../../../SpinnerLoader/SpinnerLoader';

const BasketInsertModal = ({ open, handleClose, getBasketList, guid }) => {
  const [basketName, setBasketName] = useState('');
  const [basketType, setBasketType] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [insertLoading, setInsertLoading] = useState(false);

  const [getBasketTypeList, loading, basketTypeList] = useBasketType();
  const [insertRequest] = useInsertBasket();

  useEffect(() => {
    getBasketTypeList();
  }, []);

  const submitBasket = () => {
    if ((basketName, basketType)) {
      setEmptyError(false);
      setInsertLoading(true);
      insertRequest(
        guid,
        getBasketList,
        handleClose,
        setInsertLoading,
        basketName,
        basketType,
        setBasketName,
        setBasketType,
      );
    } else {
      setEmptyError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      <DialogTitle>افزودن سبد</DialogTitle>

      <DialogContent>
        <FilledWrapper>
          <FilledLabel>نام سبد</FilledLabel>
          <TextField
            autoFocus
            variant="standard"
            value={basketName}
            onChange={e => setBasketName(e.target.value)}
            sx={{ minWidth: 300 }}
            error={emptyError}
          />
        </FilledWrapper>

        <FilledWrapper>
          <FilledLabel>نوع</FilledLabel>
          <FormControl
            variant="standard"
            sx={{ width: '100%', paddingRight: 3 }}
            error={emptyError}
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
      </DialogContent>

      <DialogActions sx={{ gap: 1, padding: 3 }}>
        <Button
          onClick={handleClose}
          variant="contained"
          disabled={insertLoading}
        >
          انصراف
        </Button>
        <LoadingButton
          variant="contained"
          color="warning"
          onClick={submitBasket}
          loading={insertLoading}
        >
          اضافه کردن
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default BasketInsertModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;
