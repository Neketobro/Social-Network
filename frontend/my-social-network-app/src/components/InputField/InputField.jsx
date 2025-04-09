import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';

export const InputField = forwardRef(({ label, error, required, type = 'text', onChange, ...props }, ref) => (
  <TextField
    label={label}
    variant="outlined"
    inputRef={ref}
    error={error}
    onChange={onChange}
    fullWidth
    required={required}
    type={type}
    {...props}
  />
));
