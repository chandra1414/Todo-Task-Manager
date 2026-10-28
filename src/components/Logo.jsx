import { APP_NAME } from "../config.js";
import { ListIcon } from "./Icons.jsx";

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-lg bg-brand text-white">
        <ListIcon className="size-5" />
      </span>
      <span className="text-xl font-semibold tracking-tight">{APP_NAME}</span>
    </div>
  );
}
