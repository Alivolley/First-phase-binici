import {Box, Button, Dialog} from '@mui/material';
import React from 'react';

import DialogHead from '../Head/Head';

export default function CreateCoddingModal({ open, onClose, onUpdate }) {
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogHead onClose={onClose} label="ویرایش کدینگ" />
      <Box sx={{ p: 3, direction: 'rtl' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ display: 'block', maxWidth: '120px', mr: 'auto', mt: 3 }}
          fullWidth
          disabled={infoLoad || !selected}
          size="large"
        >
          ثبت
        </Button>
      </Box>
    </Dialog>
  );
}
