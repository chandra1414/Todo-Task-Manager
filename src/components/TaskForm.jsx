import { useId, useRef, useState } from "react";

const TITLE_MAX_LENGTH = 120;
const DESCRIPTION_MAX_LENGTH = 500;

const fieldClasses =
  "block w-full rounded-lg border bg-white px-3 py-2 text-base text-ink placeholder:text-ink-soft sm:text-sm";

/**
 * One form used for both adding a new task and editing an existing one.
 *
 * Props:
 *  - onSubmit({ title, description }): called when the form is valid
 *  - onCancel: if given, a Cancel button (and the Escape key) is enabled
 *  - initialTitle / initialDescription: starting values (used when editing)
 *  - submitLabel: text on the main button
 *  - clearOnSubmit: empty the fields after submitting (true when adding)
 *  - autoFocus: focus the title field when the form appears
 */
export default function TaskForm({
  initialTitle = "",
  initialDescription = "",
  submitLabel = "Add task",
  clearOnSubmit = true,
  autoFocus = false,
  onSubmit,
  onCancel,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState("");
  const titleInputRef = useRef(null);

  // useId gives every form on the page its own unique ids,
  // so labels stay connected to the right inputs.
  const uid = useId();
  const titleId = `${uid}-title`;
  const errorId = `${uid}-error`;
  const descriptionId = `${uid}-description`;

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Please enter a title for this task.");
      titleInputRef.current.focus();
      return;
    }

    onSubmit({ title: cleanTitle, description: description.trim() });

    if (clearOnSubmit) {
      setTitle("");
      setDescription("");
      setError("");
      titleInputRef.current.focus();
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && onCancel) {
      onCancel();
    }
  }

  return (
    // noValidate turns off the browser's own pop-up messages so we can
    // show our own, clearer validation message instead.
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} noValidate className="space-y-4">
      <div>
        <label htmlFor={titleId} className="mb-1 block text-sm font-medium">
          Title
        </label>
        <input
          ref={titleInputRef}
          id={titleId}
          type="text"
          value={title}
          maxLength={TITLE_MAX_LENGTH}
          autoFocus={autoFocus}
          autoComplete="off"
          placeholder="What needs to be done?"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) setError("");
          }}
          className={`${fieldClasses} ${error ? "border-danger" : "border-field"}`}
        />
        {error && (
          <p id={errorId} role="alert" className="mt-1.5 text-sm text-danger">
            {error}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={descriptionId} className="mb-1 block text-sm font-medium">
          Description <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea
          id={descriptionId}
          value={description}
          maxLength={DESCRIPTION_MAX_LENGTH}
          rows={3}
          placeholder="Add any details you want to remember"
          onChange={(event) => setDescription(event.target.value)}
          className={`${fieldClasses} border-field`}
        />
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-field px-4 py-2 text-sm font-medium text-ink hover:bg-paper"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
