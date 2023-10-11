import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import {
  loadFirstChallengeList,
  loadMoreChallengeList,
  updateFirstDoc,
  updateLastDoc,
} from "../slices/challengeSlice";
import { firestoreDb } from "../../firebase/firebase-config";


/////////////////////////////////
///// Load First challenges - Function
/////////////////////////
export const loadChallenges = async (dispatch) => {
  const challengeRef = collection(firestoreDb, "challenges");
  const queryChallenge = query(
    challengeRef,
    orderBy("publishedAt", "desc"),
    limit(1)
  );

  const queryResult = await getDocs(queryChallenge);

  dispatch(loadFirstChallengeList(queryResult.docs));

  dispatch(updateLastDoc(queryResult.docs[queryResult.docs.length - 1]));

  dispatch(updateFirstDoc(queryResult.docs[0]));

  console.log("Done");
};

/////////////////////////////////
///// Load New challenges - Function
/////////////////////////
export const loadMoreChallengeAction = async (dispatch, challengeLastDoc) => {
  const challengeRef = collection(firestoreDb, "challenges");
  const queryChallenge = query(
    challengeRef,
    orderBy("publishedAt", "desc"),
    startAfter(challengeLastDoc || 0),
    limit(1)
  );

  const queryResult = await getDocs(queryChallenge);

  dispatch(loadMoreChallengeList(queryResult.docs));

  dispatch(updateLastDoc(queryResult.docs[queryResult.docs.length - 1]));
};

/////////////////////////////////
///// Load challenge Details - Function
/////////////////////////
export const getChallengeDetail = async (challengeList, challengeId) => {
  if (challengeList.length === 0) {
    const docRef = doc(firestoreDb, "challenges", challengeId); // Replace with your collection name
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap;
    }
  } else {
    const result = challengeList.find(
      (challenge) => challenge.id === challengeId
    );
    return result;
  }
};

/////////////////////////////////
///// Load New challenges - Function
/////////////////////////
// const queryNewChallengeAction = async () => {
//   const challengeRef = collection(firestoreDb, "challenges");
//   const queryChallenge = query(
//     challengeRef,
//     orderBy("publishedAt", "desc"),
//     endBefore(challengeFirstDoc || 0),
//     limit(1)
//   );
//   const queryResult = await getDocs(queryChallenge);

//   dispatch(loadNewChallengeList(queryResult.docs));

//   dispatch(updateFirstDoc(queryResult.docs[0]));

// };
