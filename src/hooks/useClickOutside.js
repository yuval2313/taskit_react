import { useEffect, useRef } from "react";

function useClickOutside(handler) {
  const domNode = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return domNode;
}

export { useClickOutside };
