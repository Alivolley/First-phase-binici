import styled from '@emotion/styled';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Stack } from '@mui/material';
import { SettingsIcon } from 'components/shared/SettingsIcon/SettingsIcon';

import { UserSettingsDropdown } from './UserSettingsDropdown/UserSettingsDropdown';

export const PageTemplateActions = props => {
  return (
    <Actions>
      <LeftIcons direction="row" justifyContent="flex-start" spacing={2}>
        <UserSettingsDropdown />
        <SettingsIcon
          icon={<NotificationsNoneIcon />}
          label="notifications"
          count={8}
        />
      </LeftIcons>
      <RightIcons direction="row" justifyContent="flex-end" spacing={2}>
        <SettingsIcon icon={<MailOutlineIcon />} label="messages" />
        <SettingsIcon icon={<SettingsOutlinedIcon />} label="settings" />
      </RightIcons>
    </Actions>
  );
};

const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
      justifyContent: 'space-between',
    },
  })}
`;

const LeftIcons = styled(Stack)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 16px;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      marginRight: 0,
    },
  })}
`;

const RightIcons = styled(Stack)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
