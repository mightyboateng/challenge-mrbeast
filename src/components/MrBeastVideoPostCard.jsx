import React from "react";
import VoteFunctionContainer from "./VoteFunctionContainer";
import ThumbnailImage from "../image/assets/thumbnail.png";

const MrBeastVideoPostCard = () => {
  return (
    <div className="mrbeast-post-card">
      <div className="bg-primary-blue">
        <h3>1st</h3>
      </div>
      <div className="post-card-detail">
        <VoteFunctionContainer
          flexDirection="flex-column"
          displayClass="hide-lg-vote"
        />
        
        <div className="post-card-detail-body">
          <img className="thumbnail-img" src={ThumbnailImage} alt="user-img" />
          <div className="">
            <h4>
              Title of the video here Title of the video hereTitle of the video
              here Title of the video here Title of the video here
            </h4>
            {/* <div className="api-view-details">
              <span>
                <Visibility /> 3k views
              </span>
              <span>
                <DateRangeOutlined /> 3 Sep, 2023
              </span>
              <span>
                <Share /> Share
              </span>
            </div> */}
            <VoteFunctionContainer
              flexDirection="flex-row"
              displayClass="hide-sm-vote"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MrBeastVideoPostCard;
