import AuthProvider from "../components/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { existsUsername, updateUser } from "../firebase/firebase";

import style from "./chooseView.module.css";

export default function ChooseView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [curentUser, setCurentUser] = useState(null);
  const [username, setUsername] = useState("");

  function handleUserLoggedIng(user) {
    navigate("/dashboard");
  }
  function handleUserNoRegistered(user) {
    setCurentUser(user);
    setState(3);
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  if (state === 3) {
    function handleInputUsername(e) {
      setUsername(e.target.value);
    }

    async function handleContinue() {
      if (username !== "") {
        const exists = await existsUsername(username);
        if (exists) {
          setState(5);
        } else {
          const tmp = { ...curentUser };
          tmp.username = username;
          tmp.processCompleted = true;
          await updateUser(tmp);
          setState(6);
        }
      }
    }

    if (state === 3 || state === 5) {
      return (
        <div className={style.chooseUsernameContainer}>
          <h1> Bienvenido {curentUser.displayName} </h1>
          <p> para terminar el proceso elige un nombre de usuario </p>
          {state === 5 ? (
            <p> el nombre de usuario ya existe , escoge otro</p>
          ) : (
            ""
          )}
          <div>
            <input
              className="input"
              type="text"
              onChange={handleInputUsername}
            />
          </div>

          <div>
            <button className="btn" onClick={handleContinue}>
              {" "}
              Continue{" "}
            </button>
          </div>
        </div>
      );
    }
  }

  if (state === 6) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1> Felicidades! ya puyede ir al dashboard a crea tus links </h1>
        <Link to="/dashboard"> Continuar </Link>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIng}
      onUserNotRegistered={handleUserNoRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      {" "}
      ChooseView{" "}
    </AuthProvider>
  );
}
