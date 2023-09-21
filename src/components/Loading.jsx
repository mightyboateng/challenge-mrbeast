import React from 'react'
import BlueLogo from '../image/assets/blue-icon-logo.svg'
import { CircularProgress } from '@mui/material';

const LoadingComponent = () => {
  return (
    <div className="loading-component">
      <img src={BlueLogo} alt="is-loading" />
      <CircularProgress />
    </div>
  );
}

export default LoadingComponent
