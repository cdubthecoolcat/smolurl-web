import { Button, Fade } from '@material-ui/core';
import React, { FormEvent } from 'react';
import AliasInput from './AliasInput';
import { submitUrl } from './http';
import UrlInput from './UrlInput';

enum urlInputError {
  INVALID_Url,
  BLOCKED_DOMAIN,
  INVALID_INPUT
};

interface UrlFormProps {
  setNewUrlText: Function;
};

interface UrlState {
  text: string;
  hasError: boolean;
  errorMessage: string;
};

interface AliasState extends UrlState {
  visible: boolean;
};

function UrlForm(props: UrlFormProps) {
  const [url, setUrl] = React.useState<UrlState>({
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

  const updateUrl = (updated: any) => {
    setUrl({ ...url, ...updated });
  };

  const updateAlias = (updated: any) => {
    setAlias({ ...alias, ...updated });
  };

  const updateErrors = (data: any) => {
    if (data.error) {
      if (urlInputError[data.error.type] !== undefined) {
        updateUrl({
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
      updateUrl({
        hasError: false,
        errorMessage: ''
      });
      updateAlias({
        hasError: false,
        errorMessage: ''
      });
      props.setNewUrlText(data.short);
    }
  };

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitUrl({
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
          <UrlInput
            text={url.text}
            hasError={url.hasError}
            errorText={url.errorMessage}
            setUrl={updateUrl}
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

export default UrlForm;
