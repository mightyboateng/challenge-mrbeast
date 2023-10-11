import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
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
