import { useState, useCallback, type ChangeEvent, type FormEvent } from "react";
import { submitContact } from "../../lib/contact";
import { FORM_FIELDS } from "../constants";
import { cn } from "../../utils/cn";
import FormField from "./FormField";
import SubmitButton, { type SubmitButtonStatus } from "./SubmitButton";
import ContactLinks from "./ContactLinks";

const INITIAL_VALUES = { name: "", email: "", subject: "", message: "" };
const INITIAL_ERRORS = { name: "", email: "", subject: "", message: "" };

type FormValues = typeof INITIAL_VALUES;
type FieldKey = keyof FormValues;

function validate(values: FormValues): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!/^[^@]+@[^@]+\.[^@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.subject.trim() || values.subject.trim().length < 5) {
    errors.subject = "Subject must be at least 5 characters.";
  }

  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export default function ContactForm({
  person,
  social,
  className,
  /** `solid` avoids backdrop-blur so fixed noise / gradients do not smudge behind the card. */
  surface = "glass",
}: {
  person: { email: string };
  social: { github: string; linkedin: string };
  className?: string;
  surface?: "glass" | "solid";
}) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [status, setStatus] = useState<SubmitButtonStatus>("idle");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => {
        if (prev[name as FieldKey]) {
          return { ...prev, [name as FieldKey]: "" };
        }
        return prev;
      });
    },
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldErrors = validate(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors({ ...INITIAL_ERRORS, ...fieldErrors });
      return;
    }

    setStatus("loading");
    try {
      await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
      setValues(INITIAL_VALUES);
      setErrors(INITIAL_ERRORS);
    } catch {
      setStatus("error");
      // Auto-reset error state after 4 s so the user can retry
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border p-4 sm:p-8",
        surface === "glass" && "glass",
        surface === "solid" &&
          "bg-bg-secondary shadow-sm dark:bg-surface dark:shadow-black/20",
        className
      )}
    >
      <form onSubmit={handleSubmit} noValidate>
        {/* Name + Email row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {FORM_FIELDS.filter((f) => f.row === "top").map((field) => (
            <FormField
              key={field.id}
              {...field}
              value={values[field.id]}
              onChange={handleChange}
              error={errors[field.id]}
            />
          ))}
        </div>

        {/* Subject */}
        {FORM_FIELDS.filter((f) => f.row === "subject").map((field) => (
          <div key={field.id} className="mb-5">
            <FormField
              {...field}
              value={values[field.id]}
              onChange={handleChange}
              error={errors[field.id]}
            />
          </div>
        ))}

        {/* Message */}
        {FORM_FIELDS.filter((f) => f.row === "message").map((field) => (
          <div key={field.id} className="mb-6">
            <FormField
              {...field}
              value={values[field.id]}
              onChange={handleChange}
              error={errors[field.id]}
            />
          </div>
        ))}

        <SubmitButton status={status} />
      </form>

      <ContactLinks person={person} social={social} />
    </div>
  );
}
