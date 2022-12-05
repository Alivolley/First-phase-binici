import styled from '@emotion/styled';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LogoSvg from 'assets/images/logo/Orange-Logo.svg';
import { SettingsIcon } from 'components/shared/SettingsIcon/SettingsIcon';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import {
  isMobileBurgerMenuOpenAtom,
  selectedCategoryDataAtom,
  selectedMobileBurgerTabDataAtom,
} from 'store/private/layout/layoutAtoms';

import { MenuBar } from '../MenuBar/MenuBar';

export const MobileBurgerMenu = props => {
  const [isMobileBurgerMenuOpen, setIsMobileBurgerMenuOpen] = useAtom(
    isMobileBurgerMenuOpenAtom,
  );
  const [selectedCategoryData, setSelectedCategoryData] = useAtom(
    selectedCategoryDataAtom,
  );
  const [selectedMobileBurgerTabData, setSelectedMobileBurgerTabData] = useAtom(
    selectedMobileBurgerTabDataAtom,
  );

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TitleBar>
        <SettingsIcon
          type="brand"
          icon={<SearchRoundedIcon />}
          label="serach"
          onClick={() =>
            setSelectedMobileBurgerTabData(
              selectedMobileBurgerTabData.name === 'search'
                ? {
                    ...selectedCategoryData,
                  }
                : {
                    id: selectedCategoryData.id,
                    name: 'search',
                    icon: <SearchRoundedIcon />,
                    label: 'جستجو',
                  },
            )
          }
        />
        <SettingsIcon
          type="brand"
          icon={<CloseOutlinedIcon />}
          label="menu"
          onClick={() => setIsMobileBurgerMenuOpen(false)}
        />
      </TitleBar>
      <Content>
        <MenuBar mobileView />
      </Content>
      <AppLogoBox>
        <AppLogo src={LogoSvg} alt="logo" />
      </AppLogoBox>
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: ${({ theme }) => theme.palette.brand.blue.primary};
`;

const TitleBar = styled.div`
  width: 100%;
  height: 18px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 10;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100vh - 7rem);
  margin-top: -1rem;
`;

const AppLogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppLogo = styled.img`
  width: 74px;
`;
