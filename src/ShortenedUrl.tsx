import { Fade, Link, Typography } from '@material-ui/core';
import React from 'react';

interface ShortenedUrlProps {
  text: string;
  visible: boolean;
};

function ShortenedUrl(props: ShortenedUrlProps) {
  return (
    <Fade
      in={props.visible}
      timeout={1000}
      mountOnEnter
      unmountOnExit>
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

export default ShortenedUrl;
