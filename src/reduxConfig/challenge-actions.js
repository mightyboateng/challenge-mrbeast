import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import {
  loadFirstChallengeList,
  updateFirstDoc,
  updateLastDoc,
} from "./slices/challengeSlice";
import { firestoreDb } from "../firebase/firebase-config";

export const LoadChallenges = async (dispatch) => {
  const challengeRef = collection(firestoreDb, "challenges");
  const queryChallenge = query(
    challengeRef,
    orderBy("publishedAt", "desc"),
    limit(5)
  );

  const queryResult = await getDocs(queryChallenge);

  dispatch(loadFirstChallengeList(queryResult.docs));

  dispatch(updateLastDoc(queryResult.docs[queryResult.docs.length - 1]));

  dispatch(updateFirstDoc(queryResult.docs[0]));

  console.log("Done");
};

export const getChallengeDetail = async (
  challengeList,
  challengeId
) => {
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
