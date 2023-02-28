import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import useProductCoddingListTableColumns from 'hooks/productDetail/useProductCoddingListTableColumns';
import React, { useCallback, useEffect, useState } from 'react';

import AccordionTable from '../../AccordionTable/AccordionTable';

const AccordionCodingList = ({ coddingList }) => {
  console.log(coddingList);

  const deleteItem = useCallback(
    row => () => {
      //   setDeleteChosenLocation(row);
      //   setIsDeleteModalOpen(true);
    },
    [],
  );

  const editItem = useCallback(
    row => () => {
      //   setEditChosenCarSeries(row);
      //   setIsEditModalOpen(true);
    },
    [],
  );

  const [columnsData] = useProductCoddingListTableColumns(deleteItem, editItem);

  return (
    <Wrapper>
      <Header>
        <Title>لیست کدینگ</Title>
        <AddButton variant="contained" size="small">
          <AddIcon />
        </AddButton>
      </Header>

      <AccordionTable columns={columnsData} rows={coddingList || []} />
    </Wrapper>
  );
};

export default AccordionCodingList;

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h4``;

const AddButton = styled(Button)`
  background-color: #27348b;
`;

const TableContainer = styled.div``;
