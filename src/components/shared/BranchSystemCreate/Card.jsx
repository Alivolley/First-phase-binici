import styled from '@emotion/styled';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { FormControl, InputLabel, Paper, Select, Switch } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const Card = ({ card, setData, ...props }) => {
  function handleEditSelected(e) {
    setData(prev => ({
      ...prev,
      value: prev.value.map(i => {
        if (i.guid === card.guid) {
          return { ...i, selectedValue: e.target.value };
        } else {
          return i;
        }
      }),
    }));
  }
  function changeShowInDisplay(e) {
    setData(prev => ({
      ...prev,
      value: prev.value.map(i => {
        if (i.guid === card.guid) {
          return { ...i, showInDisplay: e.target.checked };
        } else {
          return i;
        }
      }),
    }));
  }
  return (
    <CardContainer square>
      <OpenWithIcon fontSize="large" />
      <FormControl
        sx={{
          'maxWidth': '350px',
          '& *': {
            textAlign: 'right !important',
          },
        }}
        fullWidth
      >
        <InputLabel id="simple-guid-label">{card?.display}</InputLabel>
        <Select
          labelId="simple-guid-label"
          id="simple-guid-label-select"
          value={card.selectedValue}
          name={card.guid}
          label={card?.display}
          onChange={handleEditSelected}
        >
          {card.values?.map(v => (
            <MenuItem
              dense
              value={v.key}
              key={v.key}
              sx={{ textAlign: 'right' }}
              dir="rtl"
            >
              {v.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Switch
        color="primary"
        name="showInDisplay"
        id="showInDisplay"
        checked={!!card.showInDisplay}
        onChange={changeShowInDisplay}
        aria-labelledby="showInDisplay"
      />
    </CardContainer>
  );
};

const CardContainer = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  width: 100%;
  padding: 8px;
  background-color: rgb(245, 245, 245);
`;

export default Card;
