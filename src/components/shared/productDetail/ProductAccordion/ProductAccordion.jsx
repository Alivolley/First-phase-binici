import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React from 'react';

const productAccordion = ({ detail }) => {
  const { codding, display } = detail;
  console.log(detail);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <AccordionHeader>
          <Grid container spacing={{ xs: 2, sm: 12 }}>
            <Grid item sx={12} md={6}>
              <HeaderItem>
                <HeaderDesc>نام</HeaderDesc>
                <Divider />
                <HeaderDesc>{display}</HeaderDesc>
              </HeaderItem>
            </Grid>
            <Grid item sx={12} md={6}>
              <HeaderItem>
                <HeaderDesc>کدینگ</HeaderDesc>
                <Divider />
                <HeaderDesc>{codding}</HeaderDesc>
              </HeaderItem>
            </Grid>
          </Grid>
        </AccordionHeader>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default productAccordion;

const AccordionHeader = styled.div``;

const HeaderItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HeaderDesc = styled.p`
  color: #707070;
  font-size: 14px;
`;
