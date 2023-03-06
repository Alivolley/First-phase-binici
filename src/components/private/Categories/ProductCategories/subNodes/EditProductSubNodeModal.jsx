import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  CircularProgress,
  DialogTitle,
  TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useEditSubNode from 'api/productCategories/useEditSubNode';
import useGetSubNodeDefaultItem from 'api/productCategories/useGetSubNodeDefaultItem';
import useGetSubNodeTypes from 'api/productCategories/useGetSubNodeTypes';
import { MuiRTL } from 'lib/MuiRTL';
import React, { useEffect, useState } from 'react';

const EditProductSubNodeModal = props => {
  const { guid, isParent, type } = props;

  const [editLoading, editSubNode] = useEditSubNode();
  const [itemsLoading, items, getSubNodeTypes] = useGetSubNodeTypes();
  const [defaultItemLoading, defaultItem, getdefaultItem] =
    useGetSubNodeDefaultItem();

  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    getSubNodeTypes(guid, isParent, type);
    getdefaultItem(guid);
  }, []);

  useEffect(() => {
    if (!itemsLoading && !defaultItemLoading) {
      const selected = items.find(item => item.key === defaultItem.nodeGuid);
      setSelectedItem(selected != null ? selected.key : '');
    }
  }, [itemsLoading, defaultItemLoading]);

  return (
    <Dialog
      open={props.show}
      onClose={() => {
        props.closeHandler();
        setSelectedItem('');
      }}
      sx={{ direction: 'rtl' }}
    >
      <DialogTitle>ویرایش دسته بندی</DialogTitle>

      <DialogContent dir="rtl">
        {itemsLoading || defaultItemLoading ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'center', minWidth: 300 }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <MuiRTL>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="item-selection">نام گروه</InputLabel>
              <Select
                labelId="item-selection"
                id="item-selection-standard"
                value={selectedItem}
                onChange={e => setSelectedItem(e.target.value)}
              >
                {items.map(item => (
                  <MenuItem key={item.key} value={item.key}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </MuiRTL>
        )}
      </DialogContent>

      <DialogActions sx={{ gap: 1, padding: 3 }}>
        <LoadingButton
          variant="contained"
          color="primary"
          loading={editLoading}
          disabled={!selectedItem}
          onClick={() => editSubNode(guid, selectedItem, props.refreshData)}
        >
          تایید
        </LoadingButton>
        <LoadingButton
          variant="contained"
          color="warning"
          loading={editLoading}
          onClick={() => {
            props.closeHandler();
            setSelectedItem('');
          }}
        >
          انصراف
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductSubNodeModal;
