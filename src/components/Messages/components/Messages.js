import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import ToBottomButtom from "./ToBottomButtom";
import "../styles/_messages.scss";

import useMessageListAutoScrollBottom from "../../../hooks/useMessageListAutoScrollBottom"

function Messages() {
  const activeUser = useSelector((state) => state.coreLayout.activeUser);
  const messageListId = useSelector((state) => state.message.messageListId);
  const messageData = useSelector((state) => state.message.messageData);
  const messageListRef = useRef(null);
  useMessageListAutoScrollBottom(messageListRef, activeUser, null)
  return (
    <div className='messages'>
      <Header activeUser={activeUser} />
      <div ref={messageListRef} className='messages__list' id='message-list'>
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
      <ToBottomButtom />
      <Footer messageListRef={messageListRef} />
    </div>
  );
}

export default Messages;
