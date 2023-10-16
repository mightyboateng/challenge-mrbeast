import {
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { realtimeDb } from "../firebase/firebase-config";
import { CircularProgress } from "@mui/material";
import { onValue, ref as rTRef, remove, set } from "firebase/database";
import { query } from "firebase/firestore";
import { showNotificationBanner } from "../reduxConfig/slices/userSlice.js";

const VoteFunctionContainer = ({
  flexDirection,
  displayClass,
  challengeId,
  setTotalVotes,
}) => {
  const userDetail = useSelector((state) => state.user.userDetail);
  const dispatch = useDispatch();
  const [allUpVotes, setAllUpVotes] = useState([]);
  const [allDownVotes, setAllDownVotes] = useState([]);
  const [userVoteType, setUserVoteType] = useState("unvote");
  const [isLoadingVotes, setIsLoadingVotes] = useState(true);
  // const [] = useState(0);

  const voteUpAction = () => {
    if (userDetail) {
      set(rTRef(realtimeDb, `/votes/${challengeId}/yes/${userDetail?.uid}`), {
        voteCreator: userDetail?.uid,
        voteUsername: userDetail?.username,
      });
    } else {
      dispatch(showNotificationBanner("show-create-section"));
    }
  };

  const unVoteUpAction = () => {
    if (userDetail) {
      remove(rTRef(realtimeDb, `/votes/${challengeId}/yes/${userDetail?.uid}`));
    } else {
      dispatch(showNotificationBanner("show-create-section"));
    }
  };

  const updateToVoteUpAction = () => {
    if (userDetail) {
      remove(rTRef(realtimeDb, `/votes/${challengeId}/no/${userDetail?.uid}`));
      set(rTRef(realtimeDb, `/votes/${challengeId}/yes/${userDetail?.uid}/`), {
        voteCreator: userDetail?.uid,
        voteUsername: userDetail?.username,
      });
    } else {
      dispatch(showNotificationBanner("show-create-section"));
    }
  };

  const voteDownAction = () => {
    if (userDetail) {
      set(rTRef(realtimeDb, `/votes/${challengeId}/no/${userDetail?.uid}/`), {
        voteCreator: userDetail?.uid,
        voteUsername: userDetail?.username,
      });
    } else {
      dispatch(showNotificationBanner("show-create-section"));
    }
  };

  const unVoteDownAction = () => {
    if (userDetail) {
      remove(rTRef(realtimeDb, `/votes/${challengeId}/no/${userDetail?.uid}`));
    } else {
      dispatch(showNotificationBanner("show-create-section"));
    }
  };

  const updateToVoteDownAction = () => {
    if (userDetail) {
      remove(rTRef(realtimeDb, `/votes/${challengeId}/yes/${userDetail?.uid}`));
      set(rTRef(realtimeDb, `/votes/${challengeId}/no/${userDetail?.uid}/`), {
        voteCreator: userDetail?.uid,
        voteUsername: userDetail?.username,
      });
    } else {
      dispatch(showNotificationBanner("show-create-section"));
    }
  };

  useEffect(() => {
    const voteQuery = query(rTRef(realtimeDb, `/votes/${challengeId}/`));

    onValue(voteQuery, (snapshot) => {
      const newAllUpVotes = [];
      const newAllDownVotes = [];
      let newUserVoteType = "unvote";

      if (snapshot.val() !== null) {
        if (snapshot.val()["yes"] !== undefined) {
          Object.values(snapshot.val()["yes"]).forEach((voteUp) => {
            newAllUpVotes.push(voteUp);
            if (voteUp.voteCreator === userDetail?.uid) {
              newUserVoteType = "yes";
            }
          });
        }
        if (snapshot.val()["no"] !== undefined) {
          Object.values(snapshot.val()["no"]).forEach((voteDown) => {
            newAllDownVotes.push(voteDown);
            if (voteDown.voteCreator === userDetail?.uid) {
              newUserVoteType = "no";
            }
          });
        }
      }

      setAllUpVotes(newAllUpVotes);
      setAllDownVotes(newAllDownVotes);
      setUserVoteType(newUserVoteType);
      setTotalVotes(newAllDownVotes.length + newAllUpVotes.length);
      setIsLoadingVotes(false);
    });

    return () => {};
  }, [challengeId, setTotalVotes, userDetail?.uid]);

  return (
    <div
      className={`vote-container d-flex align-items-center justify-content-start ${flexDirection} ${displayClass}`}
    >
      {isLoadingVotes ? (
        <CircularProgress />
      ) : userVoteType === "unvote" ? (
        <span>
          <ThumbUpOutlined className={``} onClick={voteUpAction} />
          <span>{allUpVotes.length - allDownVotes.length}</span>
          <ThumbDownOutlined className={``} onClick={voteDownAction} />
        </span>
      ) : userVoteType === "no" ? (
        <span>
          <ThumbUpOutlined className={``} onClick={updateToVoteUpAction} />
          <span>{allUpVotes.length - allDownVotes.length}</span>
          <ThumbDown className={`vote-down`} onClick={unVoteDownAction} />
        </span>
      ) : userVoteType === "yes" ? (
        <span>
          <ThumbUp className={`vote-up`} onClick={unVoteUpAction} />
          <span>{allUpVotes.length - allDownVotes.length}</span>
          <ThumbDownOutlined className={``} onClick={updateToVoteDownAction} />
        </span>
      ) : (
        <span>
          <CircularProgress />
        </span>
      )}
    </div>
  );
};

export default VoteFunctionContainer;
