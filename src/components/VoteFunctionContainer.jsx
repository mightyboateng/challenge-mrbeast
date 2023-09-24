import {
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { realtimeDb} from "../firebase/firebase-config";
import { CircularProgress } from "@mui/material";
import {ref, set} from 'firebase/database'

const VoteFunctionContainer = ({
  flexDirection,
  displayClass,
  challengeId,
}) => {
  const userDetail = useSelector((state) => state.user.userDetail);
  const [allVotes, setAllVotes] = useState([]);
  const [voteContainerId, setVoteContainerId] = useState("");
  const [allUsersVotesList, setAllUsersVotesList] = useState([]);
  const [allUpVotes, setAllUpVotes] = useState([]);
  const [allDownVotes, setAllDownVotes] = useState([]);

  const [voteUpClass, setVoteUpClass] = useState("");
  const [unVoteUpClass, setUnVoteUpClass] = useState("");
  const [voteDownClass, setVoteDownClass] = useState("");
  const [unVoteDownClass, setUnVoteDownClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let voteCount = 0;

  // const queryVote = query()
  // onSnapshot(queryUser, (doc) => {
  //   setOtherUserDetail(
  //     doc.docs.map((userDet) => ({
  //       id: userDet.id,
  //       username: userDet.data().username,
  //       displayName: userDet.data().displayName,
  //       photoURL:userDet.data().photoURL
  //     }))
  //   );
  // });
  

  const voteUpAction = async () => {
  
    set(ref(realtimeDb, `/votes/${challengeId}/yes`), {
      vote: "Yes",
      voteCreator: userDetail.uid,
      voteUsername: userDetail.username,
    });
  };
  const unVoteUpAction = async () => {

  };

  const voteDownAction = async () => {

  };

  const unVoteDownAction = async() => {

  };

  useEffect(() => {


    return () => {

    };
  }, []);

  // console.log("User id", challengeId)
  

  // console.log("All down votes ", allDownVotes.find(({voteCreator}) => voteCreator === userDetail.username));

  // console.log("up ", allUpVotes);
  // console.log("down ", allDownVotes);
  // console.log("down ", voteContainerId);

  return (
    <div
      className={`vote-container d-flex align-items-center ${flexDirection} ${displayClass}`}
    >
      
      <ThumbUp className={`vote-up`} onClick={voteUpAction}/>
      <ThumbUpOutlined className={``} />
      <span>33</span>
      <ThumbDownOutlined className={``} onClick={voteDownAction} />
      <ThumbDown className={`vote-down`} />
    </div>
  );
};

export default VoteFunctionContainer;
