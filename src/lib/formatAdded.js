/**
 * Turns the time a task was added into a short label:
 *   added today      -> "4:45 PM"
 *   added yesterday  -> "Yesterday"
 *   added earlier    -> "Oct 25"
 */
export function formatAdded(timestamp) {
  if (!timestamp) return "";

  const added = new Date(timestamp);
  const now = new Date();

  // Compare calendar days (midnight to midnight), not 24-hour blocks.
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfAddedDay = new Date(added.getFullYear(), added.getMonth(), added.getDate());
  const daysAgo = Math.round((startOfToday - startOfAddedDay) / 86400000);

  if (daysAgo === 0) {
    return added.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }
  if (daysAgo === 1) return "Yesterday";
  return added.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
