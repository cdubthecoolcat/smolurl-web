import React from 'react';
import UrlForm from './form/UrlForm';
import HomeAppBar from './HomeAppBar';
import ShortenedUrl from './ShortenedUrl';
import { Grid } from '@material-ui/core';

function App() {
  const [newUrlText, setNewUrlText] = React.useState<string>('');

  return (
    <div>
      <HomeAppBar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '75vh' }}>
        <ShortenedUrl
          text={newUrlText}
          visible={newUrlText.length > 0}
        />
        <UrlForm
          setNewUrlText={setNewUrlText}
        />
      </Grid>
    </div>
  );
}

export default App;
