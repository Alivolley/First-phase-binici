import styled from '@emotion/styled';
import { alpha, css, IconButton, Typography } from '@mui/material';

export const NavCircularButton = props => {
  const {
    variant,
    size,
    icon,
    label,
    isSelected,
    isTitleLogo,
    className,
    onClick,
  } = props;

  return (
    <Container>
      <IconContainer
        variant={variant}
        size={size}
        isSelected={isSelected}
        isTitleLogo={isTitleLogo}
        isClickable={onClick != null}
        className={className}
        onClick={onClick != null ? onClick : undefined}
      >
        {onClick != null ? (
          <IconButton color={variant === 'light' ? 'inherit' : 'primary'}>
            <Inner variant={variant} size={size} isSelected={isSelected}>
              {icon}
            </Inner>
          </IconButton>
        ) : (
          <Inner variant={variant} size={size} isSelected={isSelected}>
            {icon}
          </Inner>
        )}
      </IconContainer>

      {label ? (
        <Label variant="h5" component="h2" mt={1}>
          {label}
        </Label>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconContainer = styled.div`
  ${({ theme, variant, size, isSelected, isTitleLogo, isClickable }) => {
    let circleSize;
    let bgColor;
    let textColor;

    switch (size) {
      case 'small':
        circleSize = '2.813rem';
        break;
      case 'medium':
        circleSize = '4.875rem';
        break;
      case 'large':
        circleSize = '6.813rem';
        break;

      default:
        break;
    }

    switch (variant) {
      case 'light':
        if (isSelected) {
          bgColor = theme.palette.brand.orange.secondary;
          textColor = theme.palette.primary.contrastText;
        } else {
          bgColor = theme.palette.primary.contrastText;
          textColor = theme.palette.grey[600];
        }
        break;
      case 'brand':
        bgColor =
          'linear-gradient(234deg, rgba(0,86,179,1) 0%, rgba(0,51,90,0.36) 100%)';
        textColor = theme.palette.primary.contrastText;
        break;
      case 'dark':
        if (isTitleLogo) {
          bgColor = theme.palette.brand.blue.primary;
        } else {
          bgColor =
            'linear-gradient(234deg, rgba(0,86,179,1) 0%, rgba(0,51,90,0.36) 100%)';
        }
        textColor = theme.palette.primary.contrastText;
        break;

      default:
        bgColor =
          'linear-gradient(234deg, rgba(0,86,179,1) 0%, rgba(0,51,90,0.36) 100%)';
        textColor = theme.palette.primary.contrastText;
        break;
    }

    return css`
      width: ${circleSize};
      height: ${circleSize};
      color: ${textColor};
      cursor: ${isClickable ? 'pointer' : 'default'};
      border: ${`1px solid ${alpha(theme.palette.brand.blue.secondary, 0.43)}`};
      background: ${bgColor};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    `;
  }}
`;

const Inner = styled.div`
  ${({ theme, variant, size, isSelected }) => {
    let circleSize;
    let bgColor;
    let textColor;
    let svgIconSize;

    switch (size) {
      case 'small':
        circleSize = '2.213rem';
        svgIconSize = '1.213rem';
        break;
      case 'medium':
        circleSize = '4.275rem';
        svgIconSize = '2.475rem';
        break;
      case 'large':
        circleSize = '5.813rem';
        svgIconSize = '3.413rem';
        break;

      default:
        break;
    }

    switch (variant) {
      case 'light':
        if (isSelected) {
          bgColor = alpha(theme.palette.brand.grey.quaternary, 0.3);
          textColor = theme.palette.primary.contrastText;
        } else {
          bgColor = alpha(theme.palette.brand.grey.ternary, 0.31);
          textColor = theme.palette.grey[600];
        }
        break;
      case 'brand':
        bgColor = alpha(theme.palette.brand.blue.secondary, 0.15);
        textColor = theme.palette.primary.contrastText;
        break;
      case 'dark':
        bgColor = alpha(theme.palette.brand.blue.secondary, 0.15);
        textColor = theme.palette.primary.contrastText;
        break;

      default:
        bgColor = theme.palette.brand.blue.secondary;
        textColor = theme.palette.primary.contrastText;
        break;
    }

    return css`
      width: ${circleSize};
      height: ${circleSize};
      color: ${textColor};
      background-color: ${bgColor};
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;

      & .MuiSvgIcon-root {
        color: ${textColor};
        fill: ${textColor};
        font-size: ${svgIconSize};
      }
    `;
  }}
`;

const Label = styled(Typography)`
  ${({ theme }) => css`
    color: ${theme.palette.primary.contrastText};
  `}
`;
