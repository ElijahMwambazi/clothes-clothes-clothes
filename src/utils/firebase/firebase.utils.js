import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

// Apps firebase config details
const firebaseConfig = {
  apiKey: "AIzaSyBmb1rLhDZmLJ556ogXJVmiECsBGmitArA",
  authDomain: "clothes-clothes-clothes-db.firebaseapp.com",
  projectId: "clothes-clothes-clothes-db",
  storageBucket: "clothes-clothes-clothes-db.appspot.com",
  messagingSenderId: "254675331386",
  appId: "1:254675331386:web:791e2b8f218248115b8803"
};

// Initialize firebase app instance
initializeApp(firebaseConfig)

// Initialize google authentication provider and set custom provider parameters
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

// Create authentication instance
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// Create firestore database instance
export const db = getFirestore()

// Create user in database
export const createUserDocFromAuth = async (userAuth, additionalData = {}) => {
  if (!userAuth) return
  console.log(userAuth)
  const userDocRef = doc(db, "users", userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("Encountered error while creating user:", error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!password || !email) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

// Sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!password || !email) {
    alert("Email and password fields appear to be unfilled")
    return
  } else if (!email) {
    alert("Email field appears to be unfilled")
    return
  } else if (!password) {
    alert("Password field appears to be unfilled")
    return
  }

  return await signInWithEmailAndPassword(auth, email, password)
}