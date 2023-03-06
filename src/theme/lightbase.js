import { blue, orange } from '@mui/material/colors';
import { faIR } from '@mui/material/locale';
import { alpha, createTheme } from '@mui/material/styles';

export const emotionLightTheme = {
  colors: {
    brand: {
      grey: {
        primary: '#434343',
        secondary: '#505050',
        ternary: '#9EADB4',
        quaternary: '#D3D8DB',
      },
      orange: {
        primary: '#EC6608',
        secondary: '#F36F21',
        hover: '#db610b',
      },
      blue: {
        primary: '#27348B',
        secondary: '#268AD6',
        ternary: '#0B7AD1',
        quaternary: '#004274',
        hover: '#1d2978',
      },
    },
    layout: {
      main: '#fff',
      reverse: '#000000',
      disabled: '#E4E4E4',
    },
  },
};

export const MUILightTheme = createTheme({
  direction: 'rtl',
  palette: {
    brand: {
      grey: { ...emotionLightTheme.colors.brand.grey },
      orange: { ...emotionLightTheme.colors.brand.orange },
      blue: { ...emotionLightTheme.colors.brand.blue },
    },
    layout: { ...emotionLightTheme.colors.layout },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: emotionLightTheme.colors.layout.disabled,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderRadius: `8px`,
          },
        },
      },
      variants: [
        {
          props: { variant: 'outlinedBlueBrand' },
          style: {
            '&:focus': {
              borderColor: emotionLightTheme.colors.brand.blue.primary,
            },
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
      variants: [
        {
          props: { variant: 'containedBlueBrand' },
          style: {
            'backgroundColor': emotionLightTheme.colors.brand.blue.primary,
            'color': emotionLightTheme.colors.brand.orange.primary,
            '&:hover': {
              backgroundColor: emotionLightTheme.colors.brand.blue.hover,
            },
            '.MuiTouchRipple-child': {
              color: blue[700],
            },
            '&.MuiLoadingButton-loading': {
              backgroundColor: alpha(
                emotionLightTheme.colors.brand.blue.primary,
                0.4,
              ),
            },
            '.MuiLoadingButton-loadingIndicator': {
              color: emotionLightTheme.colors.brand.orange.primary,
            },
          },
        },
        {
          props: { variant: 'containedBlueBrand', size: 'large' },
          style: {
            'backgroundColor': emotionLightTheme.colors.brand.blue.primary,
            'color': emotionLightTheme.colors.brand.orange.primary,
            '&:hover': {
              backgroundColor: emotionLightTheme.colors.brand.blue.hover,
            },
            '.MuiTouchRipple-child': {
              color: blue[700],
            },
            '&.MuiLoadingButton-loading': {
              backgroundColor: alpha(
                emotionLightTheme.colors.brand.blue.primary,
                0.4,
              ),
            },
            '.MuiLoadingButton-loadingIndicator': {
              color: emotionLightTheme.colors.brand.orange.primary,
            },
            'fontSize': '1.015rem',
            'fontWeight': 'bold',
          },
        },
        {
          props: { variant: 'containedOrangeBrand' },
          style: {
            'backgroundColor': emotionLightTheme.colors.brand.orange.primary,
            'color': emotionLightTheme.colors.layout.main,
            '&:hover': {
              backgroundColor: emotionLightTheme.colors.brand.orange.hover,
            },
            '.MuiTouchRipple-child': {
              color: orange[700],
            },
            '&.MuiLoadingButton-loading': {
              backgroundColor: alpha(
                emotionLightTheme.colors.brand.orange.primary,
                0.4,
              ),
            },
            '.MuiLoadingButton-loadingIndicator': {
              color: emotionLightTheme.colors.brand.blue.primary,
            },
          },
        },
        {
          props: { variant: 'containedOrangeBrand', size: 'large' },
          style: {
            'backgroundColor': emotionLightTheme.colors.brand.orange.primary,
            'color': emotionLightTheme.colors.layout.main,
            '&:hover': {
              backgroundColor: emotionLightTheme.colors.brand.orange.hover,
            },
            '.MuiTouchRipple-child': {
              color: orange[700],
            },
            '&.MuiLoadingButton-loading': {
              backgroundColor: alpha(
                emotionLightTheme.colors.brand.orange.primary,
                0.4,
              ),
            },
            '.MuiLoadingButton-loadingIndicator': {
              color: emotionLightTheme.colors.brand.blue.primary,
            },
            'fontSize': '1.015rem',
            'fontWeight': 'bold',
          },
        },
      ],
    },
  },
  typography: {
    fontFamily: '"Yekan-Medium", "Roboto", "Helvetica", "Arial", sans-serif',
  },

  MuiDataGrid: {
    styleOverrides: {
      root: {
        'border': 'none',
        '& .MuiDataGrid-columnHeaders': {
          borderBottomColor: 'rgba(100,100,100,.2) !important',
          direction: 'rtl',
        },
        '& .MuiDataGrid-iconSeparator': {
          fill: 'rgba(100,100,100,.2) !important',
        },
        '& .MuiDataGrid-cell': {
          borderBottomColor: 'rgba(100,100,100,.2) !important',
        },
        '& .MuiDataGrid-columnHeaderRow': {
          border: 'none',
        },
      },
    },
  },

  faIR,
});
