import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useEditAttribute from 'api/codingAttribute/useEditAttribute/useEditAttribute';
import React, { useEffect, useState } from 'react';

const CodeAttributeEditModal = ({
  open,
  handleClose,
  chosenBasket,
  getAttributeList,
}) => {
  const [attrName, setAttrName] = useState('');
  const [attrValue, setAttrValue] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const [editRequest] = useEditAttribute();

  useEffect(() => {
    setAttrName(chosenBasket.title);
    setAttrValue(chosenBasket.value);
  }, [chosenBasket]);

  const submitCodeGroup = () => {
    if (attrName && attrValue) {
      setEmptyError(false);
      setEditLoading(true);
      editRequest(
        chosenBasket.id,
        getAttributeList,
        handleClose,
        setEditLoading,
        attrName,
        attrValue,
      );
    } else {
      setEmptyError(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      <DialogTitle>ثبت مقدار جدید</DialogTitle>

      <DialogContent>
        <FilledWrapper>
          <FilledLabel>عنوان</FilledLabel>
          <TextField
            autoFocus
            variant="standard"
            value={attrName}
            onChange={e => setAttrName(e.target.value)}
            sx={{ minWidth: 300 }}
            error={!attrName && emptyError}
          />
        </FilledWrapper>

        <FilledWrapper>
          <FilledLabel>مقدار</FilledLabel>
          <TextField
            autoFocus
            variant="standard"
            value={attrValue}
            onChange={e => setAttrValue(e.target.value)}
            sx={{ minWidth: 300 }}
            error={!attrValue && emptyError}
          />
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
  );
};

export default CodeAttributeEditModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;
