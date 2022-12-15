import {
  takeLatest,
  all,
  call,
  put,
} from "typed-redux-saga/macro";

import { User } from "firebase/auth";
import {
  getCurrentUser,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  TAdditionalData,
} from "../../utils/firebase/firebase.utils";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  TEmailSignInStart,
  TSignUpStart,
  TSignUpSuccess,
} from "./user.action";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: TAdditionalData
) {
  try {
    const userSnapshot = yield* call(
      createUserDocFromAuth,
      userAuth,
      additionalDetails
    );

    if (userSnapshot) {
      yield* put(
        signInSuccess({
          id: userSnapshot.id,
          ...userSnapshot.data(),
        })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: TSignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;

      yield* put(
        signUpSuccess(user, { displayName })
      );
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: TSignUpSuccess) {
  try {
    yield* call(
      getSnapshotFromUserAuth,
      user,
      additionalDetails
    );
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInWithEmailAndPassword({
  payload: { email, password },
}: TEmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;

      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(
      signInWithGooglePopup
    );

    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);

    if (!userAuth) return;

    yield* call(
      getSnapshotFromUserAuth,
      userAuth
    );
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signOut() {
  try {
    yield* call(signOutUser);

    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

// ! Entry Sagas
export function* onSignUpStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.SIGN_UP_START,
    signUp
  );
}

export function* onSignUpSuccess() {
  yield* takeLatest(
    USER_ACTION_TYPES.SIGN_UP_SUCCESS,
    signInAfterSignUp
  );
}

export function* onCheckUserSession() {
  yield* takeLatest(
    USER_ACTION_TYPES.CHECK_USER_SESSION,
    isUserAuthenticated
  );
}

export function* onEmailSignInStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* onGoogleSignInStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
    signInWithGoogle
  );
}

export function* onSignOutStart() {
  yield* takeLatest(
    USER_ACTION_TYPES.SIGN_OUT_START,
    signOut
  );
}

export function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
