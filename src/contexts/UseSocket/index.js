import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import useSound from "use-sound";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setConnectedUsers } from "../../container/CoreLayout/reducer";
import { receivePlaintextMessage } from "../../components/Messages/reducer";
import {
  decryptMessageWithPrivateKey,
  encryptMessageWithPublicKey,
  encryptMessageWithAESKey,
  decryptMessageWithAESKey,
  generateAESKeys,
} from "../../tools/AES";
import config from "../../config";

import {
  USER_CONNECTED,
  USER_DISCONNECTED,
  LOGOUT,
  VERIFY_USER,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  TYPING,
  PRIVATE_MESSAGE,
  NEW_CHAT_USER,
} from "../../constants/Events";
const socketUrl = "http://localhost:4000";

export const SocketContext = React.createContext({
  sendMessage: (message) => { }
});

export const useSocket = () => {
  const [isFocus, setIsFocus] = useState(true);
  const myUser = useSelector((state) => state.coreLayout.myUser);
  const activeUser = useSelector((state) => state.coreLayout.activeUser);
  const myKeys = useSelector((state) => state.coreLayout.myKeys);
  const messageListId = useSelector((state) => state.message.messageListId);
  const dispatch = useDispatch();
  const [playMessageIncome] = useSound(config.MESSAGE_INCOME_URL);
  const [playSend] = useSound(config.SEND_AUDIO_URL);
  const [playReceive] = useSound(config.RECEIVE_AUDIO_URL);

  const socketRef = useRef();

  useEffect(() => {
    const initSocket = () => {
      const socket = io(socketUrl, {
        transports: ["websocket"], // or [ "websocket", "polling" ] (the order matters)
      });

      socket.on("connect", () => {
        if (myUser) {
          verifyUser(myUser.username);
        } else {
          console.log("connected");
        }
      });

      socketRef.current = socket;
    };
    initSocket();
    socketRef.current.on(PRIVATE_MESSAGE, async (message) => {
      console.log("received message", message);
      const decryptedAESKey = await decryptMessageWithPrivateKey(
        message.aesKey,
        myKeys.privateKey
      );
      console.log("decryptedAESKey", decryptedAESKey);
      const decryptedMessageByAES = {
        ...message,
        message: decryptMessageWithAESKey(message.message, decryptedAESKey),
      };

      console.log("decryptedMessageByAES", decryptedMessageByAES);
      dispatch(receivePlaintextMessage(decryptedMessageByAES));
    });

    const onFocus = () => {
      setIsFocus(true);
      document.title = "Messager";
    };
    const outFocus = () => {
      setIsFocus(false);
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", outFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", outFocus);
    };
  }, [myKeys]);

  useEffect(() => {
    console.log("isFocus?" + isFocus);
    if (!isFocus) {
      document.title = "🔴 Messager";
      playMessageIncome();
    }
  }, [messageListId]);

  const verifyUser = useCallback((username) => {
    return new Promise((reslove) => {
      socketRef.current.emit(VERIFY_USER, username, ({ isUser, user }) => {
        if (isUser) {
          dispatch(setUser(null));
          reslove(false);
        } else {
          let myUser = {
            ...user,
            publicKey: myKeys.publicKey,
          };
          console.log(myUser);
          socketRef.current.emit(USER_CONNECTED, myUser);
          console.log(user);
          dispatch(setUser(user));
          reslove(true);

          socketRef.current.on(USER_CONNECTED, (connectedUsers) => {
            console.log(connectedUsers);
            dispatch(setConnectedUsers(connectedUsers));
          });
        }
      });
    });
  });

  const sendMessage = useCallback(async (message) => {
    console.log(message, myUser.socketId, activeUser.socketId);
    const aesKey = generateAESKeys();
    console.log("aesKey", aesKey);
    const encryptedAESByRSA = await encryptMessageWithPublicKey(
      aesKey,
      activeUser.publicKey
    );
    console.log("encryptedAESByRSA", encryptedAESByRSA);
    const encryptedMessageByAES = encryptMessageWithAESKey(message, aesKey);
    console.log("encryptedMessageByAES", encryptedMessageByAES);
    socketRef.current.emit(
      PRIVATE_MESSAGE,
      {
        aesKey: encryptedAESByRSA,
        message: encryptedMessageByAES,
        sender: myUser,
        reciever: activeUser,
      },
      (respondMessage) => {
        console.log("respondMessage ", respondMessage);
        respondMessage.message = message;
        dispatch(receivePlaintextMessage(respondMessage));
        playSend();
      }
    );
  });
  return { verifyUser, sendMessage };
};
