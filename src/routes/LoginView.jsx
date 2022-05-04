import { async } from "@firebase/util";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, userExists } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";

export default function LoginView() {
  const navigate = useNavigate();
  /*   const [currentUser, setCurrentUser] = useState(null); */

  /* 
    State
    0:inicial
    1:loading
    2:login completo
    3:login pero sin registro
    4:no hay nadie logueado
    5: ya existe el username
    6: nuevo username,click para continuar
    7: userna no existe
    
    */
  const [state, setCurrentState] = useState(0);

  /*   useEffect(() => {
    setCurrentState(1);
    // --->
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          //TODO : redirigir a dashBoard
          setCurrentState(2);
          navigate("/dashboard");
        } else {
          //TODO : redirigir a choose username
          setCurrentState(3);
          navigate("/choose-username");
        }
        console.log(user.displayName);
      } else {
        setCurrentState(4);
        console.log("no hay nadie autenticado....");
      }
    });
   // --->


  }, [navigate]); */

  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);

        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleUserLoggedIng(user) {
    navigate("/dashboard");
  }
  function handleUserNoRegistered(user) {
    navigate("/choose-username");
  }
  function handleUserNotLoggedIn() {
    setCurrentState(4);
  }

  if (state === 1) {
    return <div> Loading ...</div>;
  }

  if (state === 2) {
    return <div> estas autenticado y registrado ...</div>;
  }

  if (state === 3) {
    return <div> estas autenticado pero no registrado ...</div>;
  }

  if (state === 4) {
    return (
      <div>
        <button onClick={handleOnClick}> Login with Google </button>
      </div>
    );
  }

  if (state === 5) {
    return (
      <div>
        <button onClick={handleOnClick}> Login with Google </button>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIng}
      onUserNotRegistered={handleUserNoRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div> Loading ...</div>;
    </AuthProvider>
  );
}
