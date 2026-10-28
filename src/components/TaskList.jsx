import TaskItem from "./TaskItem.jsx";

function EmptyState({ title, children }) {
  return (
    <div className="mt-6 rounded-xl border border-dashed border-field px-6 py-12 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-ink-soft">{children}</p>
    </div>
  );
}

export default function TaskList({
  tasks,
  totalCount,
  filter,
  search,
  onToggle,
  onSave,
  onRequestDelete,
}) {
  // 1. The user has no tasks at all.
  if (totalCount === 0) {
    return (
      <EmptyState title="No tasks yet">
        Press New task above to add your first one. Everything you add is saved on
        this device automatically.
      </EmptyState>
    );
  }

  // 2. There are tasks, but none match the current search or filter.
  if (tasks.length === 0) {
    if (search.trim()) {
      return (
        <EmptyState title={`No tasks match "${search.trim()}"`}>
          Check the spelling, try a different word, or switch to All tasks.
        </EmptyState>
      );
    }
    if (filter === "active") {
      return (
        <EmptyState title="Nothing left to do">
          Every task is completed. Add a new one when you are ready.
        </EmptyState>
      );
    }
    return (
      <EmptyState title="No completed tasks yet">
        Check off a task and it will show up here.
      </EmptyState>
    );
  }

  // 3. Show the tasks.
  const noun = totalCount === 1 ? "task" : "tasks";
  const summary =
    tasks.length === totalCount
      ? `${totalCount} ${noun}`
      : `Showing ${tasks.length} of ${totalCount} ${noun}`;

  return (
    <>
      <ul className="divide-y divide-line border-b border-line">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onSave={onSave}
            onRequestDelete={onRequestDelete}
          />
        ))}
      </ul>
      <div className="flex items-center justify-between py-4 text-xs text-ink-soft">
        {/* aria-live lets screen readers announce the count when it changes */}
        <p aria-live="polite">{summary}</p>
        <p>Saved automatically</p>
      </div>
    </>
  );
}
