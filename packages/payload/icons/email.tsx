export default function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="TelegramIcon"
      style={{
        width: "1em",
        height: "1em",
        display: "inline-block",
        fill: "currentColor",
        flexShrink: 0,
        fontSize: "1.5rem",
      }}
    >
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"></path>
    </svg>
  );
}
