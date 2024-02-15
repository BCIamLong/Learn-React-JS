import { useEffect, useRef } from "react";

// interface UseWindowProps {
//   handler: () => void;
//   listenEvenCapturing?: boolean;
// }

export default function useWindow(handler: () => void, listenEvenCapturing: boolean = true) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current === e.target) handler();
    };

    // * so basically the third parameter will be true or false if it's true if it's true we will listen even in the capturing phase the phase the event down
    // * and if it's false so by default it will listen for both the capturing phase and also the bubble up phase (the event bubble up)
    // * this can solve problem in this lecture so 9: detecting click outside modal
    document.addEventListener("click", handleClick, listenEvenCapturing);

    return () => document.removeEventListener("click", handleClick, listenEvenCapturing);
  }, [handler, listenEvenCapturing]);

  return ref;
}
