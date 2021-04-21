import { useSelector, useDispatch } from "react-redux";

import UserList from "../../../components/UserList";
import Messages from "../../../components/Messages";
import IconBackground from "./IconBackground";
import Login from "../../../components/Login";
import PopUpQRCode from "../../../components/PopUpQRCode"
import "../styles/_core-layout.scss";

export default function CoreLayout() {
  const activeUser = useSelector((state) => state.coreLayout.activeUser);
  const myUser = useSelector((state) => state.coreLayout.myUser);
  const isPopUpQRCodeDisplay = useSelector((state) => state.coreLayout.isPopUpQRCodeDisplay);
  return (
    <div className='body'>
      {!myUser && <Login />}
      <div className='core'>
        <IconBackground />
        <UserList />
        {activeUser && <Messages />}
        {isPopUpQRCodeDisplay && <PopUpQRCode setIsPopUpQRCode={""} />}
      </div>
    </div>
  );
}
