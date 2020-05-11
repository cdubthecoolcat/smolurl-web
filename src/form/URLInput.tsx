import { TextField } from '@material-ui/core';
import React from 'react';

interface URLInputProps {
  text: string;
  hasError: boolean;
  errorText: string;
  setURL: Function
};

function URLInput(props: URLInputProps) {
  return (
    <TextField
      error={props.hasError}
      label='URL'
      variant='outlined'
      value={props.text}
      helperText={props.errorText}
      onChange={(e) => props.setURL({ text: e.target.value })}
    />
  );
}

export default URLInput;
