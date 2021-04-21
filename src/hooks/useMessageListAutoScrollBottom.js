import { useEffect } from "react"

const useMessageListAutoScrollBottom = (ref, activeUser) => {
    useEffect(() => {
        if (ref) {
            ref.current.addEventListener('DOMNodeInserted', (event) => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
        return () => {
            ref.current.removeEventListener('DOMNodeInserted', (event) => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [activeUser])
}

export default useMessageListAutoScrollBottom