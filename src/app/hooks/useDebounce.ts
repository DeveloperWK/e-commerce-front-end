import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the specified delay
    const timer = setTimeout(() => setDebounced(value), delay);

    // Cleanup function to clear the timer when the component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [value, delay]); // Re-run the effect when `value` or `delay` changes

  return debounced;
}
