import { Button, Fade } from '@material-ui/core';
import React, { FormEvent } from 'react';
import AliasInput from './AliasInput';
import UrlInput from './UrlInput';

interface ShortUrl {
  short: string;
  target: string;
};

enum urlInputError {
  'INVALID_URL',
  'BLOCKED_DOMAIN',
  'INVALID_INPUT'
}

interface UrlFormProps {
  setNewUrlText: Function;
}

function UrlForm(props: UrlFormProps) {
  const [urlText, setUrlText] = React.useState<string>('');
  const [urlHasError, setUrlHasError] = React.useState<boolean>(false);
  const [urlErrorText, setUrlErrorText] = React.useState<string>('');

  const [aliasText, setAliasText] = React.useState<string>('');
  const [aliasHasError, setAliasHasError] = React.useState<boolean>(false);
  const [aliasErrorText, setAliasErrorText] = React.useState<string>('');
  const [aliasVisible, setAliasVisible] = React.useState<boolean>(false);

  const submitUrl = async (url: ShortUrl) => {
    const response = await fetch('/api/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(url)
    });
    return await response.json();
  };

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitUrl({
      short: aliasText,
      target: urlText
    }).then((data) => {
      if (data.error) {
        if (urlInputError[data.error.type] !== undefined) {
          setUrlHasError(true);
          setUrlErrorText(data.error.message)
        } else {
          setAliasHasError(true);
          setAliasErrorText(data.error.message)
        }
      } else {
        setUrlHasError(false);
        setAliasHasError(false);
        setUrlErrorText('');
        setAliasErrorText('');
        props.setNewUrlText(data.short);
      }
    })
  }

  return (
    <Fade
      in={true}
      timeout={2000}>
      <form onSubmit={formSubmit}>
        <div>
          <UrlInput
            text={urlText}
            setText={setUrlText}
            hasError={urlHasError}
            setHasError={setUrlHasError}
            errorText={urlErrorText}
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
          text={aliasText}
          setText={setAliasText}
          hasError={aliasHasError}
          setHasError={setAliasHasError}
          visible={aliasVisible}
          setVisible={setAliasVisible}
          errorText={aliasErrorText}
        />
      </form>
    </Fade>
  );
}

export default UrlForm;
