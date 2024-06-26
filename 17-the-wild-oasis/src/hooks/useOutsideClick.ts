import { useEffect, useRef } from "react";

// interface UseWindowProps {
//   handler: () => void;
//   listenEvenCapturing?: boolean;
// }

export default function useOutsideClick(handler: () => void, listenEvenCapturing: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // console.log(ref.current, e.target);
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
      // * so we need to use contains method because if we check ref.current !== e.target that mean when we click the inside the ref.current so the element inside the ref.current
      // * then well that's different right and this condition is true and it's close but it's not what we want we want only this will close when we click outside this ref.current right
      // * therefore we need to use contains method in this case
      // if (ref.current && ref.current !== e.target) handler();
    };

    // * so basically the third parameter will be true or false if it's true if it's true we will listen even in the capturing phase the phase the event down
    // * and if it's false so by default it will listen for both the capturing phase and also the bubble up phase (the event bubble up)
    // * this can solve problem in this lecture so 9: detecting click outside modal
    document.addEventListener("click", handleClick, listenEvenCapturing);

    return () => document.removeEventListener("click", handleClick, listenEvenCapturing);
  }, [handler, listenEvenCapturing]);
  // }, [handler, listenEvenCapturing]);

  return ref;
}
