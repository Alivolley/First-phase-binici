import styled from '@emotion/styled';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  alpha,
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { MuiRTL } from 'lib/MuiRTL';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectedRouteTitleAtom } from 'store/private/layout/layoutAtoms';

import { navMenuLinks } from '../../navLinks';
import { isLinkActive, isSubLinkActive } from './helpers';

export const StoreMenuLinks = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedRouteTitle, setSelectedRouteTitle] = useAtom(
    selectedRouteTitleAtom,
  );
  const [activeDropdownMenuId, setActiveDropdownMenuId] = useState('');

  const onSelectSubLink = subLink => {
    setSelectedRouteTitle(subLink.label);
    navigate(subLink.href);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MuiRTL>
          <NavList
            component="nav"
            aria-label="main links"
            sx={{ width: '100%' }}
          >
            {navMenuLinks.map(link => {
              return (
                <>
                  <NavListItem
                    key={link.id}
                    selected={isLinkActive(link, pathname)}
                    sx={{ mt: link.mt ? 3 : 0 }}
                    onClick={() =>
                      setActiveDropdownMenuId(
                        activeDropdownMenuId === link.id ? '' : link.id,
                      )
                    }
                  >
                    <StyledListItemIcon sx={{ width: 'auto' }} color="inherit">
                      {link.icon}
                    </StyledListItemIcon>
                    <ListItemText
                      primary={link.label}
                      sx={{
                        marginLeft: '16px',
                      }}
                    />
                    {activeDropdownMenuId === link.id ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </NavListItem>
                  <Collapse
                    in={activeDropdownMenuId === link.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <LinksWrapper>
                      <CollapsebleList component="div" disablePadding>
                        {link.subLinks.map(subLink => (
                          <CollapseListItem
                            key={subLink.id}
                            selected={isSubLinkActive(subLink, pathname)}
                            sx={{ mt: link.mt ? 3 : 0 }}
                            onClick={() => onSelectSubLink(subLink)}
                          >
                            <ListItemText primary={subLink.label} />
                            {isSubLinkActive(subLink, pathname) ? (
                              <SubListItemActiveIcon />
                            ) : null}
                          </CollapseListItem>
                        ))}
                      </CollapsebleList>
                    </LinksWrapper>
                  </Collapse>
                </>
              );
            })}
          </NavList>
        </MuiRTL>
      </Wrapper>
    </AnimatePresence>
  );
};

const Wrapper = styled(motion.div)`
  width: 100%;
`;

const NavList = styled(List)`
  width: 100%;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  & .MuiListItemButton-root {
    width: 100%;
    justify-content: flex-start;
    padding: 10px 12px 10px 8px;
    border-radius: 10px;
  }
  & .MuiListItemIcon-root {
    min-width: 0;
    width: 'auto';
    margin-right: 0;
  }
  & .MuiSvgIcon-root {
    width: 22px;
    height: 22px;
  }
`;

const NavListItem = styled(ListItemButton)`
  width: 100%;
  color: ${({ theme }) => theme.palette.primary.contrastText};
  & .MuiTypography-root {
    font-size: 0.85rem;
    font-family: 'Yekan-Regular';
  }
  & .Mui-selected {
    border-radius: 10px;
  }

  ${({ theme }) => ({
    '&.MuiListItemButton-root': {
      'marginBottom': '10px',
      '&:last-child': {
        marginBottom: 0,
      },
    },
    '&.MuiListItemButton-root.Mui-selected': {
      'borderRadius': '10px',
      'backgroundColor': alpha(theme.palette.brand.blue.ternary, 0.28),
      'filter': `drop-shadow(0px 3px 8px ${alpha(
        theme.palette.brand.blue.secondary,
        0.19,
      )})`,
      '& .MuiTypography-root': {
        fontSize: '0.9rem',
        fontFamily: 'Yekan-Bold',
      },
    },
    '& .MuiTouchRipple-child': {
      color: alpha(theme.palette.brand.blue.ternary, 0.34),
    },
  })}
`;

const LinksWrapper = styled(Box)`
  width: 100%;
  padding: 8px 0 8px 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CollapsebleList = styled(List)`
  width: 100%;
  padding-left: 14px;
  font-size: 0.85rem;
  font-family: 'Yekan-Regular';
  color: ${({ theme }) => theme.palette.primary.contrastText};
  border-left: ${({ theme }) =>
    `2px solid ${alpha(theme.palette.brand.blue.ternary, 0.24)}`};
  & .MuiListItemButton-root {
    width: 100%;
    justify-content: flex-start;
    padding: 10px 18px;
    border-radius: 10px;
  }
  & .MuiSvgIcon-root {
    width: 22px;
    height: 22px;
  }

  & .MuiTypography-root {
    font-size: 0.85rem;
    font-family: 'Yekan-Regular';
  }
  ${({ theme }) => ({
    '& .MuiListItemButton-root.Mui-selected': {
      borderRadius: '10px',
      backgroundColor: alpha(theme.palette.brand.blue.ternary, 0.18),
    },
    '& .MuiTouchRipple-child': {
      color: alpha(theme.palette.brand.blue.ternary, 0.34),
    },
  })}
`;

const CollapseListItem = styled(ListItemButton)`
  width: 100%;
  margin-bottom: 2px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const SubListItemActiveIcon = styled.div`
  ${({ theme }) => ({
    borderRadius: '50%',
    width: '9px',
    height: '9px',
    backgroundColor: theme.palette.primary.contrastText,
    border: `2px solid ${alpha(theme.palette.primary.contrastText, 0.5)}`,
  })}
`;
