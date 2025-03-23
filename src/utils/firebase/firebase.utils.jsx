import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, 
  GoogleAuthProvider, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCjBuOkKrvkJgdx646UexKE0oi8K8Y5yPw",
    authDomain: "crwn-clothing-db-d8bf5.firebaseapp.com",
    projectId: "crwn-clothing-db-d8bf5",
    storageBucket: "crwn-clothing-db-d8bf5.firebasestorage.app",
    messagingSenderId: "460440401520",
    appId: "1:460440401520:web:763d4e97adf1023d1666b5"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = ()=> signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation={displayName: 'Shashank'}) => {
    if(!userAuth)  return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    // console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    // console.log(userSnapShot.exists());

    if(!userSnapShot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      }
      catch(error){
        console.log('error creating the user', error.message);
      }
    }
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
  }; 

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async() => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);  