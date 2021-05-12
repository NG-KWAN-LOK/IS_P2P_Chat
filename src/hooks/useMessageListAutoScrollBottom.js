import { useEffect } from "react";

const useMessageListAutoScrollBottom = (ref, activeUser, isToBottom) => {
  useEffect(() => {
    if (ref) {
      ref.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight });
      });
    }
    return () => {
      ref.current.removeEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight });
      });
    };
  }, [activeUser, isToBottom]);
};

export default useMessageListAutoScrollBottom;
