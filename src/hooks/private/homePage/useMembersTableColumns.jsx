import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import { GridActionsCellItem } from '@mui/x-data-grid';

export const useMembersTableColumns = (showDescriotion, showAdditionals) => {
  const columnsData = [
    { field: 'id', hide: true, headerName: 'ID', width: 90 },
    {
      field: 'userName',
      headerName: 'userName',
      width: 200,
      minWidth: 120,
      resizable: true,
      editable: false,
    },
    {
      field: 'joinDate',
      headerName: 'joinDate',
      width: 120,
      minWidth: 90,
      editable: false,
    },
    {
      field: 'isInitiator',
      headerName: 'isInitiator',
      width: 120,
      minWidth: 90,
      editable: false,
      type: 'boolean',
    },
    {
      field: 'actions',
      headerName: 'actions',
      type: 'actions',
      width: 80,
      minWidth: 100,
      getActions: params => [
        <GridActionsCellItem
          key={1}
          icon={<DescriptionIcon />}
          label="Description"
          onClick={showDescriotion(params.row)}
          showInMenu
        />,
        <GridActionsCellItem
          key={2}
          icon={<InfoIcon />}
          label="Additionals"
          onClick={showAdditionals(params.row)}
          showInMenu
        />,
      ],
    },
  ];

  return [columnsData];
};
