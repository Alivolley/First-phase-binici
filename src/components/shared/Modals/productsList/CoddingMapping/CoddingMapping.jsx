import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useGetMappingItems from 'api/coddingMapping/useGetMappingItems/useGetMappingItems';
import useUpdateCoddingMapping from 'api/coddingMapping/useUpdateCoddingMapping/useUpdateCoddingMapping';
import React, { useEffect, useState } from 'react';

import SpinnerLoader from '../../../SpinnerLoader/SpinnerLoader';
import TryAgain from '../../../TryAgain/TryAgain';
import DialogHead from '../../Head/Head';

export default function CoddingMappingModal({ open, onClose, guid, onUpdate }) {
  const {
    getData: getInformation,
    data,
    update: updateInfo,
    setData,
    loading: infoLoad,
    error: infoError,
  } = useUpdateCoddingMapping();

  const { data: mapping, getData: getMapping } = useGetMappingItems();

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (open && guid) {
      getInformation(guid);
    } else {
      setSelected(null);
    }
  }, [open, guid]);

  useEffect(() => {
    if (!!data?.mappingProfileGuid) {
      getMapping(data?.mappingProfileGuid, '');
    }
  }, [data?.mappingProfileGuid]);

  function handleSubmit() {
    updateInfo({ guid, mappingID: selected?.key }, () => onUpdate(selected));
  }

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
      <DialogHead onClose={onClose} label="ویرایش کدینگ" />
      <Box sx={{ p: 3, direction: 'rtl' }}>
        {infoError && !infoLoad ? (
          <TryAgain tryAgain={() => getInformation(guid)} />
        ) : null}

        {infoLoad ? <SpinnerLoader /> : null}

        {!infoLoad && !infoError ? (
          <>
            <Typography
              color="text.secondary"
              variant="body2"
              sx={{ mb: 3, display: 'block' }}
            >
              {data?.value}
            </Typography>

            <Autocomplete
              options={
                mapping ||
                mapping?.find(i => i?.key === data?.mappingProfileGuid)
              }
              autoHighlight
              value={selected || null}
              getOptionLabel={option => option.value}
              noOptionsText={
                <div className="w-full flex justify-center">موردی یافت نشد</div>
              }
              renderOption={(props, option) => (
                <div {...props}>{option.value}</div>
              )}
              onChange={(event, newValue) => {
                setSelected(prev => newValue);
              }}
              sx={{
                '.MuiInputBase-root': {
                  paddingRight: '9px !important',
                },
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  sx={{
                    '.MuiAutocomplete-endAdornment': {
                      right: 'unset !important',
                      left: '9px',
                    },
                    '.MuiAutocomplete-endAdornment button': {
                      mr: 0.5,
                    },
                  }}
                  label="مپینگ پروفایل"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                  className="gray-icon"
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ display: 'block', maxWidth: '120px', mr: 'auto', mt: 3 }}
              fullWidth
              disabled={infoLoad || !selected}
              size="large"
            >
              ثبت
            </Button>
          </>
        ) : null}
      </Box>
    </Dialog>
  );
}
