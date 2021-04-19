import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import EthCrypto from "eth-crypto";
import { setMyKeys } from "../../container/CoreLayout/reducer";

export const RSAContext = React.createContext();

export const useRSA = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state) => state.coreLayout.activeUser);

  useEffect(() => {
    const identity = EthCrypto.createIdentity();
    console.log("setKeys");
    dispatch(setMyKeys(identity));
  }, []);

  return {};
};
