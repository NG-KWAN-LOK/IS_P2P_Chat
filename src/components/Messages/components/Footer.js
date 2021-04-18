import React, { useState, useContext } from "react";
import { SocketContext } from "../../../contexts/UseSocket";

const RETURN_KEY_CODE = 13;

export default function Footer() {
  const [message, setMessage] = useState("");
  const { sendMessage } = useContext(SocketContext);

  const onChangeMessage = (e) => setMessage(e.target.value);
  const onKeyDown = ({ keyCode }) => {
    if (keyCode !== RETURN_KEY_CODE || !message) {
      return;
    }

    sendMessage(message);

    setMessage("");
  };

  return (
    <div className='messages__footer'>
      <input
        onKeyDown={onKeyDown}
        value={message}
        placeholder='Write a message...'
        id='user-message-input'
        onChange={onChangeMessage}
        autoComplete='off'
      />
      <div className='messages__footer__actions'>
        <i className='far fa-smile' />
        <i className='fas fa-paperclip' />
        <i className='mdi mdi-ticket-outline' />
        <button
          onClick={() => {
            sendMessage(message);
            setMessage(null);
          }}
          disabled={!message}
        >
          Send
        </button>
      </div>
    </div>
  );
}
