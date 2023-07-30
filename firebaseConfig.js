
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
  import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
  import { getFirestore,collection, addDoc,getDocs ,doc,setDoc,getDoc,updateDoc} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCf6qybQ5DIizLIUGso9PIRrgaaOfMsYcQ",
    authDomain: "application-efd55.firebaseapp.com",
    projectId: "application-efd55",
    storageBucket: "application-efd55.appspot.com",
    messagingSenderId: "711186775052",
    appId: "1:711186775052:web:ed86cc63bd4889c451c229"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export{auth,app,db,createUserWithEmailAndPassword,signInWithEmailAndPassword,collection, addDoc,getAuth, onAuthStateChanged,signOut,getDocs,storage,ref,uploadBytesResumable,getDownloadURL,doc,setDoc,getDoc,updateDoc}