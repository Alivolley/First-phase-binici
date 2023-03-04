import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import PrintIcon from '@mui/icons-material/Print';
import { GridActionsCellItem } from '@mui/x-data-grid';

const useTableBasketColumns = (printBasket, deleteItem, editItem) => {
  const columnsData = [
    {
      field: 'title',
      headerName: 'عنوان',
      flex: 1,
      minWidth: 120,
      resizable: true,
      editable: false,
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
          icon={<PrintIcon />}
          label="پرینت"
          onClick={printBasket(params.row)}
          showInMenu
        />,
        <GridActionsCellItem
          key={2}
          icon={<DeleteIcon />}
          label="حذف"
          onClick={deleteItem(params.row)}
          showInMenu
        />,
        <GridActionsCellItem
          key={3}
          icon={<ModeEditOutlineIcon />}
          label="ویرایش"
          onClick={editItem(params.row)}
          showInMenu
        />,
      ],
    },
  ];

  return [columnsData];
};

export default useTableBasketColumns;
