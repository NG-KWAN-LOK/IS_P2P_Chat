import React, { useContext, useCallback, useState } from "react";
import useSound from "use-sound";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setConnectedUsers,
} from "../../../container/CoreLayout/reducer";

import config from "../../../config";
import LatestMessagesContext from "../../../contexts/LatestMessages/LatestMessages";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import "../styles/_messages.scss";

function Messages() {
  const activeUser = useSelector((state) => state.coreLayout.activeUser);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);
  const { setLatestMessage } = useContext(LatestMessagesContext);
  const sendMessage = () => {
    console.log("do send message " + message);
    let newMessage = { user: "me", id: 1, message: message };
    setMessages((messages) => [...messages, newMessage]);
  };
  const onChangeMessage = useCallback((e) => setMessage(e.target.value), []);

  return (
    <div className='messages'>
      <Header activeUser={activeUser} />
      <div className='messages__list' id='message-list'>
        {messages.map((item) => {
          return <Message keys={message.id} nextMessage={""} message={item} />;
        })}
      </div>
      <Footer
        message={message}
        sendMessage={sendMessage}
        onChangeMessage={onChangeMessage}
      />
    </div>
  );
}

export default Messages;
