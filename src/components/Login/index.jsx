import React, { useContext, useState } from "react";
import { SocketContext } from "../../contexts/UseSocket";

import styles from "./styles.module.scss";

const Login = () => {
  const { verifyUser } = useContext(SocketContext);
  const [username, setUsername] = useState("");
  const [userNameBlankText, setUserNameBlankText] = useState("");
  const [wrongText, setwWongText] = useState("　");
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    setUserNameBlankText(e.target.value === "" ? "Please fill in the box" : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    verifyUser(username).then(
      (result) =>
        !result && setwWongText("Nickname is exist, please try another one")
    );
  };

  return (
    <div className={styles.loginContent}>
      <div className={styles.loginContent_loginFrame}>
        <div className={styles.loginContent_loginFrame_title}>Login</div>
        <div className={styles.loginContent_loginFrame_errorText}>
          {wrongText}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className={
              !username
                ? `${styles["loginContent_inputBar"]} ${styles["loginContent_inputBar-error"]}`
                : `${styles["loginContent_inputBar"]}`
            }
            type='text'
            placeholder={"Enter Your Nickname"}
            value={username}
            onChange={handleChangeUsername}
          />
          <div className={styles.loginContent_errorText}>
            {userNameBlankText}
          </div>
          <input
            className={
              !username
                ? `${styles["loginContent_submitBtn"]} ${styles["loginContent_submitBtn-not-allow"]}`
                : `${styles["loginContent_submitBtn"]} ${styles["loginContent_submitBtn-allow"]}`
            }
            type='submit'
            value='Login'
            disabled={!username}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
