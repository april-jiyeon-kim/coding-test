import { useEffect, RefObject, useCallback } from "react";

type OutsideClickCallback = () => void;

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: OutsideClickCallback
): void => {
  const handleClick = useCallback(
    (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);
};
