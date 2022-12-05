import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Box, Button, Menu } from '@mui/material';
import { alpha, styled as muiStyled } from '@mui/material/styles';
import { MuiRTL } from 'lib/MuiRTL';

import { SettingsIcon } from '../SettingsIcon/SettingsIcon';

export const SettingsDropdownMenu = props => {
  const {
    type,
    title,
    icon,
    children,
    isOpen,
    anchorEl,
    onToggle,
    handleClose,
    ...restProps
  } = props;

  return (
    <Box {...restProps}>
      <MuiRTL>
        <ButtonWrapper>
          {type === 'circlular' ? (
            <SettingsIcon icon={icon} onClick={onToggle} />
          ) : (
            <StyledButton
              id="user-settings-button"
              aria-controls={isOpen ? 'user-settings-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isOpen ? 'true' : undefined}
              variant="contained"
              color="inherit"
              disableElevation
              fullWidth
              startIcon={icon}
              endIcon={
                isOpen ? (
                  <KeyboardArrowUpIcon sx={{ ml: 3 }} />
                ) : (
                  <KeyboardArrowDownIcon sx={{ ml: 3 }} />
                )
              }
              onClick={onToggle}
            >
              {title}
            </StyledButton>
          )}
        </ButtonWrapper>
        <StyledMenu
          id="user-settings-menu"
          MenuListProps={{
            'aria-labelledby': 'user-settings-button',
          }}
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
        >
          {children}
        </StyledMenu>
      </MuiRTL>
    </Box>
  );
};

const ButtonWrapper = muiStyled(Box)(({ theme, type }) => ({
  width: '100%',
  borderRadius: '37px',
  backgroundColor: theme.palette.brand.grey.quaternary,
  filter:
    type === 'circular'
      ? 'unset'
      : `drop-shadow(0px 3px 6px ${alpha(theme.palette.layout.reverse, 0.18)})`,
}));

const StyledButton = muiStyled(Button)(({ theme }) => ({
  'width': '100%',
  'borderRadius': '37px',
  'justifyContent': 'space-between',
  '&.MuiButton-root:hover': {
    backgroundColor: theme.palette.brand.grey.quaternary,
  },
}));

const StyledMenu = muiStyled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    'borderRadius': 6,
    'marginTop': theme.spacing(1),
    'minWidth': 180,
    'color':
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    'boxShadow':
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiList-root': {
      direction: 'ltr',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
