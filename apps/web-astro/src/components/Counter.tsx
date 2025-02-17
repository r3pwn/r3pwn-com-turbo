import { useState, type PropsWithChildren } from "react";

export default function Counter({
  children,
  count: initialCount,
}: {
  count: number;
} & PropsWithChildren) {
  const [count, setCount] = useState(initialCount);
  const add = () => setCount((i) => i + 1);
  const subtract = () => setCount((i) => i - 1);

  return (
    <>
      <div className="grid items-center">
        <button onClick={subtract}>-</button>
        <pre>{count}</pre>
        <button onClick={add}>+</button>
      </div>
      <div className="text-center">{children}</div>
    </>
  );
}
