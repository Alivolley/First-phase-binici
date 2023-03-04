import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useEffect, useState } from 'react';

import AccordionCodingList from '../AccordionCodingList/AccordionCodingList';
import AccordionPackaging from '../AccordionPackaging/AccordionPackaging';

const ProductAccordion = ({ detail, getProductDetail }) => {
  const { codding, display, coddingList, packagingList, guid } = detail;
  const [orderedCoddingList, setOrderedCoddingList] = useState();
  const [orderedPackegingList, setOrderedPackegingList] = useState();

  useEffect(() => {
    setOrderedCoddingList(
      coddingList.map(code => {
        const orderd = {
          codding: code.codding,
          title: code.display,
          id: code.guid,
          isReadOnly: code.isReadOnly,
          type: code.type,
        };
        return orderd;
      }),
    );

    setOrderedPackegingList(
      packagingList.map(code => {
        const orderd = {
          title: code.display,
          id: code.guid,
          count: code.count,
        };
        return orderd;
      }),
    );
  }, []);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <AccordionHeader>
          <Grid container spacing={{ xs: 2, sm: 12 }}>
            <Grid item xs={12} sm={6}>
              <HeaderItem>
                <HeaderDesc>نام</HeaderDesc>
                <Divider />
                <HeaderDesc>{display}</HeaderDesc>
              </HeaderItem>
            </Grid>
            <Grid item xs={12} sm={6}>
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
        <AccordionCodingList
          coddingList={orderedCoddingList}
          getProductDetail={getProductDetail}
        />
        <AccordionPackaging
          packagingList={orderedPackegingList}
          getProductDetail={getProductDetail}
          branchGuid={guid}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductAccordion;

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
