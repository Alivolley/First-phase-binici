import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import { GridActionsCellItem } from '@mui/x-data-grid';

const useProductListTableColumns = (
  goToInfoPage,
  goToGraphPage,
  deleteItem,
  editItem,
) => {
  const columnsData = [
    {
      field: 'image',
      headerName: 'تصویر',
      flex: 1,
      minWidth: 120,
      resizable: true,
      editable: false,
      renderCell: params => (
        <ColImage src={params.row.imageURL} alt={params.row.title} />
      ),
    },

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
          icon={<SsidChartIcon />}
          label="گراف"
          onClick={goToGraphPage(params.row)}
          showInMenu
        />,
        <GridActionsCellItem
          key={3}
          icon={<DeleteIcon />}
          label="حذف"
          onClick={deleteItem(params.row)}
          showInMenu
        />,
        <GridActionsCellItem
          key={4}
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

export default useProductListTableColumns;

const ColImage = styled.img`
  object-fit: fill;
  max-width: 60px;
  max-height: 90%;
`;
