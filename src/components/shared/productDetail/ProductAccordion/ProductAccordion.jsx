import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import AccordionCodingList from '../AccordionCodingList/AccordionCodingList';
import AccordionPackaging from '../AccordionPackaging/AccordionPackaging';

const ProductAccordion = ({
  detail,
  getProductDetail,
  expanded,
  setExpand,
  keyIndex = 0,
  setBranchGallery,
  setSystemEdit,
}) => {
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

  const expand = expanded === guid;

  return (
    <Paper
      square
      elevation={1}
      sx={{
        p: 2,
        pb: expand ? 5 : 2,
        m: expand ? (keyIndex === 0 ? '0 0 20px 0' : '20px 0') : '0',
        transition: '.25s',
        borderTop: '1px solid rgba(100,100,100,.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: '15px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { xs: 'auto', lg: '455px' },
          }}
        >
          <Box sx={{ width: '70px' }}>
            <IconButton onClick={setExpand}>
              <ExpandMoreIcon
                style={{ transform: expand ? 'rotateZ(0)' : 'rotateZ(180deg)' }}
              />
            </IconButton>
          </Box>
          <Typography>{display}</Typography>
        </Box>
        <Typography>{codding}</Typography>

        <Box sx={{ m: 'auto' }}>
          <Button
            variant="contained"
            color="warning"
            onClick={setBranchGallery}
          >
            گالری
          </Button>
        </Box>
      </Box>
      <Collapse in={expand} timeout="auto" unmountOnExit>
        <div>
          <CollapseInnerContainer>
            <AccordionCodingList
              coddingList={orderedCoddingList}
              getProductDetail={getProductDetail}
              setSystemEdit={setSystemEdit}
            />
          </CollapseInnerContainer>
          <CollapseInnerContainer>
            <AccordionPackaging
              packagingList={orderedPackegingList}
              getProductDetail={getProductDetail}
              branchGuid={guid}
            />
          </CollapseInnerContainer>
        </div>
      </Collapse>
    </Paper>
  );
};

export default ProductAccordion;

const CollapseInnerContainer = styled.div`
  margin-bottom: 15px;
  width: 100%;
  overflow-x: scroll;
`;

const HeaderDesc = styled.p`
  color: #707070;
  font-size: 14px;
`;
