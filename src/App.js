import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
firebase.initializeApp({
  apiKey: "AIzaSyA3_E6iLr8A4JFDjvcVSzASttnWLisa36w",
  authDomain: "superchat-53299.firebaseapp.com",
  projectId: "superchat-53299",
  storageBucket: "superchat-53299.appspot.com",
  messagingSenderId: "951331474775",
  appId: "1:951331474775:web:d316dd40a329a5e2c54212",
  measurementId: "G-VEZJEB6ZN4"
})
const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
  const [user] = useAuthState(auth);
  const signInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  function SignIn(){
    return (
      <button type="button" onClick={signInWithGoogle}>Sign in with google</button>
    )
  }
  function ChatRoom(){

  }
  return (
    <div className="App">
      <header className="App-header">
          
      </header>
      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
  );
}

export default App;
