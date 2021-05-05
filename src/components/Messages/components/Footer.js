import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../../contexts/UseSocket";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

const RETURN_KEY_CODE = 13;
const ESC_KEY_CODE = "Escape";


export default function Footer() {
  const [message, setMessage] = useState("");
  const [isDisplayEmojiPicker, setIsDisplayEmojiPicker] = useState(false)
  const { sendMessage } = useContext(SocketContext);

  useEffect(() => {
    const onClickEsc = (e) => {
      if (e.key == ESC_KEY_CODE)
        setIsDisplayEmojiPicker(false)
    }
    window.addEventListener("keydown", onClickEsc);
    return () => window.removeEventListener("keydown", onClickEsc);
  }, [])
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
      {isDisplayEmojiPicker &&
        <div className='emojiPicker'>
          <Picker
            onEmojiClick={(event, emojiObject) => { setMessage(message.concat(emojiObject.emoji)); setIsDisplayEmojiPicker(false) }}
            disableAutoFocus={true}
            skinTone={SKIN_TONE_MEDIUM_DARK}
            groupNames={{ smileys_people: "PEOPLE" }}
            native
          />
        </div>}
      <input
        onKeyDown={onKeyDown}
        value={message}
        placeholder='Write a message...'
        id='user-message-input'
        onChange={onChangeMessage}
        autoComplete='off'
      />
      <div className='messages__footer__actions'>
        <i className='far fa-smile' onClick={() => { setIsDisplayEmojiPicker(isDisplayEmojiPicker ? false : true) }} />
        <i className='fas fa-paperclip' />
        <i className='mdi mdi-ticket-outline' />
        <button
          onClick={() => {
            setMessage("");
            sendMessage(message);
          }}
          disabled={!message}
        >
          Send
        </button>
      </div>
    </div>
  );
}
