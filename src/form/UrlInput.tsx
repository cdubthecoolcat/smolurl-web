import { TextField } from '@material-ui/core';
import React from 'react';

interface UrlInputProps {
  text: string;
  setText: Function;
  hasError: boolean;
  setHasError: Function;
  errorText: string;
};

function UrlInput(props: UrlInputProps) {
  return (
    <TextField
      error={props.hasError}
      label='Url'
      variant='outlined'
      value={props.text}
      helperText={props.errorText}
      onChange={(e) => props.setText(e.target.value)}
    />
  );
}

export default UrlInput;
