import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { MuiRTL } from 'lib/MuiRTL';
import { useState } from 'react';

export const SearchMenuContent = props => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <AnimatePresence exitBeforeEnter>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MuiRTL>
          <SearchField
            variant="filled"
            fullWidth
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
        </MuiRTL>
      </Wrapper>
    </AnimatePresence>
  );
};

const Wrapper = styled(motion.div)`
  width: 100%;
`;

const SearchField = styled(TextField)`
  ${({ theme }) => css`
    width: 100%;
    border-radius: 15px;
    & .MuiInputBase-root {
      border-radius: 15px;
    }
    & .MuiFilledInput-input {
      border-radius: 15px;
      color: ${theme.palette.primary.contrastText};
      padding: 12px 8px;
    }
    & .MuiFilledInput-root:after {
      display: none;
    }
    & .MuiInputBase-root:before {
      display: none;
    }
  `}
`;
