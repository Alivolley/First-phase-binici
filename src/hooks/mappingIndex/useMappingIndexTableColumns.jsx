import styled from '@emotion/styled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const useMappingIndexTableColumns = () => {
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
      field: 'code',
      headerName: 'کد',
      flex: 1,
      minWidth: 120,
      resizable: true,
      editable: false,
    },

    {
      field: 'mapped',
      headerName: 'مپ شده',
      flex: 1,
      minWidth: 120,
      resizable: true,
      editable: false,

      renderCell: params => (params.row.mapped ? <DoneIcon /> : <UnDoneIcon />),
    },
  ];

  return [columnsData];
};

export default useMappingIndexTableColumns;

const DoneIcon = styled(CheckIcon)`
  color: green;
  font-size: 35px;
`;

const UnDoneIcon = styled(CloseIcon)`
  color: red;
  font-size: 35px;
`;
