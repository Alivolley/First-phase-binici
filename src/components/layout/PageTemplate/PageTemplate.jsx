import styled from '@emotion/styled';
import { alpha } from '@mui/material';
import {
  desktopTemplateAnimationVariants,
  mobileTemplateAnimationVariants,
} from 'animations/layout/pageTemplateAnimations';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { isSidebarOpenAtom } from 'store/private/layout/layoutAtoms';

import { TemplateTitleBar } from './TemplateTitleBar/TemplateTitleBar';

export const PageTemplate = props => {
  const { children } = props;

  const [isSidebarOpen] = useAtom(isSidebarOpenAtom);

  return (
    <Wrapper
      animate={isSidebarOpen ? 'default' : 'wide'}
      variants={desktopTemplateAnimationVariants}
    >
      <TemplateTitleBar />
      <Main>
        <PerfectScrollbar>
          <Children>{children}</Children>
        </PerfectScrollbar>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled(motion.section)`
  padding: 20px;
  z-index: 10;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  ${({ theme }) => ({
    height: '100vh',
    backgroundColor: theme.palette.layout.disabled,

    [theme.breakpoints.down('md')]: {
      width: '100% !important',
    },
  })}
`;

const Main = styled.main`
  width: 100%;
  overflow: hidden;
  height: calc(100vh - 102px);
  border-radius: 15px;
  padding: 4px 0;
  ${({ theme }) => ({
    backgroundColor: theme.palette.layout.main,
    filter: `drop-shadow(
      0px 3px 6px ${alpha(theme.palette.brand.blue.secondary, 0.19)}
    )`,

    [theme.breakpoints.down('md')]: {
      width: '100% !important',
      height: 'calc(100vh - 156px)',
    },
  })}
`;

const Children = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  direction: rtl;
  padding: 16px;
`;
