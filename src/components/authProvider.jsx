import { async } from "@firebase/util";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {
  auth,
  getUserInfo,
  registerNewUser,
  userExists,
} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          const userInfo = await getUserInfo(user.uid);

          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo);
          } else {
            onUserNotLoggedIn(userInfo);
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            diplayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          onUserNotRegistered(user);
        }
        console.log(user.displayName);
      } else {
        onUserNotLoggedIn();
      }
    });
    // --->
  }, [navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]);

  return <div> {children}</div>;
}
