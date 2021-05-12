import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import ToBottomButtom from "./ToBottomButtom";
import "../styles/_messages.scss";

import useMessageListAutoScrollBottom from "../../../hooks/useMessageListAutoScrollBottom";

function Messages() {
  const activeUser = useSelector((state) => state.coreLayout.activeUser);
  const messageListId = useSelector((state) => state.message.messageListId);
  const messageData = useSelector((state) => state.message.messageData);
  const [isDisplayToBottomButtom, setIsDisplayToBottomButtom] = useState(false);
  const onScrollToBottom = useCallback(() => ScrollToBottom());
  const messageListRef = useRef(null);
  useMessageListAutoScrollBottom(messageListRef, activeUser, null);
  useEffect(() => {
    toggleIsDisplayToBottomButtom(messageListRef.current);
    const onScroll = () => {
      toggleIsDisplayToBottomButtom(messageListRef.current);
    };
    messageListRef.current.addEventListener("scroll", onScroll);
    return () => {
      messageListRef.current.removeEventListener("scroll", onScroll);
    };
  }, []);
  const toggleIsDisplayToBottomButtom = (ref) => {
    if (ref.scrollTop < ref.scrollHeight - ref.clientHeight) {
      setIsDisplayToBottomButtom(true);
    } else {
      setIsDisplayToBottomButtom(false);
    }
  };
  const ScrollToBottom = () => {
    messageListRef.current.scroll({
      top: messageListRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className='messages'>
      <Header activeUser={activeUser} />
      <div className='messages__list'>
        <div ref={messageListRef} className='messages__list__content'>
          {messageListId[activeUser.userId] &&
            messageListId[activeUser.userId].map((messageId) => {
              return (
                <Message
                  keys={messageId}
                  nextMessage={""}
                  message={messageData[messageId].message}
                  sender={messageData[messageId].sender}
                />
              );
            })}
        </div>
        <ToBottomButtom
          isDisplayToBottomButtom={isDisplayToBottomButtom}
          onScrollToBottom={onScrollToBottom}
        />
      </div>
      <Footer messageListRef={messageListRef} />
    </div>
  );
}

export default Messages;
