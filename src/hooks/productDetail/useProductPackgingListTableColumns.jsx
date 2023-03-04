import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PrintIcon from '@mui/icons-material/Print';
import { GridActionsCellItem } from '@mui/x-data-grid';

const useProductPackgingListTableColumns = (print, deleteItem, editItem) => {
  const columnsData = [
    {
      field: 'title',
      headerName: 'نام',
      flex: 1,
      minWidth: 120,
    },

    {
      field: 'count',
      headerName: 'تعداد',
      flex: 1,
      minWidth: 120,
    },

    {
      field: 'actions',
      headerName: 'عملیات',
      type: 'actions',
      flex: 1,
      minWidth: 100,

      getActions: params => [
        <GridActionsCellItem
          key={1}
          icon={<DeleteIcon />}
          label="حذف"
          onClick={deleteItem(params.row)}
          showInMenu
        />,

        <GridActionsCellItem
          key={2}
          icon={<ModeEditOutlineIcon />}
          label="ویرایش"
          onClick={editItem(params.row)}
          showInMenu
        />,

        <GridActionsCellItem
          key={3}
          icon={<PrintIcon />}
          label="پرینت"
          onClick={print(params.row)}
          showInMenu
        />,
      ],
    },
  ];

  return [columnsData];
};

export default useProductPackgingListTableColumns;
