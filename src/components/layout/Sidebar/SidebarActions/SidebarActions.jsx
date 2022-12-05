import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Stack, styled } from '@mui/material';
import { NavCircularButton } from 'components/shared/NavCircularButton/NavCircularButton';
import { DashboardIcon } from 'components/svgIcons/DashboardIcon';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import {
  isSidebarOpenAtom,
  selectedCategoryDataAtom,
} from 'store/private/layout/layoutAtoms';

export const SidebarActions = props => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const [selectedCategoryData, setSelectedCategoryData] = useAtom(
    selectedCategoryDataAtom,
  );

  return (
    <Stack direction="column" spacing={2}>
      <NavCircularButton
        variant="brand"
        size="small"
        icon={<MenuRoundedIcon />}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <NavCircularButton
        variant="brand"
        size="small"
        icon={<DashboardIcon />}
        onClick={() => navigate('/')}
      />
      <NavCircularButton
        variant="brand"
        size="small"
        icon={<SearchRoundedIcon />}
        onClick={() =>
          setSelectedCategoryData({
            id: selectedCategoryData.id,
            name: 'search',
            icon: <SearchRoundedIcon />,
            label: 'جستجو',
          })
        }
      />
    </Stack>
  );
};
