import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import EthCrypto from "eth-crypto";
import { setMyKeys } from "../../container/CoreLayout/reducer";

export const RSAContext = React.createContext();

export const useRSA = () => {
  const dispatch = useDispatch();
  const myKeys = useSelector((state) => state.coreLayout.myKeys);
  const activeUser = useSelector((state) => state.coreLayout.activeUser);

  useEffect(() => {
    const identity = EthCrypto.createIdentity();
    console.log("setKeys");
    dispatch(setMyKeys(identity));
  }, []);

  const encryptMessage = (message) => {
    return new Promise((reslove) => {
      EthCrypto.encryptWithPublicKey(
        activeUser.publicKey, // publicKey
        message // message
      ).then((message) => {
        console.log(message);
        reslove(message);
      });
    });
  };
  return { encryptMessage };
};
