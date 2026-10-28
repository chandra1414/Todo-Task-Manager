import { AsteriskIcon, CheckIcon, ListIcon } from "./Icons.jsx";

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-line bg-chrome p-5">
      <div className="flex items-center gap-3 text-sm text-ink-soft">
        <span className="grid size-8 place-items-center rounded-lg bg-brand-tint text-brand">
          {icon}
        </span>
        {label}
      </div>
      <p className="mt-3 flex items-baseline gap-2 pl-11">
        <span className="text-3xl font-semibold tabular-nums">{value}</span>
        <span className="text-sm text-ink-soft">{value === 1 ? "task" : "tasks"}</span>
      </p>
    </div>
  );
}

// The short message in the third card changes with the state of the list.
function getMessage({ total, active }) {
  if (total === 0) {
    return { title: "Start small.", text: "Add one thing you want to finish today." };
  }
  if (active === 0) {
    return { title: "All clear.", text: "Everything on your list is done." };
  }
  return { title: "One thing at a time.", text: "You're doing just fine." };
}

export default function StatCards({ counts }) {
  const message = getMessage(counts);

  return (
    <section aria-label="Summary" className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
      <StatCard icon={<ListIcon className="size-4" />} label="To focus on" value={counts.active} />
      <StatCard icon={<CheckIcon className="size-4" />} label="Completed" value={counts.completed} />

      <div className="col-span-2 flex items-center gap-4 rounded-xl border border-line bg-sand p-5 sm:col-span-1">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-chrome text-ink-soft">
          <AsteriskIcon className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold">{message.title}</p>
          <p className="mt-0.5 text-sm text-ink-soft">{message.text}</p>
        </div>
      </div>
    </section>
  );
}
