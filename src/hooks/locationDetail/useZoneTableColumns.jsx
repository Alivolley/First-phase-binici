import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { GridActionsCellItem } from '@mui/x-data-grid';

const useZoneTableColumns = (
  goToInfoPage,
  deleteItem,
  editItem,
  basketsItem,
) => {
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
          icon={<InfoIcon />}
          label="جزئیات"
          onClick={goToInfoPage(params.row)}
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
        <GridActionsCellItem
          key={4}
          icon={<ShoppingBasketIcon />}
          label="سبد ها"
          onClick={basketsItem(params.row)}
          showInMenu
        />,
      ],
    },
  ];

  return [columnsData];
};

export default useZoneTableColumns;
