import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export type SubmitButtonStatus = "idle" | "loading" | "success" | "error";

const STATES = {
  idle: {
    icon: Send,
    label: "Send Message",
    className: "btn-primary w-full justify-center py-3",
  },
  loading: {
    icon: Loader2,
    label: "Sending…",
    className: "btn-primary w-full cursor-not-allowed justify-center py-3 opacity-70",
  },
  success: {
    icon: CheckCircle,
    label: "Message sent!",
    className:
      "inline-flex w-full cursor-default items-center justify-center gap-2 rounded-lg border border-accent-cyan bg-cyan-400/10 px-6 py-3 text-[0.9375rem] font-semibold text-accent-cyan transition-[opacity,transform,box-shadow] duration-200",
  },
  error: {
    icon: AlertCircle,
    label: "Failed — try again",
    className:
      "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-accent-pink bg-pink-400/10 px-6 py-3 text-[0.9375rem] font-semibold text-accent-pink transition-[opacity,transform,box-shadow] duration-200",
  },
};

export default function SubmitButton({
  status = "idle",
}: {
  status?: SubmitButtonStatus;
}) {
  const { icon: Icon, label, className } = STATES[status];
  const spin = status === "loading";

  return (
    <button
      type="submit"
      disabled={status === "loading" || status === "success"}
      className={className}
    >
      <Icon size={17} className={spin ? "animate-spin" : undefined} />
      {label}
    </button>
  );
}
