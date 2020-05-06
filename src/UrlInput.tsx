import React, { FormEvent } from 'react';
import { TextField, Button, Fade, Grid, Typography, Link, Checkbox, FormControlLabel, Collapse } from '@material-ui/core';

interface ShortUrl {
  short: string;
  target: string;
};

function UrlInput() {
  const [urlText, setUrlText] = React.useState<string>('');
  const [shortText, setShortText] = React.useState<string>('');
  const [shortUrl, setShortUrl] = React.useState<string>('');
  const [showAlias, setShowAlias] = React.useState<boolean>(false);

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
      short: shortText,
      target: urlText
    }).then((data) => setShortUrl(data.short))
  }

  return (
    <Fade
      in={true}
      timeout={2000}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '75vh' }}>
        <form onSubmit={formSubmit}>
          <TextField
            label='Url'
            variant='outlined'
            value={urlText}
            onChange={(e) => setUrlText(e.target.value)}
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
          <div>
            <Collapse
              in={showAlias}
              timeout={500}
              mountOnEnter
              unmountOnExit>
              <TextField
                label='Short'
                variant='outlined'
                value={shortText}
                onChange={(e) => setShortText(e.target.value)}
                style={{
                  marginTop: '12px',
                  marginBottom: '12px'
                }}
              />
            </Collapse>
          </div>
          <FormControlLabel
            control={<Checkbox onChange={() => setShowAlias(!showAlias)} />}
            label="Use Custom Alias"
          />
        </form>
        {shortUrl.length > 0 ?
          <Typography
            variant="h6"
            color="primary">
            <Link
              underline="none"
              href={window.location + shortUrl}
              target="_blank"
              rel="noopener noreferrer">
              {window.location + shortUrl}
            </Link>
          </Typography> : null
        }
      </Grid>
    </Fade>
  );
}

export default UrlInput;
