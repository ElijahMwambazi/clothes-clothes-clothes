import { takeLatest, all, call, put } from "redux-saga/effects"

import {
  getCurrentUser,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser
} from "../../utils/firebase/firebase.utils"

import { USER_ACTION_TYPES } from "./user.types"

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutFailed,
  signOutSucces
} from "./user.action"


export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(createUserDocFromAuth, userAuth, additionalDetails)

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))

  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)

    yield put(signUpSuccess(user, { displayName }))

  } catch (error) {
    yield put(signUpFailed(error))
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  try {
    yield call(getSnapshotFromUserAuth, user, additionalDetails)

  } catch (error) {
    yield put(signUpFailed(error))
  }
}

export function* signInWithEmailAndPassword({ payload: { email, password } }) {
  try {

    const user = yield call(signInAuthUserWithEmailAndPassword, email, password)

    yield call(getSnapshotFromUserAuth, user)

  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup)

    yield call(getSnapshotFromUserAuth, user)

  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser)

    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth)

    yield put(signInSuccess(userAuth))

  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signOut() {
  try {
    yield call(signOutUser)

    yield put(signOutSucces())

  } catch (error) {
    yield put(signOutFailed(error))
  }
}

// ! Entry Sagas
export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ])
}