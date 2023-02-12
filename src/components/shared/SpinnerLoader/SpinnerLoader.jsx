import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const SpinnerLoader = () => {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <CircularProgress />
    </Box>
  );
};

export default SpinnerLoader;
