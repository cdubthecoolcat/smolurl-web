import { TextField } from '@material-ui/core';
import React from 'react';

interface UrlInputProps {
  text: string;
  hasError: boolean;
  errorText: string;
  setUrl: Function
};

function UrlInput(props: UrlInputProps) {
  return (
    <TextField
      error={props.hasError}
      label='Url'
      variant='outlined'
      value={props.text}
      helperText={props.errorText}
      onChange={(e) => props.setUrl({ text: e.target.value })}
    />
  );
}

export default UrlInput;
