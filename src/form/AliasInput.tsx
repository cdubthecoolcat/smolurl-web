import { Checkbox, Collapse, FormControlLabel, TextField } from '@material-ui/core';
import React from 'react';

interface AliasInputProps {
  text: string;
  hasError: boolean;
  visible: boolean;
  errorText: string;
  setAlias: Function;
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
            onChange={(e) => props.setAlias({ text: e.target.value })}
            style={{
              marginTop: '12px',
              marginBottom: '12px'
            }}
          />
        </Collapse>
      </div>
      <FormControlLabel
        control={<Checkbox value={props.visible} onChange={() => props.setAlias({ visible: !props.visible })} />}
        label="Use Custom Alias"
      />
    </>
  );
}

export default AliasInput;
