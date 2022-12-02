import styled from '@emotion/styled';
import { PhoneIphoneOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MuiRTL } from 'lib/MuiRTL';
import { useState } from 'react';

export const LoginStepOne = props => {
  const { phoneNumber, getCodeLoading, onPhoneInputChange, onLoginStepOne } =
    props;

  const theme = useTheme();
  const iaBelowMediumSize = useMediaQuery(theme.breakpoints.down('md'));

  const [isInputValid, setIsInputValid] = useState(true);

  const onSubmit = () => {
    if (phoneNumber.length > 1 && phoneNumber.length === 11) {
      setIsInputValid(true);
      onLoginStepOne(phoneNumber);
    } else {
      setIsInputValid(false);
    }
  };

  return (
    <Container dir="rtl">
      <TitleBar justifyContent="flex-start">
        <Typography variant="h5" component="h2">
          ورود به پنل ادمین
        </Typography>
      </TitleBar>
      <Content>
        <Title>شماره موبایل خود را وارد کنید</Title>
        <MuiRTL>
          <PhoneNumberInput
            id="custom-css-outlined-input"
            placeholder="شماره موبایل"
            value={phoneNumber}
            fullWidth
            error={!isInputValid}
            helperText={isInputValid ? '' : 'لطفا شماره موبایل صحیح وارد کنید'}
            onChange={e => onPhoneInputChange(e.target.value)}
            InputProps={{
              startAdornment: (
                <StyledInputAdornment position="start">
                  <PhoneIphoneOutlined color="inherit" />
                </StyledInputAdornment>
              ),
            }}
          />
        </MuiRTL>
        <ButtonBar>
          <ButtonBox>
            <LoadingButton
              variant={
                iaBelowMediumSize
                  ? 'containedOrangeBrand'
                  : 'containedBlueBrand'
              }
              size="large"
              fullWidth
              loading={getCodeLoading}
              onClick={onSubmit}
            >
              دریافت کد
            </LoadingButton>
          </ButtonBox>
        </ButtonBar>
      </Content>
      <BottomBar>
        <Text>
          شما وارد صفحه ورود به پنل ادمین شده اید.
          <br />
          لطفا شماره خود را وارد کنید.
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
  justify-content: space-between;
  align-items: center;
  padding: 9px 0;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      color: theme.palette.primary.contrastText,
      justifyContent: 'center',
      marginBottom: '62px',
      padding: 0,
    },
  })}
`;

const Content = styled.div`
  width: 420px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
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

const StyledInputAdornment = styled(InputAdornment)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    color: theme.palette.grey[300],
  },
}));

const PhoneNumberInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.brand.blue.primary,
    },
    [theme.breakpoints.down('md')]: {
      'color': theme.palette.grey[300],
      '& input': {
        '&::placeholder': {
          color: theme.palette.grey[300],
        },
      },
      '& placeholder': {
        color: theme.palette.grey[300],
      },
      '& fieldset': {
        borderColor: theme.palette.grey[300],
      },
      '&:hover fieldset': {
        borderColor: theme.palette.grey[300],
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey[200],
      },
    },
  },
}));

const ButtonBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ButtonBox = styled.div`
  width: 158px;
  margin-top: 42px;
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
