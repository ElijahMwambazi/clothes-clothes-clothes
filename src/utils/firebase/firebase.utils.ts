import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  NextOrObserver,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { TCategory } from "../../store/categories/categories.types";

// Apps firebase config details
const firebaseConfig = {
  apiKey:
    "AIzaSyBmb1rLhDZmLJ556ogXJVmiECsBGmitArA",
  authDomain:
    "clothes-clothes-clothes-db.firebaseapp.com",
  projectId: "clothes-clothes-clothes-db",
  storageBucket:
    "clothes-clothes-clothes-db.appspot.com",
  messagingSenderId: "254675331386",
  appId:
    "1:254675331386:web:791e2b8f218248115b8803",
};

// TODO: Initialize firebase app instance
initializeApp(firebaseConfig);

// TODO: Initialize google authentication provider and set custom provider parameters
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// TODO: Create authentication instance
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, provider);

// TODO: Create firestore database instance
export const db = getFirestore();

// TODO: Write to Firestore
export type TObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <
  T extends TObjectToAdd
>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(
    db,
    collectionKey
  );
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(
      collectionRef,
      object.title.toLowerCase()
    );
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Data added to Firestore database");
};

// TODO: Read from Firestore
export const getCategoriesAndDocuments =
  async (): Promise<TCategory[]> => {
    const categoriesCollectionRef = collection(
      db,
      "categories"
    );
    const q = query(categoriesCollectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (docSnapshot) =>
        docSnapshot.data() as TCategory
    );
  };

// TODO: Create user in database
export type TAdditionalData = {
  displayName?: string;
};

export type TUser = {
  createdAt: Date;
  displayName: string;
  email: string;
  photoURL?: string;
};

export const createUserDocFromAuth = async (
  userAuth: User,
  additionalData = {} as TAdditionalData
): Promise<QueryDocumentSnapshot<TUser> | void> => {
  if (!userAuth) return;

  const userDocRef = doc(
    db,
    "users",
    userAuth.uid
  );

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } =
      userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(
        "Encountered error while creating user:",
        error
      );
    }
  }

  return userSnapshot as QueryDocumentSnapshot<TUser>;
};

export const createAuthUserWithEmailAndPassword =
  async (
    email: string,
    password: string
  ): Promise<void | UserCredential> => {
    if (!password || !email) return;

    return await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

// TODO: Sign in with email and password
export const signInAuthUserWithEmailAndPassword =
  async (
    email: string,
    password: string
  ): Promise<void | UserCredential> => {
    if (!password || !email) {
      alert(
        "Email and password fields appear to be unfilled"
      );
      return;
    } else if (!email) {
      alert("Email field appears to be unfilled");
      return;
    } else if (!password) {
      alert(
        "Password field appears to be unfilled"
      );
      return;
    }

    return await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

// TODO: Sign out user
export const signOutUser = async () =>
  await signOut(auth);

// TODO: Listen authentication state change
export const onAuthStateChangedListener = (
  callback: NextOrObserver<User>
) => onAuthStateChanged(auth, callback);

export const getCurrentUser =
  (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
      const unsubcrube = onAuthStateChanged(
        auth,
        (userAuth) => {
          unsubcrube();
          resolve(userAuth);
        },
        reject
      );
    });
  };
