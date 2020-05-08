import { Checkbox, Collapse, FormControlLabel, TextField } from '@material-ui/core';
import React from 'react';

interface AliasInputProps {
  text: string;
  setText: Function;
  hasError: boolean;
  setHasError: Function;
  visible: boolean;
  setVisible: Function;
  errorText: string;
}

function AliasInput(props: AliasInputProps) {
  return (
    <>
      <div>
        <Collapse
          in={props.visible}
          timeout={500}
          mountOnEnter
          unmountOnExit>
          <TextField
            error={props.hasError}
            label='Alias'
            variant='outlined'
            value={props.text}
            helperText={props.errorText}
            onChange={(e) => props.setText(e.target.value)}
            style={{
              marginTop: '12px',
              marginBottom: '12px'
            }}
          />
        </Collapse>
      </div>
      <FormControlLabel
        control={<Checkbox value={props.visible} onChange={() => props.setVisible(!props.visible)} />}
        label="Use Custom Alias"
      />
    </>
  );
}

export default AliasInput;
