import { Button, Fade } from '@material-ui/core';
import React, { FormEvent } from 'react';
import AliasInput from './AliasInput';
import { submitURL } from './http';
import URLInput from './URLInput';

enum urlInputError {
  INVALID_URL,
  BLOCKED_DOMAIN,
  INVALID_INPUT
};

interface URLFormProps {
  setNewURLText: Function;
};

interface URLState {
  text: string;
  hasError: boolean;
  errorMessage: string;
};

interface AliasState extends URLState {
  visible: boolean;
};

function URLForm(props: URLFormProps) {
  const [url, setURL] = React.useState<URLState>({
    text: '',
    hasError: false,
    errorMessage: ''
  });

  const [alias, setAlias] = React.useState<AliasState>({
    text: '',
    hasError: false,
    errorMessage: '',
    visible: false
  });

  const updateURL = (updated: any) => {
    setURL({ ...url, ...updated });
  };

  const updateAlias = (updated: any) => {
    setAlias({ ...alias, ...updated });
  };

  const updateErrors = (data: any) => {
    if (data.error) {
      if (urlInputError[data.error.type] !== undefined) {
        updateURL({
          hasError: true,
          errorMessage: data.error.message
        });
      } else {
        updateAlias({
          hasError: true,
          errorMessage: data.error.message
        });
      }
    } else {
      updateURL({
        hasError: false,
        errorMessage: ''
      });
      updateAlias({
        hasError: false,
        errorMessage: ''
      });
      props.setNewURLText(data.short);
    }
  };

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitURL({
      short: alias.text,
      target: url.text
    }).then(updateErrors)
  }

  return (
    <Fade
      in={true}
      timeout={2000}>
      <form onSubmit={formSubmit}>
        <div>
          <URLInput
            text={url.text}
            hasError={url.hasError}
            errorText={url.errorMessage}
            setURL={updateURL}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            style={{
              marginLeft: '12px',
              marginRight: '12px',
              paddingTop: '16px',
              paddingBottom: '16px'
            }}>
            Shorten
          </Button>
        </div>
        <AliasInput
          text={alias.text}
          hasError={alias.hasError}
          visible={alias.visible}
          errorText={alias.errorMessage}
          setAlias={updateAlias}
        />
      </form>
    </Fade>
  );
}

export default URLForm;
