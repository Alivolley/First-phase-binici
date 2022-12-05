import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { SettingsDropdownMenu } from 'components/shared/SettingsDropdownMenu/SettingsDropdownMenu';
import { useState } from 'react';

export const UserSettingsDropdown = props => {
  const theme = useTheme();
  const isBelowTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <SettingsDropdownMenu
      title="روزبه شامخی"
      type={isBelowTablet ? 'circlular' : 'square'}
      mr={isBelowTablet ? 0 : 3}
      anchorEl={anchorEl}
      isOpen={isOpen}
      icon={<PersonOutlineOutlinedIcon />}
      onToggle={e => setAnchorEl(e.currentTarget)}
      handleClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <AccountCircleOutlinedIcon />
        پروفایل
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ExitToAppOutlinedIcon />
        خروج
      </MenuItem>
    </SettingsDropdownMenu>
  );
};
