import { useEffect, RefObject, useCallback } from "react";

type OutsideClickCallback = () => void;

// handle clicks outside a referenced element
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
