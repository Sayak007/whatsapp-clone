import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB04u8El8JzkGWY0vFUO2UYXNIipIdZJqQ",
    authDomain: "whatsapp-clone-cd8c5.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-cd8c5.firebaseio.com",
    projectId: "whatsapp-clone-cd8c5",
    storageBucket: "whatsapp-clone-cd8c5.appspot.com",
    messagingSenderId: "260003830341",
    appId: "1:260003830341:web:1d0abce7f8fa219ad7a12c",
    measurementId: "G-QDKMEM3JJF"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;