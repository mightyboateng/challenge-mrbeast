import { Close, ThumbDown, ThumbUp } from '@mui/icons-material';
import React from 'react'

const BigNotificationContainer = () => {

  const handleCloseNotificationAction =()=>{
    
  }
  return (
    <div className="big-notification-container">
      <div className="notification-card">
        <div className="card-head">
          <Close onClick={handleCloseNotificationAction}/>
        </div>
        <div className="card-body">
          <h3>Login or Sign up </h3>
          <p className=''>
            Having a challenge in mind! Wanting to vote a challenge <ThumbDown /> or <ThumbUp />, login or sign up to submit the best
            ideas
          </p>
          <button>Login now</button>
          <button>Sign up now</button>
        </div>
      </div>
    </div>
  );
}

export default BigNotificationContainer
