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
import useEditBaseNode from 'api/productCategories/useEditBaseNode';
import useGetAllBaseNodeTypes from 'api/productCategories/useGetAllBaseNodeTypes';
import useGetBaseNodeDefaultItem from 'api/productCategories/useGetBaseNodeDefaultItem';
import { MuiRTL } from 'lib/MuiRTL';
import React, { useEffect, useState } from 'react';

const EditProductBaseNodeModal = props => {
  const { guid } = props;

  const [editLoading, editBaseNode] = useEditBaseNode();
  const [itemsLoading, items, getAllBaseNodeTypes] = useGetAllBaseNodeTypes();
  const [defaultItemLoading, defaultItem, getdefaultItem] =
    useGetBaseNodeDefaultItem();

  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    getAllBaseNodeTypes();
    getdefaultItem(guid);
  }, []);

  useEffect(() => {
    if (!itemsLoading && !defaultItemLoading) {
      const selected = items.find(
        item => item.key === defaultItem.baseNodeType,
      );
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
          onClick={() => editBaseNode(guid, selectedItem, props.refreshData)}
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

export default EditProductBaseNodeModal;
