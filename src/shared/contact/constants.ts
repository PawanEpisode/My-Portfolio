/**
 * Declarative config for each form field.
 * `row` drives which layout group the field belongs to in ContactForm.
 */
export const FORM_FIELDS = [
  {
    id: "name",
    label: "Your Name",
    type: "text",
    placeholder: "John Doe",
    required: true,
    row: "top",
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
    required: true,
    row: "top",
  },
  {
    id: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Project collaboration, freelance inquiry…",
    required: true,
    row: "subject",
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Tell me about your project…",
    required: true,
    multiline: true,
    rows: 6,
    row: "message",
  },
];
