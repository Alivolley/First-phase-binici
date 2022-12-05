import { Badge, Box, IconButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const SettingsIcon = props => {
  const { type = 'light', icon, label, count, menuIcon, onClick } = props;

  return (
    <Container type={type}>
      <IconButton
        aria-label={label}
        onClick={onClick}
        size="small"
        color={type === 'light' ? 'default' : 'primary'}
      >
        {count ? (
          <StyledBadge
            badgeContent={count}
            color="warning"
            max={99}
            menuIcon={menuIcon}
          >
            {icon}
          </StyledBadge>
        ) : (
          icon
        )}
      </IconButton>
    </Container>
  );
};

const Container = styled(Box)(({ theme, type }) => ({
  'borderRadius': '50%',
  'background':
    type === 'light'
      ? theme.palette.brand.grey.quaternary
      : 'linear-gradient(56deg, rgba(0,86,179,1) 0%, rgba(0,51,90,0.36) 100%)',
  'filter': `drop-shadow(0px 3px 6px ${alpha(
    theme.palette.layout.reverse,
    0.22,
  )})`,
  '& .MuiSvgIcon-root': {
    color:
      type === 'light'
        ? theme.palette.brand.grey.secondary
        : theme.palette.primary.contrastText,
  },
}));

const StyledBadge = styled(Badge)(({ theme, menuIcon }) => ({
  '& .MuiBadge-badge': {
    top: '-3px',
    right: '-3px',
    border: `2px solid ${
      menuIcon
        ? theme.palette.brand.blue.primary
        : theme.palette.layout.disabled
    }`,
    padding: '0 4px',
  },
}));
