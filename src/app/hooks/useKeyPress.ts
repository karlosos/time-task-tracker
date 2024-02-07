import { useCallback, useEffect } from "react";

export function useKeyPress(
  callback: () => void,
  keyCodes: string[],
  ref: React.RefObject<HTMLElement>,
): void {
  const handler = useCallback(
    ({ code }: KeyboardEvent) => {
      if (keyCodes.includes(code)) {
        callback();
      }
    },
    [callback, keyCodes],
  );

  useEffect(() => {
    const element = ref.current;
    element?.addEventListener("keydown", handler);
    return () => {
      element?.removeEventListener("keydown", handler);
    };
  }, [ref, handler]);
}
