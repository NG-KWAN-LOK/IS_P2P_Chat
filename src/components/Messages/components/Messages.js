import { useSelector } from "react-redux";

import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import "../styles/_messages.scss";

function Messages() {
  const activeUser = useSelector((state) => state.coreLayout.activeUser);
  const messageListId = useSelector((state) => state.message.messageListId);
  const messageData = useSelector((state) => state.message.messageData);
  return (
    <div className='messages'>
      <Header activeUser={activeUser} />
      <div className='messages__list' id='message-list'>
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
      <Footer />
    </div>
  );
}

export default Messages;
