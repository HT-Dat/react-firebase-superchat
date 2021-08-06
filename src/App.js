import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState, useRef } from "react";

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
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    );
  }
  function ChatRoom() {
    const messagesRef = firestore.collection("messages");
    const dummy = useRef();
    const query = messagesRef.orderBy("createdAt").limit(25);
    const [messages] = useCollectionData(query, {
      idField: "id",
    });
    const [formValue, setFormValue] = useState("");
    const sendMessage = async (e) => {
      setFormValue('');
      e.preventDefault();
      const { uid, photoURL } = auth.currentUser;
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL,
      });
      dummy.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    };
    return (
      <div>
        <main>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
            <div ref={dummy} ></div>
        </main>
        <form onSubmit={sendMessage} className>
          <input
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
