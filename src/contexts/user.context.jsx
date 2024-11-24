// Import necessary functions from React
import { createContext, useState, useEffect } from "react";

// Import authentication utilities from Firebase
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// Create a UserContext with default values
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// Define the UserProvider component
export const UserProvider = ({ children }) => {
  // Initialize state to hold the current user
  const [currentUser, setCurrentUser] = useState(null);

  // Value to be passed to the context consumers
  const value = { currentUser, setCurrentUser };

  // Effect to run on component mount for authentication listener
  useEffect(() => {
    // Listen for auth state changes (login/logout)
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // If user exists, create/update their document in Firestore
        createUserDocumentFromAuth(user);
      }
      // Update the currentUser state with the authenticated user
      setCurrentUser(user);
    });

    // Cleanup function to unsubscribe from the listener on unmount
    return unsubscribe;
  }, []);

  // Provide the context value to child components
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
