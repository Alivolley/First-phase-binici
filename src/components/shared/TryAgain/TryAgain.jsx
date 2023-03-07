import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

const TryAgain = ({ tryAgain = () => '' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Button onClick={() => tryAgain()}>سعی مجدد</Button>
    </Box>
  );
};

export default TryAgain;
