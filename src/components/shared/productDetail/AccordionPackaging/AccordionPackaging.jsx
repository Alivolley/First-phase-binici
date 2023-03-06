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
import useProductPackagingDelete from 'api/productDetail/useProductPackagingDelete/useProductPackagingDelete';
import DeleteModal from 'components/shared/DeleteModal/DeleteModal';
import useProductPackgingListTableColumns from 'hooks/productDetail/useProductPackgingListTableColumns';
import React, { useCallback, useEffect, useState } from 'react';

import AccordionTable from '../../AccordionTable/AccordionTable';
import ProductPackagingEditModal from '../../Modals/productsList/ProductPackagingEditModal/ProductPackagingEditModal';
import ProductPackagingInsertModal from '../../Modals/productsList/ProductPackagingInsertModal/ProductPackagingInsertModal';
import ProductPackagingPrintModal from '../../Modals/productsList/ProductPackagingPrintModal/ProductPackagingPrintModal';

const AccordionPackaging = ({
  packagingList,
  getProductDetail,
  branchGuid,
}) => {
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteChosenLocation, setDeleteChosenLocation] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editChosenProduct, setEditChosenProduct] = useState({});
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [chosenPrintProduct, setChosenPrintProduct] = useState({});

  const [deleteRequest] = useProductPackagingDelete();

  const print = useCallback(
    row => () => {
      setChosenPrintProduct(row);
      setIsPrintModalOpen(true);
    },
    [],
  );

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
        <Title>لیست پکیج ها</Title>
        <AddButton
          variant="contained"
          size="small"
          onClick={() => setIsInsertModalOpen(true)}
        >
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
              <TableCell align="right">تعداد</TableCell>
              <TableCell align="center" width={300}>
                عملیات ها
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {packagingList?.map((packItem, index) => (
              <TableRow key={index}>
                <TableCell align="right">{packItem.title}</TableCell>
                <TableCell align="right">{packItem.count}</TableCell>
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={print(packItem)}
                    >
                      پرینت
                    </Button>
                  </ActionContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProductPackagingInsertModal
        open={isInsertModalOpen}
        handleClose={() => setIsInsertModalOpen(false)}
        getProductDetail={getProductDetail}
        branchGuid={branchGuid}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        title={deleteChosenLocation.title}
        locationId={deleteChosenLocation.id}
        deleteLoading={deleteLoading}
        onDelete={deleteHandle}
      />

      <ProductPackagingEditModal
        open={isEditModalOpen}
        handleClose={() => setIsEditModalOpen(false)}
        chosenProduct={editChosenProduct}
        getProductDetail={getProductDetail}
      />

      <ProductPackagingPrintModal
        open={isPrintModalOpen}
        handleClose={() => setIsPrintModalOpen(false)}
        chosenPrintProduct={chosenPrintProduct}
      />
    </Wrapper>
  );
};

export default AccordionPackaging;

const Wrapper = styled.div`
  margin-top: 50px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ActionContainer = styled(Header)`
  flex-wrap: wrap;
  gap: 10px;
`;

const Title = styled.h4``;

const AddButton = styled(Button)`
  background-color: #27348b;
`;

const TableContainer = styled.div``;
