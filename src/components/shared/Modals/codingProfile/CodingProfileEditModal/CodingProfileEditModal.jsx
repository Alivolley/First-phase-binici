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
import useCodingProfileEdit from 'api/codingProfile/useCodingProfileEdit/useCodingProfileEdit';
import useCodingProfileType from 'api/codingProfile/useCodingProfileType/useCodingProfileType';
import React, { useEffect, useState } from 'react';

import SpinnerLoader from '../../../SpinnerLoader/SpinnerLoader';

const CodingProfileEditModal = ({
  open,
  handleClose,
  chosenBasket,
  getCodingProfileList,
}) => {
  const [codeName, setCodeName] = useState('');
  const [codePrefix, setCodePrefix] = useState('');
  const [codeType, setCodeType] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [getCodingProfileTypeList, loading, codingProfileTypeList] =
    useCodingProfileType();
  const [editRequest] = useCodingProfileEdit();

  useEffect(() => {
    getCodingProfileTypeList();
  }, []);

  useEffect(() => {
    setCodeName(chosenBasket.title);
    chosenBasket.prefix
      ? setCodePrefix(chosenBasket.prefix)
      : setCodePrefix('');
    setCodeType(chosenBasket.type);
  }, [chosenBasket]);

  const submitCodeGroup = () => {
    if (codeName && codeType) {
      setEmptyError(false);
      setEditLoading(true);
      editRequest(
        chosenBasket.id,
        getCodingProfileList,
        handleClose,
        setEditLoading,
        codeName,
        codePrefix,
        codeType,
      );
    } else {
      setEmptyError(true);
    }
  };

  return (
    codeType && (
      <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
        <DialogTitle>ویراش کد پرفایل</DialogTitle>

        <DialogContent>
          <FilledWrapper>
            <FilledLabel>عنوان</FilledLabel>
            <TextField
              autoFocus
              variant="standard"
              value={codeName}
              onChange={e => setCodeName(e.target.value)}
              sx={{ minWidth: 300 }}
              error={!codeName && emptyError}
            />
          </FilledWrapper>

          <FilledWrapper>
            <FilledLabel>پیشوند</FilledLabel>
            <TextField
              autoFocus
              variant="standard"
              value={codePrefix}
              onChange={e => setCodePrefix(e.target.value)}
              sx={{ minWidth: 300 }}
              error={!codePrefix && emptyError}
            />
          </FilledWrapper>

          <FilledWrapper>
            <FilledLabel>نوع</FilledLabel>
            <FormControl
              variant="standard"
              sx={{ width: '100%', paddingRight: 3 }}
              error={!codeType && emptyError}
            >
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={codeType}
                onChange={e => setCodeType(e.target.value)}
              >
                {loading ? (
                  <SpinnerLoader />
                ) : (
                  codingProfileTypeList.map(type => (
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
            اضافه کردن
          </LoadingButton>
        </DialogActions>
      </Dialog>
    )
  );
};

export default CodingProfileEditModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;
