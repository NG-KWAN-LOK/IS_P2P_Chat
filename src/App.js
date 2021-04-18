import React from "react";
import CoreLayout from "./container/CoreLayout";
import { SocketContext, useSocket } from "./contexts/UseSocket";
import { RSAContext, useRSA } from "./contexts/UseRSA";

export default function App() {
  const socketValue = useSocket();
  const RSAValue = useRSA();
  //console.log(RSAValue);
  return (
    <RSAContext.Provider value={RSAValue}>
      <SocketContext.Provider value={socketValue}>
        <CoreLayout />
      </SocketContext.Provider>
    </RSAContext.Provider>
  );
}
