import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { alpha } from '@mui/material';
import { bottomBarAnimationVariants } from 'animations/layout/bottomBarAnimations';
import { NavCircularButton } from 'components/shared/NavCircularButton/NavCircularButton';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import {
  isBottomBarOpenAtom,
  selectedCategoryDataAtom,
} from 'store/private/layout/layoutAtoms';

import { CategoryLinks } from '../CategoryLinks/CategoryLinks';
import { PageTemplateActions } from '../PageTemplateActions/PageTemplateActions';

export const BottomBar = props => {
  const [isBottomBarOpen, setIsBottomBarOpen] = useAtom(isBottomBarOpenAtom);
  const [selectedCategoryData] = useAtom(selectedCategoryDataAtom);
  console.log(isBottomBarOpen);

  return (
    <Container
      animate={isBottomBarOpen ? 'open' : 'closed'}
      variants={bottomBarAnimationVariants}
    >
      <ActiveLogoBox onClick={() => setIsBottomBarOpen(!isBottomBarOpen)}>
        <NavCircularButton
          variant="dark"
          size="medium"
          icon={selectedCategoryData.icon}
          isTitleLogo
        />
      </ActiveLogoBox>
      <StaticBar>
        <PageTemplateActions />
      </StaticBar>
      <FluidBar>
        <CategoryLinks direction="row" />
      </FluidBar>
    </Container>
  );
};

const Container = styled(motion.aside)`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 33;
  padding: 14px;
  transform: translateY(calc(100% - 62px));
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  ${({ theme }) => ({
    backgroundColor: theme.palette.brand.blue.primary,

    [theme.breakpoints.up('md')]: {
      display: 'none !important',
    },
  })}
`;

const StaticBar = styled(motion.div)`
  width: 100%;
  padding-bottom: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({ theme }) => theme.palette.brand.blue.primary};
`;

const FluidBar = styled(motion.div)`
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => ({
    border: `1px solid ${alpha(theme.palette.layout.main, 0.09)}`,
    backgroundColor: alpha(theme.palette.brand.blue.secondary, 0.15),
    filter: `drop-shadow(0px 3px 8px ${alpha(
      theme.palette.brand.blue.secondary,
      0.19,
    )})`,
  })}
`;

const ActiveLogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 5;
  ${({ theme }) => ({
    border: `3px solid ${theme.palette.layout.disabled}`,
  })}
`;
