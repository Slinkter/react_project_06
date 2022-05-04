import { async } from "@firebase/util";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import { getProfilePhotoUrl, setUserProfilePhoto, updateUser } from "../firebase/firebase";

export default function EditProfileView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState();

  const fileRef = useRef(null);

  async function handleUserLoggedIng(user) {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    
    setState(2);
  }
  function handleUserNoRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleChangeFile(e) {
    const files = e.targer.files;
    const fileReader = new FileReader();

    if (fileReader && files && files.length > 0) {
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;
        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        
        console.log(res);

        if(res){
          const tmpUser = {...currentUser};
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser)
          setCurrentUser({...tmpUser})
          const url = await getProfilePhotoUrl(currentUser.profilePicture)
          setProfileUrl(url)

        }


      };
    }
  }

  if (state !== 2) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIng}
        onUserNotRegistered={handleUserNoRegistered}
        onUserNotLoggedIn={handleUserNotLoggedIn}
      ></AuthProvider>
    );
  } else {
    return (
      <DashboardWrapper>
        <div>
          <h2> Edit Profile Info</h2>
          <div>
            <div>
              <img src={profileUrl} alt="" width={100} />
            </div>
            <div>
              <button onClick={handleOpenFilePicker}>
                {" "}
                Choose new profile picture
              </button>
              <input
                ref={fileRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleChangeFile}
              />
            </div>
          </div>
        </div>
      </DashboardWrapper>
    );
  }
}
