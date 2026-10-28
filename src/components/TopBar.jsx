import Avatar from "./Avatar.jsx";
import Logo from "./Logo.jsx";

export default function TopBar() {
  return (
    <div className="flex h-[4.5rem] items-center justify-between border-b border-line bg-chrome px-5 md:px-12">
      {/* Phones show the logo here; larger screens show a breadcrumb. */}
      <div className="md:hidden">
        <Logo />
      </div>
      <nav aria-label="Breadcrumb" className="hidden text-sm md:block">
        <ol className="flex items-center gap-3 text-ink-soft">
          <li>Workspace</li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-ink">
            My tasks
          </li>
        </ol>
      </nav>

      <div className="flex items-center gap-4 text-sm text-ink-soft">
        <span className="hidden items-center gap-2 sm:flex">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
          Your day, at a glance
        </span>
        <Avatar />
      </div>
    </div>
  );
}
