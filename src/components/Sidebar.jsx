import Avatar from "./Avatar.jsx";
import Logo from "./Logo.jsx";
import { ListIcon } from "./Icons.jsx";

// Left sidebar. It is hidden on phones (the top bar shows the logo instead).
export default function Sidebar({ activeCount }) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-sidebar md:sticky md:top-0 md:flex md:h-screen">
      <div className="px-7 pt-8">
        <Logo />
      </div>

      <nav aria-label="Main" className="mt-10 px-4">
        <p className="px-3 text-[0.6875rem] font-semibold uppercase tracking-widest text-ink-soft">
          Your workspace
        </p>
        <a
          href="#tasks"
          aria-current="page"
          className="mt-3 flex items-center justify-between rounded-lg bg-chrome px-3 py-2.5 text-sm font-medium"
        >
          <span className="flex items-center gap-3">
            <ListIcon className="size-4 text-ink-soft" />
            My tasks
          </span>
          <span className="text-sm tabular-nums text-ink-soft">
            <span className="sr-only">{activeCount} active tasks</span>
            <span aria-hidden="true">{activeCount}</span>
          </span>
        </a>
      </nav>

      <div className="mt-auto border-t border-line p-5">
        <div className="flex items-center gap-3">
          <Avatar />
          <div>
            <p className="text-sm font-semibold">My workspace</p>
            <p className="text-xs text-ink-soft">Saved on this device</p>
          </div>
        </div>
      </div>
    </aside>
  );
}