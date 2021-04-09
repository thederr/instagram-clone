/*

*/
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
 
        apiKey: "AIzaSyC7jqUPHxQJ4LSCIe9qv9-XaR_If8CKLK0",
        authDomain: "finstagram-84052.firebaseapp.com",
        projectId: "finstagram-84052",
        storageBucket: "finstagram-84052.appspot.com",
        messagingSenderId: "126586311364",
        appId: "1:126586311364:web:bb5c06eba35dc625226f91",
        measurementId: "G-6GX87DHHC3"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


