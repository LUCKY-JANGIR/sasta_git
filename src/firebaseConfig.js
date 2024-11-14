import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore'
import {GoogleAuthProvider, GithubAuthProvider, PhoneAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD5sp-GwV6yD1p7LQQwxeMfCgSS5sH_ga8",
  authDomain: "sasta-git-c8521.firebaseapp.com",
  projectId: "sasta-git-c8521",
  storageBucket: "sasta-git-c8521.appspot.com",
  messagingSenderId: "631812842297",
  appId: "1:631812842297:web:f876b881b334a3fd4f7ee8",
};

  
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const db = firebase.firestore()
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const phoneProvider = new firebase.auth.PhoneAuthProvider();
export const gitProvider = new firebase.auth.GithubAuthProvider();
export default firebase;
