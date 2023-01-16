import { useEffect, useState } from "react";

function useCanHover() {
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(any-hover: none)").matches) {
      setCanHover(false);
    }
  }, []);

  return canHover;
}

export { useCanHover };
