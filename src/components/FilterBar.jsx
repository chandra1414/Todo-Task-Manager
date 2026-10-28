import { SearchIcon } from "./Icons.jsx";

// "id" is the value the app uses internally; "label" is what the user sees.
const TABS = [
  { id: "all", label: "All tasks" },
  { id: "active", label: "In progress" },
  { id: "completed", label: "Completed" },
];

export default function FilterBar({ filter, onFilterChange, search, onSearchChange, counts }) {
  const countFor = { all: counts.total, active: counts.active, completed: counts.completed };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:border-b sm:border-line">
      <div
        role="group"
        aria-label="Filter tasks by status"
        className="flex gap-6 overflow-x-auto border-b border-line sm:border-b-0"
      >
        {TABS.map((tab) => {
          const isSelected = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onFilterChange(tab.id)}
              // -mb-px lets the green underline sit on top of the grey divider line.
              className={`-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 pb-4 pt-2 text-sm ${
                isSelected
                  ? "border-brand font-semibold text-ink"
                  : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              {tab.label}
              <span className="text-xs tabular-nums text-ink-soft">{countFor[tab.id]}</span>
            </button>
          );
        })}
      </div>

      <div className="relative sm:mb-3 sm:w-64">
        <label htmlFor="task-search" className="sr-only">
          Find a task by title
        </label>
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
        <input
          id="task-search"
          type="search"
          value={search}
          autoComplete="off"
          placeholder="Find a task"
          onChange={(event) => onSearchChange(event.target.value)}
          className="block w-full rounded-lg border border-field bg-chrome py-2.5 pl-9 pr-3 text-base text-ink placeholder:text-ink-soft sm:text-sm"
        />
      </div>
    </div>
  );
}
