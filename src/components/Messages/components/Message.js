import React from "react";
import { useSelector } from "react-redux";
import cx from "classnames";

function Message({ nextMessage, message, sender }) {
  const myUser = useSelector((state) => state.coreLayout.myUser);
  console.log(message);
  return (
    <p
      className={cx(
        "messages__message",
        "animate__animated animate__rubberBand",
        {
          "messages__message--me": sender.userId === myUser.userId,
          "messages__message--last":
            (!nextMessage && sender === myUser.userId) ||
            (nextMessage && nextMessage.user !== sender),
        }
      )}
      //key={message.id}
    >
      {message}
    </p>
  );
}
export default React.memo(Message);
