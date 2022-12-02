import styled from '@emotion/styled';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { alpha, IconButton, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BasketImage from 'assets/images/loginPage/Basket.png';
import LogoBoxPatternBG from 'assets/images/loginPage/Login-Pattern-BG.svg';
import OrangeLogoSvg from 'assets/images/logo/Orange-Logo.svg';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { LoginStepOne } from '../LoginStepOne/LoginStepOne';
import { LoginStepTwo } from '../LoginStepTwo/LoginStepTwo';

export const LoginPageTemplate = props => {
  const {
    currentStep,
    phoneNumber,
    otpCode,
    getCodeLoading,
    loginLoading,
    onPhoneInputChange,
    onOtpInputChange,
    onLoginStepOne,
    onLoginStepTwo,
    onGoBack,
  } = props;

  const theme = useTheme();
  const iaBelowMediumSize = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container>
      <PerfectScrollbar>
        <StepsWrapper>
          <LogoBox style={{ background: `url(${LogoBoxPatternBG})` }}>
            <Logo src={OrangeLogoSvg} alt="logo" />
            <BasketImg src={BasketImage} alt="" />
            {iaBelowMediumSize && currentStep === 2 ? (
              <BackButton aria-label="Back" color="inherit" onClick={onGoBack}>
                <KeyboardArrowLeftIcon fontSize="large" />
              </BackButton>
            ) : null}
          </LogoBox>
          <Content>
            <Steps>
              {currentStep === 1 ? (
                <LoginStepOne
                  phoneNumber={phoneNumber}
                  getCodeLoading={getCodeLoading}
                  onPhoneInputChange={onPhoneInputChange}
                  onLoginStepOne={onLoginStepOne}
                />
              ) : (
                <LoginStepTwo
                  phoneNumber={phoneNumber}
                  otpCode={otpCode}
                  loginLoading={loginLoading}
                  onOtpInputChange={onOtpInputChange}
                  onLoginStepTwo={onLoginStepTwo}
                  onGoBack={onGoBack}
                />
              )}
            </Steps>
          </Content>
        </StepsWrapper>
      </PerfectScrollbar>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  ${({ theme }) => ({
    backgroundColor: theme.palette.brand.blue.primary,
  })}
`;

const StepsWrapper = styled.div`
  width: 90%;
  max-width: 1225px;
  border-radius: 25px;
  height: 670px;
  max-height: 90vh;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transform: translate(-50%, -50%);
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  })}
`;

const LogoBox = styled.div`
  width: 340px;
  height: 100%;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 38px;
  border-bottom-left-radius: 38px;
  border: ${({ theme }) => `6px solid ${theme.palette.layout.main}`};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '96px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '20px',
      border: `1px solid ${alpha(theme.palette.layout.main, 0.15)}`,
      boxShadow: '0px 0px 8px 0px rgba(255,255,255,0.2) inset',
      color: '#fff',
    },
  })}
`;

const Logo = styled.img`
  position: absolute;
  top: 82px;
  left: calc(50% - 12px);
  z-index: 5;
  transform: translateX(-50%);
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '112px',
      position: 'unset',
      transform: 'unset',
    },
  })}
`;

const BasketImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 45%;
  z-index: 10;
  ${({ theme }) => ({
    [theme.breakpoints.down('lg')]: {
      left: '60px',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  })}
`;

const Content = styled.div`
  width: calc(100% - 305px);
  height: 100%;
  position: relative;
  border-top-left-radius: 38px;
  border-bottom-left-radius: 38px;
  padding: 48px 62px;
  margin-left: -35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.layout.main};
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      marginTop: '8px',
      width: '100%',
      height: 'calc(100% - 105px)',
      backgroundColor: alpha(theme.palette.brand.blue.secondary, 0.15),
      border: `1px solid ${alpha(theme.palette.layout.main, 0.15)}`,
      boxShadow: '0px 0px 8px 0px rgba(255,255,255,0.2) inset',
      marginLeft: 0,
      borderRadius: '20px',
      padding: '42px 24px 24px',
    },
  })}
`;

const Steps = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  left: 18px;
  transform: translateY(-50%);
`;
