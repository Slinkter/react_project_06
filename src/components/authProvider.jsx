import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
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
          //
          const userInfo = await getUserInfo(user.uid);
          console.group("isRegistered")
          console.log(userInfo); 
          console.groupEnd()
          //
          if (userInfo.processCompleted) {
            onUserLoggedIn(userInfo);
          } else {
            onUserNotRegistered(userInfo);
          }
          //
        } else {
          // creacion por default al iniciar por primera vez 
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture: "",
            username: "",
            processCompleted: false,
          });
          onUserNotLoggedIn(user);
        }
      } else {
        onUserNotLoggedIn();
      }
    });
    // --->
  }, [navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]);

  return <div> {children}</div>;
}
