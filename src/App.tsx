import React from 'react';
import URLForm from './form/URLForm';
import HomeAppBar from './HomeAppBar';
import ShortenedURL from './ShortenedURL';
import { Grid } from '@material-ui/core';

function App() {
  const [newURLText, setNewURLText] = React.useState<string>('');

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
        <ShortenedURL
          text={newURLText}
          visible={newURLText.length > 0}
        />
        <URLForm
          setNewURLText={setNewURLText}
        />
      </Grid>
    </div>
  );
}

export default App;
