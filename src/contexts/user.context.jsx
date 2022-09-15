import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDocFromAuth } from "../utils/firebase/firebase.utils";

// Actual value to be accessed
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        try {
          await createUserDocFromAuth(user);
        } catch (error) {
          if (
            error.code === "auth/popup-closed-by-user" ||
            error.code === "auth/popup-blocked"
          )
            return;
          console.log("Encountered error while creating user:", error.message);
        }
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
