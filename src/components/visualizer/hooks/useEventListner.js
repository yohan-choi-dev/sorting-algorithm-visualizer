import { useRef, useEffect } from 'react';

function useEventListner(eventName, handler, target = globalThis) {
    const handlerRef = useRef();

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = target && target.addEventListener;
        if (!isSupported) return;

        const eventListner = (event) => handlerRef.current(event);
        target.addEventListener(eventName, eventListner);

        return () => {
            target.removeEventListener(eventName, eventListner);
        };
    }, [eventName, target]);
}

export default useEventListner;
