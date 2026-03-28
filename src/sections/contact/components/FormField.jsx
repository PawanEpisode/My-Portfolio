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
  const baseStyle = {
    width: "100%",
    background: "var(--surface)",
    border: `1px solid ${error ? "var(--accent-pink)" : "var(--border)"}`,
    borderRadius: "0.5rem",
    color: "var(--text-primary)",
    fontSize: "0.9375rem",
    padding: "0.75rem 1rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    resize: multiline ? "vertical" : undefined,
    fontFamily: "inherit",
  };

  const focusStyle = {
    borderColor: "var(--accent-indigo)",
    boxShadow: "0 0 0 3px var(--glow-indigo)",
  };

  const handleFocus = (e) => Object.assign(e.target.style, focusStyle);
  const handleBlur = (e) => {
    e.target.style.borderColor = error ? "var(--accent-pink)" : "var(--border)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--accent-pink)", marginLeft: "0.25rem" }}>
            *
          </span>
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
          style={baseStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
          style={baseStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {error && (
        <p className="text-xs" style={{ color: "var(--accent-pink)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
