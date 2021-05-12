import React, { useState, useContext, useEffect } from "react";

import useMessageListAutoScrollBottom from "../../../hooks/useMessageListAutoScrollBottom";

import "../styles/_messages.scss";

interface ToBottomButtomProps {
  isDisplayToBottomButtom: boolean;
  onScrollToBottom: () => {};
}
export default function ToBottomButtom({
  isDisplayToBottomButtom,
  onScrollToBottom,
}: ToBottomButtomProps) {
  return (
    <div
      className={`messages__TopBottomButtom ${
        isDisplayToBottomButtom
          ? "messages__TopBottomButtom-on"
          : "messages__TopBottomButtom-off"
      }`}
      onClick={() => onScrollToBottom()}
    >
      <i className='fa fa-angle-down' aria-hidden='true'></i>
    </div>
  );
}
