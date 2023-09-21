import { ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import React from 'react'

const VoteFunctionContainer = ({flexDirection, displayClass}) => {
  return (
    <div className={`vote-container d-flex align-items-center ${flexDirection} ${displayClass}`}>
      <ThumbUp className="vote-up" />
      <ThumbUpOutlined />
      <span>100000k</span>
      <ThumbDown className="vote-down" />
      <ThumbDownOutlined />
    </div>
  );
}

export default VoteFunctionContainer
