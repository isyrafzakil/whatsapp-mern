import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios.js";
import MessageData from "./messageData";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // axios.get("/messages/sync").then((response) => {
    //   setMessages(response.data);
    // });
    setMessages(MessageData);
  }, []);

  // Executed once, listening to Pusher that's connected to MongoDB
  useEffect(() => {
    const pusher = new Pusher("1760eee7dac5b50de768", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    // Clean up function so that it won't create new subscriber/listener every single time
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
