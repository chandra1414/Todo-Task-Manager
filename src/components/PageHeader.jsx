import { PlusIcon } from "./Icons.jsx";

export default function PageHeader({ onNewTask, isFormOpen }) {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm text-ink-soft">{today}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-[2.5rem]">
          <span className="block">Make room for</span>
          <span className="block">what matters.</span>
        </h1>
        <p className="mt-4 text-ink-soft">
          A little progress adds up. Here&rsquo;s your list for today.
        </p>
      </div>

      <button
        id="new-task-button"
        type="button"
        onClick={onNewTask}
        aria-expanded={isFormOpen}
        aria-controls="new-task-panel"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        <PlusIcon className="size-4" />
        New task
      </button>
    </div>
  );
}
