import React, { useState, useCallback, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setConnectedUsers } from "../reducer";

import { LatestMessages } from "../../../contexts/LatestMessages/LatestMessages";
import UserList from "../../../components/UserList";
import Messages from "../../../components/Messages";
import IconBackground from "./IconBackground";
import Login from "../../../components/Login";
import {
  USER_CONNECTED,
  LOGOUT,
  VERIFY_USER,
  NEW_CHAT_USER,
} from "../../../constants/Events";
import "../styles/_core-layout.scss";

const socketUrl = "http://localhost:4000/";
export default function CoreLayout() {
  const activeUser = useSelector((state) => state.coreLayout.activeUser);
  const myUser = useSelector((state) => state.coreLayout.myUser);
  const dispatch = useDispatch();
  const socketRef = useRef();
  useEffect(() => {
    initSocket();
  }, []);

  const initSocket = () => {
    const socket = io(socketUrl);

    socket.on("connect", () => {
      if (myUser) {
        reconnect();
      } else {
        console.log("connected");
      }
    });

    socketRef.current = socket;
  };

  const verifyUser = useCallback((username, errCallback) => {
    return new Promise((reslove) => {
      socketRef.current.emit(VERIFY_USER, username, ({ isUser, user }) => {
        if (isUser) {
          dispatch(setUser(null));
          reslove(false);
        } else {
          socketRef.current.emit(USER_CONNECTED, user);
          dispatch(setUser(user));
          reslove(true);

          socketRef.current.on(USER_CONNECTED, (connectedUsers) => {
            console.log(connectedUsers);
            dispatch(setConnectedUsers(connectedUsers));
          });
        }
      });
    });
  }, []);

  const reconnect = () => {
    verifyUser(myUser.username);
  };

  return (
    <div className='body'>
      {!myUser && <Login verifyUser={verifyUser} />}
      <div className='core'>
        <IconBackground />
        <LatestMessages>
          <UserList />
          {activeUser && <Messages />}
        </LatestMessages>
      </div>
    </div>
  );
}
