import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveUser } from "../../container/CoreLayout/reducer";

import cx from "classnames";
import UserProfile from "../../common/components/UserProfile/UserProfile";
import SettingMenu from "./SettingMenu"
import "./_user-list.scss";

function User({ user }) {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.coreLayout.activeUser);
  const messageListId = useSelector((state) => state.message.messageListId);
  const messageData = useSelector((state) => state.message.messageData);
  const [isUnreadMessage, setIsUnReadMessage] = useState(false);
  useEffect(() => {
    console.log(user.name + "update");
    if (activeUser != user && messageListId[user.userId]) {
      setIsUnReadMessage(true)
    };
  }, [messageListId[user.userId]]);

  useEffect(() => {
    if (activeUser === user) setIsUnReadMessage(false);
  }, [activeUser]);

  return (
    <div
      className={
        activeUser === user.userId
          ? "user-list__users__user user-list__users__user-active"
          : "user-list__users__user"
      }
      onClick={() => dispatch(setActiveUser(user))}
    >
      <UserProfile icon={user.icon} name={user.name} color={user.color} />
      <div className='user-list__users__user__right-content'>
        <div className='user-list__users__user__title'>
          <div className='user-list__users__user__title__userName'>
            {user.name}
          </div>
          <div className='user-list__users__user__title__newMessageNotification'>
            {isUnreadMessage && (
              <div className='user-list__users__user__title__newMessageNotification__point'></div>
            )}
          </div>
          <p
            className={cx({ "user-list__users__user__online": user.isOnline })}
          ></p>
        </div>
        <p>
          {messageListId[user.userId] &&
            messageData[
              messageListId[user.userId][messageListId[user.userId].length - 1]
            ].message}
        </p>
      </div>
    </div>
  );
}

export default function UserList() {
  const [isDisplay, setIsDisplay] = useState(false);
  const onChangeIsDisplay = useCallback(() => { toggleIsDisplay() })
  const myUser = useSelector((state) => state.coreLayout.myUser);
  const connectedUsers = useSelector(
    (state) => state.coreLayout.connectedUsers
  );
  const toggleIsDisplay = () => {
    setIsDisplay(isDisplay ? false : true)
  }
  const onClickSettingButton = () => {
    console.log("onClick setting")
    toggleIsDisplay()
  }
  return (
    <div className='user-list'>
      <div className='user-list__header'>
        <div className='user-list__header__left'>
          {myUser && (
            <UserProfile
              icon={myUser.icon}
              name={myUser.name}
              color={myUser.color}
            />
          )}
          {myUser && <p>{myUser.name}</p>}
          <i className='fas fa-chevron-down' />
        </div>
        <i className='fas fa-cog' onClick={onClickSettingButton} />
        {isDisplay && <SettingMenu setIsDisplay={onChangeIsDisplay} />}
      </div>
      <div className='user-list__users'>
        {Object.values(connectedUsers).map((user) => {
          if (user.name === myUser.name) return;
          return <User key={user.name} user={user} />;
        })}
      </div>
    </div>
  );
}
