import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import useProductCoddingDelete from 'api/productDetail/useProductCoddingDelete/useProductCoddingDelete';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import useProductCoddingListTableColumns from 'hooks/productDetail/useProductCoddingListTableColumns';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import AccordionTable from '../../AccordionTable/AccordionTable';
import ProductCoddingEditModal from '../../Modals/productsList/ProductCoddingEditModal/ProductCoddingEditModal';

const AccordionCodingList = ({ coddingList, getProductDetail }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenProduct, setEditChosenProduct] = useState({});

  const [deleteRequest] = useProductCoddingDelete();

  const deleteItem = useCallback(
    row => () => {
      setDeleteChosenLocation(row);
      setIsDeleteModalOpen(true);
    },
    [],
  );

  const editItem = useCallback(
    row => () => {
      setEditChosenProduct(row);
      setIsEditModalOpen(true);
    },
    [],
  );

  const deleteHandle = id => {
    setDeleteLoading(true);
    deleteRequest(id, getProductDetail, setIsDeleteModalOpen, setDeleteLoading);
  };

  return (
    <Wrapper>
      <Header>
        <Title>لیست کدینگ</Title>
        <AddButton variant="contained" size="small">
          <AddIcon />
        </AddButton>
      </Header>

      <TableContainer>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow
              sx={{
                '& .MuiTableCell-root': {
                  borderColor: 'rgba(100, 100, 100, .2)',
                },
              }}
            >
              <TableCell align="right">نام</TableCell>
              <TableCell align="right">کدینگ</TableCell>
              <TableCell align="center" width={300}>
                عملیات ها
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {coddingList?.map((packItem, index) => (
              <TableRow key={index}>
                <TableCell align="right">{packItem.title}</TableCell>
                <TableCell align="right">{packItem.codding}</TableCell>
                <TableCell align="right" width={140}>
                  <ActionContainer>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={deleteItem(packItem)}
                    >
                      حذف
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={editItem(packItem)}
                    >
                      ویرایش
                    </Button>
                  </ActionContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <ProductCoddingEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenProduct={editChosenProduct}
        getProductDetail={getProductDetail}
      />
    </Wrapper>
  );
};

export default AccordionCodingList;

const Wrapper = styled.div`
  margin-top: 50px;
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

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;
