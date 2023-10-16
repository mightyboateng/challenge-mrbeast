import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase/firebase-config";
import { updateOtherProfileDetail } from "../slices/userSlice";
import {
  loadFirstProfileChallengeList,
  loadMoreProfileChallengeList,
  updateProfileLastDoc,
} from "../slices/challengeSlice";

export const getUserDetails = async (
  profileId,
  userProfileDetail,
  dispatch
) => {
  if (userProfileDetail?.username === profileId) {
  } else {
    const userRef = collection(firestoreDb, "users");
    const queryUser = query(userRef, where("username", "==", profileId));

    const result = await getDocs(queryUser);
    if (result.docs.length !== 0) {
      dispatch(updateOtherProfileDetail(result.docs[0]?.data()));
    }
  }
};

export const loadUserChallenge = async (profileId, dispatch) => {
  const challengeRef = collection(firestoreDb, "challenges");

  const queryChallenge = query(
    challengeRef,
    where("creatorUsername", "==", profileId),
    orderBy("publishedAt", "desc"),
    limit(3)
  );

  const queryResult = await getDocs(queryChallenge);

  dispatch(loadFirstProfileChallengeList(queryResult.docs));

  dispatch(updateProfileLastDoc(queryResult.docs[queryResult.docs.length - 1]));
};

export const loadMoreUserChallenge = async (
  profileId,
  dispatch,
  profileChallengeLastDoc
) => {
  const challengeRef = collection(firestoreDb, "challenges");
  const queryChallenge = query(
    challengeRef,
    where("creatorUsername", "==", profileId),
    orderBy("publishedAt", "desc"),
    startAfter(profileChallengeLastDoc || 0),
    limit(2)
  );
  const queryResult = await getDocs(queryChallenge);

  dispatch(loadMoreProfileChallengeList(queryResult.docs));

  dispatch(updateProfileLastDoc(queryResult.docs[queryResult.docs.length - 1]));
};
