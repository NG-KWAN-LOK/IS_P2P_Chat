import React from "react";
import UserProfile from "../../../common/components/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setConnectedUsers,
} from "../../../container/CoreLayout/reducer";

export default function Header() {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.coreLayout.activeUser);
  return (
    <div className='messages__header'>
      <div className='messages__header__left-content'>
        <UserProfile name='Botty' icon='fas fa-comment-dots' color='#4DB8EF' />
        <div className='messages__header__left-content__text'>
          <h1>
            {activeUser.name} <div className='messages__header__online-dot' />
          </h1>
        </div>
      </div>
      <div className='messages__header__right-content'>
        <div className='messages__header__status'>
          <i className='mdi mdi-eye-outline' />
          <p className='no-margin'>botty-beep-boop</p>
        </div>
        <div className='messages__header__status'>
          <i className='far fa-clock' />
          <p className='no-margin'>5m</p>
        </div>
      </div>
    </div>
  );
}
