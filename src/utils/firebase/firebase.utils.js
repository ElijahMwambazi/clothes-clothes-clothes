import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
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
const firebaseApp = initializeApp(firebaseConfig)

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

export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid)

    const userSnapShot = await getDoc(userDocRef)

    // Check if user is in database
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log("error creating the user:", error.message)
        }
    }

    return userDocRef
}