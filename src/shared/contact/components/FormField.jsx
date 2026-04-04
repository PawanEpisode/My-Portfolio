/**
 * Reusable labeled form field — renders either an <input> or <textarea>.
 * Applies the portfolio's CSS design tokens for consistent look and feel.
 */
export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  multiline = false,
  rows = 5,
  required = false,
}) {
  const fieldClassName = [
    "w-full rounded-lg border px-4 py-3 text-[0.9375rem] text-foreground outline-none transition-[border-color,box-shadow] duration-200",
    "bg-surface font-[inherit]",
    "focus:border-accent-indigo focus:shadow-focus",
    error ? "border-accent-pink" : "border-border",
    multiline ? "resize-y" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-widest text-muted"
      >
        {label}
        {required && (
          <span className="ml-1 text-accent-pink">*</span>
        )}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          className={fieldClassName}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={fieldClassName}
        />
      )}

      {error && (
        <p className="text-xs text-accent-pink">{error}</p>
      )}
    </div>
  );
}
