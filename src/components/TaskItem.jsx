import { useId, useState } from "react";
import TaskForm from "./TaskForm.jsx";
import { CheckIcon, ClockIcon, PencilIcon, TrashIcon } from "./Icons.jsx";
import { formatAdded } from "../lib/formatAdded.js";

// "Added 4:45 PM" with a clock icon. The caller decides when it is visible.
function AddedLabel({ timestamp, className }) {
  if (!timestamp) return null;
  return (
    <span
      className={`items-center gap-1.5 text-xs text-ink-soft ${className}`}
      title={`Added ${new Date(timestamp).toLocaleString()}`}
    >
      <ClockIcon className="size-3.5" />
      <span className="sr-only">Added </span>
      {formatAdded(timestamp)}
    </span>
  );
}

export default function TaskItem({ task, onToggle, onSave, onRequestDelete }) {
  // Each task remembers on its own whether it is being edited.
  const [isEditing, setIsEditing] = useState(false);
  const titleId = useId();

  if (isEditing) {
    return (
      <li className="py-4">
        <div className="rounded-xl border border-line bg-chrome p-4 sm:p-5">
          <TaskForm
            initialTitle={task.title}
            initialDescription={task.description}
            submitLabel="Save changes"
            clearOnSubmit={false}
            autoFocus
            onSubmit={(values) => {
              onSave(task.id, values);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </li>
    );
  }

  return (
    <li className="task-row flex items-start gap-4 py-5">
      {/* A real checkbox (hidden visually) so keyboards and screen readers work,
          with a round circle drawn next to it. */}
      <label className="relative mt-0.5 shrink-0 cursor-pointer">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-labelledby={titleId}
          className="peer sr-only"
        />
        <span
          className={`grid size-6 place-items-center rounded-full border-2 text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand ${
            task.completed ? "border-brand bg-brand" : "border-field bg-transparent"
          }`}
        >
          {task.completed && <CheckIcon className="size-3.5" />}
        </span>
      </label>

      <div className="min-w-0 flex-1">
        <p
          id={titleId}
          className={`break-words text-[0.9375rem] font-semibold ${
            task.completed ? "text-ink-soft line-through" : "text-ink"
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="mt-1 whitespace-pre-line break-words text-sm text-ink-soft">
            {task.description}
          </p>
        )}
        {/* On phones the time sits under the text. */}
        <AddedLabel timestamp={task.createdAt} className="mt-2 flex sm:hidden" />
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {/* Edit and Delete. On computers with a mouse they appear when you hover
            or tab into the row (see .task-actions in index.css). */}
        <div className="task-actions flex items-center">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit task: ${task.title}`}
            title="Edit"
            className="grid size-8 place-items-center rounded-md text-ink-soft hover:bg-sand hover:text-ink"
          >
            <PencilIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onRequestDelete(task)}
            aria-label={`Delete task: ${task.title}`}
            title="Delete"
            className="grid size-8 place-items-center rounded-md text-ink-soft hover:bg-sand hover:text-danger"
          >
            <TrashIcon className="size-4" />
          </button>
        </div>
        <AddedLabel timestamp={task.createdAt} className="ml-2 hidden min-w-20 justify-end sm:inline-flex" />
      </div>
    </li>
  );
}
