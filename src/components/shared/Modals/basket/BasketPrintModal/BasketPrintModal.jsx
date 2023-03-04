import styled from '@emotion/styled';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useBasketPrint from 'api/baskets/useBasketPrint/useBasketPrint';
import SpinnerLoader from 'components/shared/SpinnerLoader/SpinnerLoader';
import React, { useEffect } from 'react';

const BasketPrintModal = ({ open, handleClose, chosenPrintBasket }) => {
  const [getBasketItem, loading, basketItem] = useBasketPrint(
    chosenPrintBasket.id,
  );

  useEffect(() => {
    open && getBasketItem();
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} sx={{ direction: 'rtl' }}>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          <DialogTitle sx={{ textAlign: 'center' }}>
            {chosenPrintBasket.title}
          </DialogTitle>

          <DialogContent>
            <ImageQr src={basketItem.qrCode} alt={basketItem.display} />
          </DialogContent>

          <DialogActions sx={{ gap: 1, padding: 3 }}>
            <Button onClick={handleClose} variant="contained">
              انصراف
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => window.print()}
            >
              پرینت
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default BasketPrintModal;

const ImageQr = styled.img`
  width: 100%;
`;
