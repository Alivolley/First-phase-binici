import styled from '@emotion/styled';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { LoadingButton } from '@mui/lab';
import { alpha, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OtpInput from 'react-otp-input';

import { CountDownTimer } from './CountDownTimer/CountDownTimer';

export const LoginStepTwo = props => {
  const {
    phoneNumber,
    otpCode,
    loginLoading,
    onOtpInputChange,
    onLoginStepTwo,
    onGoBack,
  } = props;

  const theme = useTheme();
  const iaBelowMediumSize = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container dir="rtl">
      <TitleBar justifyContent="space-between">
        <BackButton aria-label="Back" p={0} onClick={onGoBack}>
          <KeyboardArrowLeftIcon fontSize="large" />
        </BackButton>
        <Typography variant="h5" component="h2">
          ورود به پنل ادمین
        </Typography>
      </TitleBar>
      <Content>
        <Title>پیامک به شماره {phoneNumber} ارسال شد.</Title>
        <OtpBox>
          <OtpCodeInput
            isInputNum
            value={otpCode}
            onChange={onOtpInputChange}
            containerStyle={{
              width: '100%',
              justifyContent: iaBelowMediumSize ? 'center' : 'space-between',
            }}
          />
        </OtpBox>
        <ButtonBar>
          <ButtonBox>
            <LoadingButton
              variant="containedOrangeBrand"
              fullWidth
              size="large"
              loading={loginLoading}
              onClick={onLoginStepTwo}
            >
              ورود
            </LoadingButton>
          </ButtonBox>
          <CountDownTimer onResendCode={onLoginStepTwo} />
        </ButtonBar>
      </Content>
      <BottomBar>
        <Text>
          کد تایید به شماره شما ارسال شده است.
          <br />
          لطفا کد چهار رقمی را وارد کنید.
        </Text>
      </BottomBar>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TitleBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      color: theme.palette.primary.contrastText,
      justifyContent: 'center',
      marginBottom: '62px',
    },
  })}
`;

const BackButton = styled(IconButton)`
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  })}
`;

const Content = styled.div`
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-start',
    },
  })}
`;

const Title = styled.p`
  width: 100%;
  direction: rtl;
  font-family: 'Yekan-Regular';
  font-size: 20px;
  text-align: right;
  margin-bottom: 36px;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  })}
`;

const OtpBox = styled.div`
  width: 100%;
  direction: ltr;
`;

const OtpCodeInput = styled(OtpInput)(({ theme }) => ({
  'display': 'flex',
  'direction': 'ltr',
  'justifyContent': 'auto',
  'borderRadius': '15px',
  'padding': '0 8px',

  '& > input': {
    'width': '72px !important',
    'height': '54px',
    'lineHeight': 0,
    'borderRadius': '15px',
    'border': '1px solid',
    'borderColor': theme.palette.text.disabled,
    'outline': 'none',

    [theme.breakpoints.down('md')]: {
      color: theme.palette.primary.contrastText,
      backgroundColor: alpha(theme.palette.brand.blue.secondary, 0.1),
      borderColor: theme.palette.grey[400],
      justifyContent: 'center',
    },

    [theme.breakpoints.down('435')]: {
      width: '50px !important',
      height: '46px',
    },

    '&:focus': {
      borderColor: theme.palette.brand.blue.primary,
      outline: 'none',
      [theme.breakpoints.down('md')]: {
        borderColor: theme.palette.primary.contrastText,
      },
    },
  },
}));

const ButtonBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin-top: 42px;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      height: 'calc(100% - 60px)',
      flexDirection: 'column-reverse',
    },
  })}
`;

const ButtonBox = styled.div`
  width: 158px;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  })}
`;

const BottomBar = styled.div`
  width: 100%;
  padding-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  })}
`;

const Text = styled.p`
  width: 420px;
  direction: rtl;
  font-family: 'Yekan-Light';
  font-size: 20px;
  text-align: right;
`;
