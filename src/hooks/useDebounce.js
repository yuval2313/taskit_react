import { useEffect } from "react";
import { useTimeout } from "./useTimeout";

function useDebounce(callback, delay, dependencies) {
  const { clear, reset } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, [clear]);
}

export { useDebounce };
