// Import FirebaseAuth and firebase.
import React, { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { StyledFirebaseAuth } from "components/Auth/StyledFirebaseAuth";
import { authAtom } from "state/Auth";
import { useAtom } from "jotai";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyDwVdM-SkH4FrC8IJrDmf2thTMgRvSvmuc",
  authDomain: "drawing-app-c0e7c.firebaseapp.com",
  projectId: "drawing-app-c0e7c",
  storageBucket: "drawing-app-c0e7c.appspot.com",
  messagingSenderId: "734319787778",
  appId: "1:734319787778:web:4afeadb07437b651f3cc1b",
  measurementId: "G-HFGM24SE6J",
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export function SignInScreen() {
  const [user, setUser] = useAtom(authAtom);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setUser(user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!user) {
    return (
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    );
  }
  return (
    <div>
      <p>
        Welcome {firebase.auth().currentUser?.displayName}! You are now
        signed-in!
      </p>
      <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
    </div>
  );
}
