// import { useState, useEffect } from "react";

// export function usePersistentState<T>(
//   key: string,
//   defaultValue: T
// ): [T, (value: T) => void] {
//   const [state, setState] = useState<T>(() => {
//     if (typeof window === "undefined") return defaultValue;

//     try {
//       const stored = localStorage.getItem(key);
//       return stored ? JSON.parse(stored) : defaultValue;
//     } catch {
//       return defaultValue;
//     }
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       try {
//         localStorage.setItem(key, JSON.stringify(state));
//       } catch {}
//     }
//   }, [key, state]);

//   return [state, setState];
// }
