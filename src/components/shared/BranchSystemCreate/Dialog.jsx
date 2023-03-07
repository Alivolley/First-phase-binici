import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React from 'react';

import BranchSystemCreate from './BranchSystemCreate';

export default function BranchCreateDialog({
  onClose,
  open,
  selected,
  handleConfirm,
}) {
  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <Box sx={{ p: 3, direction: 'rtl' }}>
        <BranchSystemCreate
          branchGuid={selected}
          onEditComplete={handleConfirm}
        />
      </Box>
    </Dialog>
  );
}
