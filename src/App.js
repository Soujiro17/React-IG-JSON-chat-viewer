import { useState } from "react";
import "./App.scss";
import photo from "./assets/generic-photo.jpg";
import Message from "./components/Message/Message";

function App() {
  const [author, setAuthor] = useState("");
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState([]);

  const analizeChat = async (e) => {
    const data = await new Response(e[0]).json();

    setUser(data.participants[0].name);
    setAuthor(data.participants[1].name);
    setMessages(data.messages);
  };

  return (
    <div className="container">
      <input type="file" onChange={(e) => analizeChat(e.target.files)} />
      <div className="chat-container">
        <div className="chat">
          <div className="chat-header">
            <img src={photo} alt="user-profile" className="chat-photo" />
            <p>{user ? user : "Cargando..."}</p>
          </div>
          <div className="chat-body">
            {messages
              .slice(0)
              .reverse()
              .map((messageArray) => {
                return (
                  <Message
                    message={messageArray}
                    type={messageArray.type}
                    author={messageArray.sender_name === author ? true : false}
                    time={messageArray.timestamp_ms}
                    key={messageArray.timestamp_ms}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
