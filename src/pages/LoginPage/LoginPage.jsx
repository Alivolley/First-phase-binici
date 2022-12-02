import { useGetLoginCodeApi } from 'api/private/loginPage/useGetLoginCodeApi';
import { useLoginApi } from 'api/private/loginPage/useLoginApi';
import { LoginPageTemplate } from 'components/private/LoginPage/LoginPageTemplate/LoginPageTemplate';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const [getCodeLoading, getCode] = useGetLoginCodeApi();
  const [loginLoading, login] = useLoginApi();

  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setphoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');

  const onLoginStepOne = () => {
    getCode(phoneNumber, () => setCurrentStep(currentStep + 1));
  };

  const onLoginStepTwo = () => {
    login(phoneNumber, otpCode);
  };

  const onGoBack = () => {
    setCurrentStep(1);
    setOtpCode('');
  };

  useEffect(() => {
    if (otpCode.length === 4) {
      onLoginStepTwo();
    }
  }, [otpCode]);

  return (
    <LoginPageTemplate
      currentStep={currentStep}
      phoneNumber={phoneNumber}
      otpCode={otpCode}
      getCodeLoading={getCodeLoading}
      loginLoading={loginLoading}
      onPhoneInputChange={value => setphoneNumber(value)}
      onOtpInputChange={value => setOtpCode(value)}
      onLoginStepOne={onLoginStepOne}
      onLoginStepTwo={onLoginStepTwo}
      onGoBack={onGoBack}
    />
  );
};

export default LoginPage;
