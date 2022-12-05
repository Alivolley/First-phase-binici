import styled from '@emotion/styled';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { alpha, Typography, useMediaQuery, useTheme } from '@mui/material';
import LogoSvg from 'assets/images/logo/Blue-Logo.svg';
import { SettingsIcon } from 'components/shared/SettingsIcon/SettingsIcon';
import { useAtom } from 'jotai';
import {
  isMobileBurgerMenuOpenAtom,
  selectedCategoryDataAtom,
  selectedMobileBurgerTabDataAtom,
  selectedRouteTitleAtom,
} from 'store/private/layout/layoutAtoms';

import { PageTemplateActions } from '../../PageTemplateActions/PageTemplateActions';

export const TemplateTitleBar = props => {
  const theme = useTheme();
  const isBelowTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedRouteTitle] = useAtom(selectedRouteTitleAtom);
  const [selectedCategoryData, setSelectedCategoryData] = useAtom(
    selectedCategoryDataAtom,
  );
  const [selectedMobileBurgerTabData, setSelectedMobileBurgerTabData] = useAtom(
    selectedMobileBurgerTabDataAtom,
  );
  const [isMobileBurgerMenuOpen, setIsMobileBurgerMenuOpen] = useAtom(
    isMobileBurgerMenuOpenAtom,
  );

  const onClickSearch = () => {
    setIsMobileBurgerMenuOpen(true);
    setSelectedMobileBurgerTabData({
      id: selectedCategoryData.id,
      name: 'search',
      icon: <SearchRoundedIcon />,
      label: 'جستجو',
    });
  };

  const onClickMenu = () => {
    setIsMobileBurgerMenuOpen(true);
    setSelectedMobileBurgerTabData({ ...selectedCategoryData });
  };

  if (isBelowTablet) {
    return (
      <MobileTitleBar>
        <SettingsIcon
          icon={<SearchRoundedIcon />}
          label="serach"
          onClick={onClickSearch}
        />
        <AppLogoBox>
          <AppLogo src={LogoSvg} alt="logo" />
        </AppLogoBox>
        <SettingsIcon
          icon={<MenuRoundedIcon />}
          label="menu"
          onClick={onClickMenu}
        />
      </MobileTitleBar>
    );
  } else {
    return (
      <TitleBar>
        <PageTemplateActions />
        <Title variant="h5" component="h2" color="GrayText" noWrap>
          {selectedRouteTitle}
        </Title>
      </TitleBar>
    );
  }
};

const MobileTitleBar = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 10;
`;

const AppLogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppLogo = styled.img`
  width: 74px;
`;

const TitleBar = styled.header`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 10;
`;

const Title = styled(Typography)`
  direction: rtl;
  font-family: 'Yekan-Bold';
  text-align: right;
  max-width: calc(100% - 360px);
  ${({ theme }) => ({
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 600,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  })}
`;
