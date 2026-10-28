import { useEffect, useRef } from "react";

/**
 * A confirmation pop-up built on the browser's native <dialog> element.
 * The browser handles focus trapping and the dimmed backdrop for us.
 *
 * Props:
 *  - open: show or hide the dialog
 *  - title / message: the text to display
 *  - confirmLabel: text on the red confirm button
 *  - onConfirm / onCancel: what to do when the user chooses
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);

  // Keep the native dialog in sync with the "open" prop.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
      // Pressing Escape: let our own state close the dialog.
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      // Clicking the dimmed area outside the box also cancels.
      onClick={(event) => {
        if (event.target === dialogRef.current) onCancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-xl border border-line bg-surface p-0 text-ink shadow-lg backdrop:bg-ink/40"
    >
      <div className="p-5">
        <h2 id="confirm-dialog-title" className="text-lg font-semibold">
          {title}
        </h2>
        <p id="confirm-dialog-message" className="mt-2 break-words text-sm text-ink-soft">
          {message}
        </p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-field px-4 py-2 text-sm font-medium text-ink hover:bg-paper"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white hover:brightness-90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
