import { PROFILE_INITIAL } from "../config.js";

export default function Avatar() {
  return (
    <span
      aria-hidden="true"
      className="grid size-9 shrink-0 place-items-center rounded-full bg-avatar text-sm font-semibold text-ink"
    >
      {PROFILE_INITIAL}
    </span>
  );
}
