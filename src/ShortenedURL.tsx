import { Fade, Link, Typography } from '@material-ui/core';
import React from 'react';

interface ShortenedURLProps {
  text: string;
  visible: boolean;
};

function ShortenedURL(props: ShortenedURLProps) {
  return (
    <Fade
      in={props.visible}
      timeout={1000}>
      <Typography
        variant="h4"
        color="primary"
        style={{
          margin: '50px'
        }}>
        <Link
          underline="none"
          href={window.location + props.text}
          target="_blank"
          rel="noopener noreferrer">
          {window.location + props.text}
        </Link>
      </Typography>
    </Fade>
  );
}

export default ShortenedURL;
