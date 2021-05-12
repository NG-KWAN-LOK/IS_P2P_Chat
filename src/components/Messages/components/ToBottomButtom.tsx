import React, { useState, useContext, useEffect } from "react";

import useMessageListAutoScrollBottom from "../../../hooks/useMessageListAutoScrollBottom"

import "../styles/_messages.scss";

interface ToBottomButtomProps {
    messageListRef: React.RefObject<HTMLInputElement>;
}
export default function ToBottomButtom({ messageListRef }: ToBottomButtomProps) {
    const [isDisplayToBottomButtom, setIsDisplayToBottomButtom] = useState<boolean>(false)
    useMessageListAutoScrollBottom(messageListRef, null, isDisplayToBottomButtom)
    return (
        <div className='messages__TopBottomButtom' >
            <div className='messages__TopBottomButtom__buttom'>

            </div>
        </div>
    );
}
