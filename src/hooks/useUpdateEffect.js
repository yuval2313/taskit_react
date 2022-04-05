import { useEffect, useRef } from "react";

function useUpdateEffect(callback, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else return callback();
  }, dependencies);
}

export { useUpdateEffect };
