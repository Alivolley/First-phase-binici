import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import Countdown from 'react-countdown';

export const CountDownTimer = props => {
  const { onResendCode } = props;

  const [timerKey, setTimerKey] = useState(false);

  const renderer = ({ minutes, seconds, completed }) => {
    const onResendClick = () => {
      setTimerKey(prev => !prev);
      onResendCode();
    };

    if (completed) {
      return (
        <ResendButton variant="text" onClick={onResendClick}>
          ارسال مجدد
        </ResendButton>
      );
    } else {
      return (
        <Timer>
          {minutes}:{seconds > 9 ? seconds : `0${seconds}`}
        </Timer>
      );
    }
  };

  return (
    <Countdown
      key={timerKey}
      date={Date.now() + 80000}
      intervalDelay={0}
      renderer={renderer}
    />
  );
};

const Timer = styled.span`
  display: inline-block;
  font-family: 'Yekan-Bold';
  font-size: 18px;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      color: theme.palette.primary.contrastText,
    },
  })}
`;

const ResendButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    color: theme.palette.primary.contrastText,
  },
}));
