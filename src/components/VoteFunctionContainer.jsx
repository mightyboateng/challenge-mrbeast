import {
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { realtimeDb } from "../firebase/firebase-config";
import { CircularProgress } from "@mui/material";
import { onValue, ref as rTRef, remove, set } from "firebase/database";
import { query } from "firebase/firestore";

const VoteFunctionContainer = ({
  flexDirection,
  displayClass,
  challengeId,
}) => {
  const userDetail = useSelector((state) => state.user.userDetail);
  const [allUpVotes, setAllUpVotes] = useState([]);
  const [allDownVotes, setAllDownVotes] = useState([]);
  const [userVoteType, setUserVoteType] = useState("unvote");
  const [isLoadingVotes, setIsLoadingVotes] = useState(true);


  // ----- Vote up action -----
  const voteUpAction = async () => {
    set(rTRef(realtimeDb, `/votes/${challengeId}/yes/${userDetail?.uid}/`), {
      voteCreator: userDetail?.uid,
      voteUsername: userDetail?.username,
    });
  };
  const unVoteUpAction = async () => {
    remove(rTRef(realtimeDb, `/votes/${challengeId}/yes/${userDetail?.uid}/`));
  };
  const updateToVoteUpAction = async () => {
    remove(rTRef(realtimeDb, `/votes/${challengeId}/no/${userDetail?.uid}/`));
    set(rTRef(realtimeDb, `/votes/${challengeId}/yes/${userDetail?.uid}/`), {
      voteCreator: userDetail?.uid,
      voteUsername: userDetail?.username,
    });
  };

  // ----- Vote Down Action -----
  const voteDownAction = async () => {
    set(rTRef(realtimeDb, `/votes/${challengeId}/no/${userDetail?.uid}/`), {
      voteCreator: userDetail?.uid,
      voteUsername: userDetail?.username,
    });
  };
  const unVoteDownAction = async () => {
    remove(rTRef(realtimeDb, `/votes/${challengeId}/no/${userDetail?.uid}/`));
  };
  const updateToVoteDownAction = async () => {
    remove(rTRef(realtimeDb, `/votes/${challengeId}/yes/${userDetail?.uid}/`));
    set(rTRef(realtimeDb, `/votes/${challengeId}/no/${userDetail?.uid}/`), {
      voteCreator: userDetail?.uid,
      voteUsername: userDetail?.username,
    });
  };

  useEffect(() => {
    const voteUpQuery = query(rTRef(realtimeDb, `/votes/${challengeId}/yes`));

    const voteDownQuery = query(rTRef(realtimeDb, `/votes/${challengeId}/no`));

    onValue(voteUpQuery, (snapshot) => {
      setAllUpVotes([]);
      if (snapshot.val() !== null) {
        Object.values(snapshot.val()).map((voteUp) => {
          setAllUpVotes((oldValue) => [...oldValue, voteUp]);
          if (voteUp.voteCreator === userDetail?.uid) {
            setUserVoteType("yes");
          }
        });
      } else {
        setUserVoteType("unvote");
      }
    });
    onValue(voteDownQuery, (snapshot) => {
      setAllDownVotes([]);
      if (snapshot.val() !== null) {
        Object.values(snapshot.val()).map((voteDown) => {
          setAllDownVotes((oldValue) => [...oldValue, voteDown]);
          if (voteDown.voteCreator === userDetail?.uid) {
            setUserVoteType("no");
          }
        });
      }

      setIsLoadingVotes(false);
    });

    return () => {};
  }, [allUpVotes, allDownVotes, userVoteType, challengeId, userDetail?.uid]);

  return (
    <div
      className={`vote-container d-flex align-items-center ${flexDirection} ${displayClass}`}
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
