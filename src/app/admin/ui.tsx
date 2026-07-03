"use client";

import { useFormStatus } from "react-dom";

// Submit button wired to the parent <form>: shows a pending state and, when
// `confirm` is set, asks the user before submitting (for destructive actions).
export function SubmitButton({
  children,
  className,
  style,
  confirm,
  pendingLabel = "…",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  confirm?: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      className={className}
      style={style}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
