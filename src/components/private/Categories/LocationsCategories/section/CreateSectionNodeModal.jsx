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
import useCreateSubNode from 'api/productCategories/useCreateSubNode';
import useGetSubNodeTypes from 'api/productCategories/useGetSubNodeTypes';
import { MuiRTL } from 'lib/MuiRTL';
import React, { useEffect, useState } from 'react';

const CreateSectionNodeModal = props => {
  const { guid, isParent, type } = props;

  const [createLoading, createSubNode] = useCreateSubNode();
  const [itemsLoading, items, getSubNodeTypes] = useGetSubNodeTypes();

  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    getSubNodeTypes(guid, isParent, type);
  }, []);

  return (
    <Dialog
      open={props.show}
      onClose={() => {
        props.closeHandler();
        setSelectedItem('');
      }}
      sx={{ direction: 'rtl' }}
    >
      <DialogTitle>افزودن دسته بندی</DialogTitle>

      <DialogContent dir="rtl">
        {itemsLoading ? (
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
          loading={createLoading}
          disabled={!selectedItem}
          onClick={() =>
            createSubNode(
              { parentGuid: guid, nodeGuid: selectedItem, type },
              props.refreshData,
            )
          }
        >
          تایید
        </LoadingButton>
        <LoadingButton
          variant="contained"
          color="warning"
          loading={createLoading}
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

export default CreateSectionNodeModal;
