import { useState } from "react";

export function useDateFilter() {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  return {
    start,
    end,
    setStart,
    setEnd,
  };
}