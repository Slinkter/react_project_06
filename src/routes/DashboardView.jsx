import AuthProvider from "../components/authProvider";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import { insertNewLink } from "../firebase/firebase";

export default function DashboardView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [curentUser, setCurentUser] = useState(null);
  const [title, setTittle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  function handleUserLoggedIng(user) {
    setCurentUser(user);
    setState(2);
  }
  function handleUserNoRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIng}
        onUserNotRegistered={handleUserNoRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      >
        Loading
      </AuthProvider>
    );
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    addLink();
  }

  function addLink() {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: curentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTittle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  }

  function handleOnChange(e) {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTittle(value);
    }

    if (e.target.name === "url") {
      setUrl(value);
    }
  }

  return (
    <DashboardWrapper>
      <div>
        <h1> Dashboard</h1>
        <form action="" onSubmit={handleOnSubmit}>
          <label htmlFor="title"> title</label>
          <input type="text" name="title" onChange={handleOnChange} />

          <label htmlFor="url"> title</label>
          <input type="text" name="url" onChange={handleOnChange} />

          <input type="submit" value="create new Link" />
        </form>

        <div>
          {links.map((link) => {
            return (
              <div key={link.id}>              
                <a href={link.url}> {link.title} </a>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardWrapper>
  );
}
