import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveUser } from "../../container/CoreLayout/reducer";

import cx from "classnames";
import LatestMessagesContext from "../../contexts/LatestMessages/LatestMessages";
import UserProfile from "../../common/components/UserProfile/UserProfile";
import USERS from "../../constants/users";
import "./_user-list.scss";

function User({ user }) {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.coreLayout.activeUser);
  const { messages } = useContext(LatestMessagesContext);
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
          <p>{user.name}</p>
          <p
            className={cx({ "user-list__users__user__online": user.isOnline })}
          ></p>
        </div>
        <p>{messages[user.userId]}</p>
      </div>
    </div>
  );
}

export default function UserList() {
  const connectedUsers = useSelector(
    (state) => state.coreLayout.connectedUsers
  );
  console.log(connectedUsers);
  console.log(USERS);
  return (
    <div className='user-list'>
      <div className='user-list__header'>
        <div className='user-list__header__left'>
          <p>All Messages</p>
          <i className='fas fa-chevron-down' />
        </div>
        <i className='fas fa-cog' />
      </div>
      <div className='user-list__users'>
        {Object.values(connectedUsers).map((user) => {
          return <User key={user.name} user={user} />;
        })}
      </div>
    </div>
  );
}
