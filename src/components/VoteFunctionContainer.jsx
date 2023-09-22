import {
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import {
  FieldValue,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase-config";
import { CircularProgress } from "@mui/material";

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
    const voteCheckerRef = collection(
      db,
      "challenges",
      challengeId,
      "votes",
      voteContainerId
    );
    await updateDoc(voteCheckerRef, {
      usersVotes: arrayUnion({
        voteCreator: userDetail.uid,
        voteUsername: userDetail.username,
        voteType: "Up",
      }),
    });
  };
  const unVoteUpAction = async () => {
    const voteCheckerRef = doc(
      db,
      "challenges",
      challengeId,
      "votes",
    );
    await updateDoc(voteCheckerRef, {
      usersVotes: arrayRemove({
        voteCreator: userDetail.uid,
        voteUsername: userDetail.username,
        voteType: "Up",
      }),
    });
  };

  const voteDownAction = async () => {
    const voteCheckerRef = doc(
      db,
      "challenges",
      challengeId,
      "votes",
      voteContainerId
    );
    await updateDoc(voteCheckerRef, {
      usersVotes: arrayUnion({
        voteCreator: userDetail.uid,
        voteUsername: userDetail.username,
        voteType: "Down",
      }),
    });
  };

  const unVoteDownAction = async() => {
        const voteCheckerRef = doc(
      db,
      "challenges",
      challengeId,
      "votes",
      voteContainerId
    );
    await updateDoc(voteCheckerRef, {
      usersVotes: arrayRemove({
        voteCreator: userDetail.uid,
        voteUsername: userDetail.username,
        voteType: "Up",
      }),
    });
  };

  useEffect(() => {
    // const parentUpRef = doc(db, "challenges", challengeId);
    // const votesUpRef = collection(parentUpRef, "votesUp");
    // const votesDownRef = collection(parentUpRef, "votesDown");

    // Function to listen to a subcollection and add its data to the combined list
    // function listenToSubCollection(subcollectionRef) {
    //   return onSnapshot(subcollectionRef, (querySnapshot) => {
    //     const newData = [];
    //     querySnapshot.forEach((doc) => {
    //       if (doc.exists()) {
    //         const subcollectionData = doc.data();
    //         newData.push(subcollectionData);
    //       }
    //     });
    //     setAllVotes((prevData) => [...prevData, ...newData]);
    //   });
    // }

    // Set up listeners for both subcollections
    // const unsubscribeVotesUp = listenToSubCollection(votesUpRef);
    // const unsubscribeVotesDown = listenToSubCollection(votesDownRef);

    // const loadUpVotes = async () => {
    //   const allUpVotesRef = collection(
    //     db,
    //     "challenges",
    //     challengeId,
    //     "votesUp"
    //   );

    //   const allUpVotesQuery = query(allUpVotesRef);
    //   const allUpVotesSnap = await getDocs(allUpVotesQuery);

    //   setAllUpVotes((oldList) => [
    //     ...oldList,
    //     allUpVotesSnap.docs.map((doc) => ({
    //       id: doc.id,
    //       voteCreator: doc.data().voteCreator,
    //       voteType: doc.data().voteType,
    //     })),
    //   ]);

    //   // if (allVotes.length !== 0) {
    //   //   allVotes.map((vote) => {
    //   //     if (vote.voteType === "Up") {
    //   //       setAllUpVotes((oldVal) => oldVal + 1);
    //   //     } else {
    //   //       setAllDownVotes((oldVal) => oldVal + 1);
    //   //     }
    //   //   });
    //   // }
    // };    // const loadUpVotes = async () => {
    //   const allUpVotesRef = collection(
    //     db,
    //     "challenges",
    //     challengeId,
    //     "votesUp"
    //   );

    //   const allUpVotesQuery = query(allUpVotesRef);
    //   const allUpVotesSnap = await getDocs(allUpVotesQuery);

    //   setAllUpVotes((oldList) => [
    //     ...oldList,
    //     allUpVotesSnap.docs.map((doc) => ({
    //       id: doc.id,
    //       voteCreator: doc.data().voteCreator,
    //       voteType: doc.data().voteType,
    //     })),
    //   ]);

    // setAllVotes([])
    // const loadDownVotes = async () => {
    //   const allDownVotesRef = collection(
    //     db,
    //     "challenges",
    //     challengeId,
    //     "votesDown"
    //   );

    //   const allDownVotesQuery = query(allDownVotesRef);
    //   onSnapshot(allDownVotesQuery, (querySnapshot) =>{
    //     // console.log("Data ", doc.docs)
    //     const newData = [];
    //     querySnapshot.forEach((doc) => {
    //       if (doc.exists()) {
    //         const subcollectionData = doc.data();
    //         newData.push(subcollectionData);
    //       }
    //     });
    //     setAllVotes((prevData) => [...prevData, ...newData]);
    //   });

    //   // setAllDownVotes();
    // };

    // const loadAllVotes = async () => {
    //   const allVotesRef = collection(db, "challenges", challengeId, "votes");

    //   const allVotesQuery = query(allVotesRef);
    //   const allVotesSnap = await getDocs(allVotesQuery);

    //   setAllVotes(
    //     allVotesSnap.docs.map((doc) => ({
    //       id: doc.id,
    //       voteCreator: doc.data().voteCreator,
    //       voteType: doc.data().voteType,
    //     }))
    //   );

    //   // if (allVotes.length !== 0) {
    //   //   allVotes.map((vote) => {
    //   //     if (vote.voteType === "Up") {
    //   //       setAllUpVotes((oldVal) => oldVal + 1);
    //   //     } else {
    //   //       setAllDownVotes((oldVal) => oldVal + 1);
    //   //     }
    //   //   });
    //   // }
    // };

    // setAllVotes(allDownVotes.concat(allUpVotes))

    // if (allVotes.length !== 0) {
    //   allVotes.map((vote) => {
    //     if (vote.voteType === "Up") {
    //       setAllUpVotes((oldVal) => oldVal + 1);
    //     } else {
    //       setAllDownVotes((oldVal) => oldVal + 1);
    //     }
    //   });
    // }
    // const docRef = collection(db, "challenges", challengeId, "votes");
    // onSnapshot(docRef, (doc) => {
    //   console.log("All Data ", doc.docs);
    // });

    // const loadAllUsersVotes = () => {
    //   const allUsersVotesRef = collection(
    //     db,
    //     "challenges",
    //     challengeId,
    //     "votes"
    //   );
    //   const allUsersVotesQuery = query(allUsersVotesRef);

    //   onSnapshot(allUsersVotesQuery, (querySnap) => {
    //     const allNewData = [];
    //     querySnap.forEach((doc) => {
    //       if (doc.exists()) {
    //         setVoteContainerId(doc.id);
    //         allNewData.push(doc.data().usersVotes);

    //         doc.data().usersVotes.map((vote) => {
    //           // return console.log("Votes ", vote);
    //           if (vote.voteType === "Up") {
    //             setAllUpVotes((preValue) => [...preValue, vote]);
    //           } else if (vote.voteType === "Down") {
    //             setAllDownVotes((preValue) => [...preValue, vote]);
    //           }
    //         });
    //       }
    //     });
    //     // querySnap.forEach((doc) => {
    //     //   if(doc.exists()) {
    //     //      setAllUsersVotesList(

    //     //      )
    //     //     // const subcollectionData = doc;
    //     //     //  allNewData.push(subcollectionData);
    //     //   }
    //     // })
    //     setAllUsersVotesList(allNewData);
    //   });
    // };

    // setAllVotes([])
    // const loadDownVotes = async () => {

    //   const allDownVotesQuery = query(allDownVotesRef);
    //   onSnapshot(allDownVotesQuery, (querySnapshot) =>{
    //     // console.log("Data ", doc.docs)
    //     const newData = [];
    //     querySnapshot.forEach((doc) => {
    //       if (doc.exists()) {
    //         const subcollectionData = doc.data();
    //         newData.push(subcollectionData);
    //       }
    //     });
    //     setAllVotes((prevData) => [...prevData, ...newData]);
    //   });

    

    return () => {
      // loadUpVotes();
      // loadDownVotes();
      // loadAllVotes();
      // unsubscribeVotesUp();
      // unsubscribeVotesDown();

      // loadAllUsersVotes();
    };
  }, []);

  

  // console.log("All down votes ", allDownVotes.find(({voteCreator}) => voteCreator === userDetail.username));

  // console.log("up ", allUpVotes);
  // console.log("down ", allDownVotes);
  // console.log("down ", voteContainerId);

  return (
    <div
      className={`vote-container d-flex align-items-center ${flexDirection} ${displayClass}`}
    >
      {/* {allVotes.length !== 0 ? (
        allVotes.map((vote) => {
          if (vote.voteType === "Up" && vote.voteCreator === userDetail.uid) {
            return (
              <span>
                <ThumbUp className={`vote-up`} />
                <span>{allVotes.length}</span>
                <ThumbDownOutlined className={``} onClick={voteDownAction} />
              </span>
            );
          } else if (
            vote.voteType === "Down" &&
            vote.voteCreator === userDetail.uid
          ) {
            return (
              <span>
                <ThumbUpOutlined className={``} />
                <span>{allVotes.length}</span>
                <ThumbDown className={`vote-down`} onClick={voteDownAction} />
              </span>
            );
          } else {
            <span>
              <ThumbUpOutlined className={``} />
              <span>{allVotes.length}</span>
              <ThumbDown className={`vote-down`} />
            </span>;
          }
        })
      ) : (
        <span>
          <ThumbUpOutlined className={``} />
          <span>{allVotes.length}</span>
          <ThumbDownOutlined className={``} onClick={voteDownAction} />
        </span>
      )} */}

      {/* <ThumbUp className={`vote-up`} />
      <ThumbUpOutlined className={``} />
      <span>{allVotes.length}</span>
      <ThumbDownOutlined className={``} onClick={voteDownAction} />
      <ThumbDown className={`vote-down`} /> */}

      {/* {allUsersVotesList.length !== 0 ? (
        allUsersVotesList.map((vote, index) => {
          if (
            vote[index].voteType === "Up" &&
            vote[index].voteCreator === userDetail?.uid
          ) {
            return (
              <span key={index}>
                <ThumbUp className={`vote-up`} onClick={unVoteUpAction} />
                <span>{allUpVotes.length - allDownVotes.length}</span>
                <ThumbDownOutlined className={``} onClick={voteDownAction} />
              </span>
            );
          } else if (
            vote[index].voteType === "Down" &&
            vote[index].voteCreator === userDetail?.uid
          ) {
            return (
              <span key={index}>
                <ThumbUpOutlined className={``} onClick={voteUpAction}/>
                <span>{allUpVotes.length - allDownVotes.length} -0</span>
                <ThumbDown className={`vote-down`} onClick={voteDownAction} />
              </span>
            );
          } else {
            return (
              <span key={index}>
                <ThumbUpOutlined className={``} onClick={voteUpAction} />
                <span>{allUpVotes.length - allDownVotes.length} - 3</span>
                <ThumbDownOutlined className={``} onClick={voteDownAction} />
              </span>
            );
          }
        })
      ) : (
        <span>
          <ThumbUpOutlined className={``} onClick={voteUpAction} />
          <span>{allUpVotes.length - allDownVotes.length}</span>
          <ThumbDownOutlined className={``} onClick={voteDownAction} />
        </span>
      )} */}
    </div>
  );
};

export default VoteFunctionContainer;
