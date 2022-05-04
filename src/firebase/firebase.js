// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
//

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
/* const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */

//
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function userExists(uid) {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}

export async function existsUsername(username) {
  const users = [];
  const docRef = collection(db, "users");
  const query_users = query(docRef, where("username", "==", username));
  const query_snapShot = await getDoc(query_users);

  query_snapShot.forEach((doc) => {
    users.push(doc.data());
  });

  return users.length > 0 ? users[0].uid : null;
}

export async function registerNewUser(user) {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {}
}

export async function updateUser(user) {
  console.log(user);
  try {
    const userRef = collection(db, "users");
    await setDoc(doc(userRef, user.uid), user);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserInfo(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function insertNewLink(link) {
  try {
    const docRef = collection(db, "links");
    const res = await addDoc(docRef, link);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function getLinks(uid) {
  const links = [];
  try {
    const collectionRef = collection(db, "links");
    const q = query(collectionRef, where("uid", "==", uid));
    const querySnapsnot = await getDocs(q);

    querySnapsnot.forEach((doc) => {
      const link = { ...doc.data() };
      link.docId = doc.id;
      links.push(link);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateLink(docId, link) {
  try {
    const docRef = doc(db, "links", docId);
    const res = await setDoc(docRef, link);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteLink(docId) {
  try {
    const docRef = doc(db, "links");
    const res = await deleteDoc(docRef);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function setUserProfilePhoto(uid, file) {
  try {
    const imageRef = ref(storage, `images/${uid} `);
    const resUpload = await uploadBytes(imageRef, file);
    return resUpload;
  } catch (error) {
    console.error(error);
  }
}

/* obtener url de la imagen */

export async function getProfilePhotoUrl(profilePicture) {
  try {
    const imageRef = ref(storage, profilePicture);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserPublicProfileInfo(uid) {
  const profileInfo = await getUserInfo(uid);
  const linksInfo = await getLinks(uid);

  return { profileInfo: profileInfo, linksInfo: linksInfo };
}
