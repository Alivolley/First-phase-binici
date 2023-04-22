import { Box, Button, CircularProgress, Dialog } from '@mui/material';
import PackagePrintApi from 'api/productDetail/useGetPrintProductPackaging/useGetPrintProductPackaging';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

export default function PackagePrintModal({ guid, open, setOpen }) {
  const printElRef = useRef();
  const [getData, loading, data] = PackagePrintApi(guid);

  useEffect(() => {
    if (guid && open) {
      getData();
    }
  }, [guid, open]);

  return (
    <Dialog maxWidth="sm" fullWidth onClose={() => setOpen(false)} open={open}>
      <Box
        sx={{
          'display': 'flex',
          'flexDirection': 'column',
          'alignItems': 'center',
          'justifyContent': 'center',
          'padding': '16px',
          '& *': {
            textAlign: 'right',
          },
        }}
        dir="rtl"
      >
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '220px',
            }}
          >
            <CircularProgress />
          </Box>
        ) : null}
        {data && !loading ? (
          <Box
            ref={printElRef}
            sx={{
              background: 'white',
              color: 'black',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              padding: data.type == 0 ? '5px' : '5px 15px',
              display: 'flex',
              alignItems: 'center',
              minWidth: data.type == 0 ? '50mm' : '100mm',
              minHeight: data.type == 0 ? '40mm' : '80mm',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: 'auto',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 'auto',
                  gap: '0.5rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: 'column',
                    alignSelf: 'start',
                    paddingTop: '0.6rem',
                  }}
                >
                  <Box>{data.name}</Box>
                  <Box sx={{ marginBottom: '0.5rem' }}>{data.package}</Box>
                  <Box sx={{ textAlign: 'left', direction: 'rtl' }}>
                    {data.code1}
                  </Box>
                  <Box sx={{ textAlign: 'left', direction: 'rtl' }}>
                    {data.code2}
                  </Box>
                </Box>
                <Box
                  as="img"
                  src={data.qr}
                  sx={{
                    alignSelft: 'start',
                    height: data.type == 0 ? '21.7mm' : '34mm',
                    width: data.type == 0 ? '21.7mm' : '34mm',
                  }}
                />
              </Box>
            </Box>
          </Box>
        ) : null}
        {data ? (
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <ReactToPrint
              trigger={() => <Button variant="contained">پرینت</Button>}
              content={() => printElRef.current}
            />
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              color="warning"
            >
              بستن
            </Button>
          </Box>
        ) : null}
      </Box>
    </Dialog>
  );
}
