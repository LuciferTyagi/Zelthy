// src/components/TimeZone.jsx

import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { Autocomplete, TextField, Popper, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom Popper to adjust z-index and dark mode styling
const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: 1300,
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

const TimeZone = ({ handleTimezoneChange }) => {
  const { timezone } = useSelector((state) => state.user);
  const zones = useMemo(() => moment.tz.names(), []);

  return (
    <Autocomplete
      options={zones}
      value={timezone}
      onChange={(e, newValue) => {
        if (newValue) handleTimezoneChange(newValue);
      }}
      disableClearable
      PopperComponent={StyledPopper}
      PaperComponent={Paper}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          size="small"
          // label="Time Zone"
          InputProps={{
            ...params.InputProps,
            sx: {
              backgroundColor: 'background.paper',
              color: 'text.primary',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
      )}
      getOptionLabel={(opt) => opt.replace('_', ' ')}
      filterOptions={(opts, state) =>
        opts.filter((tz) =>
          tz.toLowerCase().includes(state.inputValue.toLowerCase())
        )
      }
      renderOption={(props, option) => (
        <li {...props} key={option} className="whitespace-nowrap">
          {option.replace('_', ' ')}
        </li>
      )}
      sx={{
        width: 240,
        '& .MuiInputLabel-root': {
          color: 'text.secondary',
        },
      }}
    />
  );
};

export default TimeZone;
