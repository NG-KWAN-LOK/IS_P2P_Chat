import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../../contexts/UseSocket";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";


const RETURN_KEY_CODE = "Enter";
const ESC_KEY_CODE = "Escape";

interface FooterProps {
  messageListRef: React.RefObject<HTMLInputElement>;
}
export default function Footer({ messageListRef }: FooterProps) {
  const [message, setMessage] = useState<string>("");
  const [isDisplayEmojiPicker, setIsDisplayEmojiPicker] = useState<boolean>(false)
  const { sendMessage } = useContext(SocketContext);
  useEffect(() => {
    const onClickEsc: any = (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.key == ESC_KEY_CODE)
        setIsDisplayEmojiPicker(false)
    }
    window.addEventListener("keydown", onClickEsc);

    return () => window.removeEventListener("keydown", onClickEsc);
  }, [])
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);
  const onKeyDown: any = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== RETURN_KEY_CODE || !message) {
      return;
    }
    sendMessage(message);
    setMessage("");
  };
  return (
    <div className='messages__footer' >
      <div className={isDisplayEmojiPicker ? 'emojiPicker-on' : 'emojiPicker-close'} >
        <Picker
          onEmojiClick={(event, emojiObject) => { setMessage(message.concat(emojiObject.emoji)); }}
          disableAutoFocus={true}
          skinTone={SKIN_TONE_MEDIUM_DARK}
          groupNames={{ smileys_people: "PEOPLE" }
          }
          native
        />
      </div>
      < div className='messages__footer__function__bar' >
        <input
          onKeyDown={onKeyDown}
          value={message}
          placeholder='Write a message...'
          id='user-message-input'
          onChange={onChangeMessage}
          autoComplete='off'
        />
        <div className='messages__footer__function__bar__actions' >
          <i className={`fa ${isDisplayEmojiPicker ? 'fa-close' : 'fa-smile-o'}`} onClick={() => { setIsDisplayEmojiPicker(isDisplayEmojiPicker ? false : true) }} />
          < i className='fas fa-paperclip' />
          <i className='mdi mdi-ticket-outline' />
          <button
            onClick={
              () => {
                setMessage("");
                sendMessage(message);
              }
            }
            disabled={!message}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
