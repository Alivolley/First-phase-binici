import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import useInsertAttribute from 'api/codingAttribute/useInsertAttribute/useInsertAttribute';
import React, { useEffect, useState } from 'react';

const CodeAttributeInsertModal = ({
  open,
  handleClose,
  getAttributeList,
  groupGuid,
}) => {
  const [attrName, setAttrName] = useState('');
  const [attrValue, setAttrValue] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [insertLoading, setInsertLoading] = useState(false);

  const [insertRequest] = useInsertAttribute();

  const submitCodeGroup = () => {
    if (attrName && attrValue) {
      setEmptyError(false);
      setInsertLoading(true);
      insertRequest(
        groupGuid,
        getAttributeList,
        handleClose,
        setInsertLoading,
        attrName,
        attrValue,
        setAttrName,
        setAttrValue,
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
          disabled={insertLoading}
        >
          انصراف
        </Button>
        <LoadingButton
          variant="contained"
          color="warning"
          onClick={submitCodeGroup}
          loading={insertLoading}
        >
          اضافه کردن
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CodeAttributeInsertModal;

const FilledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-top: 30px;
`;

const FilledLabel = styled.label``;
