import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyA3_E6iLr8A4JFDjvcVSzASttnWLisa36w",
    authDomain: "superchat-53299.firebaseapp.com",
    projectId: "superchat-53299",
    storageBucket: "superchat-53299.appspot.com",
    messagingSenderId: "951331474775",
    appId: "1:951331474775:web:bfec4aaaeccf83b1c54212",
    measurementId: "G-P8CSG35XBB",
  });
}
const auth = firebase.auth();
const firestore = firebase.firestore();
function App() {
  const [user] = useAuthState(auth);
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  function SignIn() {
    return (
      <button type="button" onClick={signInWithGoogle}>
        Sign in with google
      </button>
    );
  }
  function SignOut() {
    return (
      auth.currentUser && (
        <button type="button" onClick={() => auth.signOut()}>
          Sign out
        </button>
      )
    );
  }
  function ChatMessage(props) {
    const { text, uid } = props.message;

    return <p>{text}</p>;
  }
  function ChatRoom() {
    const messagesRef = firestore.collection("messages");

    const query = messagesRef.orderBy("createdAt").limit(25);
    const [messages] = useCollectionData(query, {
      idField: "id",
    });
    return (
      <>
        <SignOut />
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </>
    );
  }
  return (
    <div className="App">
      <header className="App-header"></header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
