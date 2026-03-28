import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const STATES = {
  idle: {
    icon: Send,
    label: "Send Message",
    className: "btn-primary",
    style: {},
  },
  loading: {
    icon: Loader2,
    label: "Sending…",
    className: "btn-primary",
    style: { opacity: 0.7, cursor: "not-allowed" },
    spin: true,
  },
  success: {
    icon: CheckCircle,
    label: "Message sent!",
    className: null,
    style: {
      background: "rgba(34,211,238,0.12)",
      border: "1px solid var(--accent-cyan)",
      color: "var(--accent-cyan)",
    },
  },
  error: {
    icon: AlertCircle,
    label: "Failed — try again",
    className: null,
    style: {
      background: "rgba(244,114,182,0.12)",
      border: "1px solid var(--accent-pink)",
      color: "var(--accent-pink)",
    },
  },
};

export default function SubmitButton({ status = "idle" }) {
  const { icon: Icon, label, className, style, spin } = STATES[status] ?? STATES.idle;

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    width: "100%",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    fontSize: "0.9375rem",
    fontWeight: 600,
    transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
    cursor: status === "loading" ? "not-allowed" : "pointer",
    ...style,
  };

  return (
    <button
      type="submit"
      disabled={status === "loading" || status === "success"}
      className={className ?? ""}
      style={baseStyle}
    >
      <Icon
        size={17}
        style={spin ? { animation: "spin 1s linear infinite" } : undefined}
      />
      {label}
    </button>
  );
}
