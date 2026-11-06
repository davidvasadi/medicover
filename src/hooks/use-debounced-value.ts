import { useEffect, useState } from "react";

// updates only after the user stops typing for `delay` ms
export function useDebouncedValue<Value>(value: Value, delay = 300): Value {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
