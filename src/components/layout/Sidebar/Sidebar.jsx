import styled from '@emotion/styled';
import {
  fluidSlideAnimationVariants,
  staticSlideAnimationVariants,
} from 'animations/layout/sidebarAnimations';
import LogoSvg from 'assets/images/logo/Orange-Logo.svg';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { isSidebarOpenAtom } from 'store/private/layout/layoutAtoms';

import { CategoryLinks } from '../CategoryLinks/CategoryLinks';
import { MenuBar } from '../MenuBar/MenuBar';
import { SidebarActions } from './SidebarActions/SidebarActions';

export const Sidebar = props => {
  const [isSidebarOpen] = useAtom(isSidebarOpenAtom);

  return (
    <Container>
      <StaticBar
        animate={isSidebarOpen ? 'open' : 'closed'}
        variants={staticSlideAnimationVariants}
      >
        <PerfectScrollbar>
          <StaticBarContent>
            <SidebarActions />
            <CategoryLinks direction="column" />
            <AppLogoBox>
              <AppLogo src={LogoSvg} alt="logo" />
            </AppLogoBox>
          </StaticBarContent>
        </PerfectScrollbar>
      </StaticBar>
      <FluidBar
        animate={isSidebarOpen ? 'open' : 'closed'}
        variants={fluidSlideAnimationVariants}
      >
        <MenuBar />
      </FluidBar>
    </Container>
  );
};

const Container = styled.aside`
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  })}
`;

const StaticBar = styled(motion.div)`
  width: 77px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  overflow: hidden;
  z-index: 33;
  background-color: ${({ theme }) => theme.palette.brand.blue.primary};
`;

const StaticBarContent = styled.div`
  width: 100%;
  height: calc(100vh - 1px);
  min-height: 620px;
  padding: 14px 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const FluidBar = styled(motion.div)`
  width: 280px;
  height: 100%;
  padding: 16px 0 16px 16px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  position: fixed;
  top: 0;
  right: 76px;
  z-index: 22;
  background-color: ${({ theme }) => theme.palette.brand.blue.primary};
`;

const AppLogoBox = styled.div`
  height: 74px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 26px;
`;

const AppLogo = styled.img`
  width: 102px;
  transform: rotate(-90deg) translateX(14px);
`;
