import styled from '@emotion/styled';
import { alpha } from '@mui/material';
import { NavCircularButton } from 'components/shared/NavCircularButton/NavCircularButton';
import { useAtom } from 'jotai';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  selectedCategoryDataAtom,
  selectedMobileBurgerTabDataAtom,
} from 'store/private/layout/layoutAtoms';

import { MenuTabContentSwitcher } from './MenuTabContentSwitcher';

export const MenuBar = props => {
  const { mobileView } = props;

  const [selectedCategoryData] = useAtom(selectedCategoryDataAtom);
  const [selectedMobileBurgerTabData] = useAtom(
    selectedMobileBurgerTabDataAtom,
  );

  return (
    <FluidBarInside>
      <ActiveLogoBox>
        <NavCircularButton
          variant="dark"
          size="large"
          icon={
            mobileView
              ? selectedMobileBurgerTabData.icon
              : selectedCategoryData.icon
          }
          label={
            mobileView
              ? selectedMobileBurgerTabData.label
              : selectedCategoryData.label
          }
          isTitleLogo
        />
      </ActiveLogoBox>
      <ContentWrapper>
        <PerfectScrollbar>
          <Content>
            <MenuTabContentSwitcher />
          </Content>
        </PerfectScrollbar>
      </ContentWrapper>
    </FluidBarInside>
  );
};

const FluidBarInside = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 20px;
`;

const ActiveLogoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -84px;
  z-index: 5;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  padding-top: 94px;
  padding-bottom: 8px;
  border-radius: 20px;
  overflow: hidden;
  ${({ theme }) => ({
    border: `1px solid ${alpha(theme.palette.layout.main, 0.09)}`,
    backgroundColor: alpha(theme.palette.brand.blue.secondary, 0.15),
    filter: `drop-shadow(0px 3px 8px ${alpha(
      theme.palette.brand.blue.secondary,
      0.19,
    )})`,
  })}
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 14px;
`;
