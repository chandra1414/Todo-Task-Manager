import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { APP_NAME } from "./config.js";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import PageHeader from "./components/PageHeader.jsx";
import StatCards from "./components/StatCards.jsx";
import TaskForm from "./components/TaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";
import ConfirmDialog from "./components/ConfirmDialog.jsx";

// The name under which tasks are stored in the browser.
const STORAGE_KEY = "task-manager.tasks";

// Makes a unique id for each new task.
function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Tasks shown the very first time the app opens.
// After that, the app uses whatever is saved in the browser.
function createSampleTasks() {
  const now = Date.now();
  const hour = 60 * 60 * 1000;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(18, 0, 0, 0);

  return [
    {
      id: createId(),
      title: "Review the project proposal",
      description: "Add final notes before sharing it with the team.",
      completed: false,
      createdAt: now - 1 * hour,
    },
    {
      id: createId(),
      title: "Pick up groceries",
      description: "Oat milk, lemons, fresh basil",
      completed: false,
      createdAt: now - 2 * hour,
    },
    {
      id: createId(),
      title: "Send invoice to Maya",
      description: "",
      completed: true,
      createdAt: yesterday.getTime(),
    },
  ];
}

const SAMPLE_TASKS = createSampleTasks();

export default function App() {
  // ---- State: the data the app remembers -------------------------------
  // useLocalStorage works like useState, but also saves to the browser,
  // so the tasks are still here after a refresh or after restarting the app.
  const [savedTasks, setTasks] = useLocalStorage(STORAGE_KEY, SAMPLE_TASKS);
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false); // the "New task" form
  const [taskToDelete, setTaskToDelete] = useState(null); // the task awaiting confirmation

  // If the saved data was damaged somehow, fall back to an empty list.
  const tasks = Array.isArray(savedTasks) ? savedTasks : [];

  // ---- Derived values: calculated from the state above -----------------
  const completedCount = tasks.filter((task) => task.completed).length;
  const counts = {
    total: tasks.length,
    active: tasks.length - completedCount,
    completed: completedCount,
  };

  const query = search.trim().toLowerCase();
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;
    if (query && !task.title.toLowerCase().includes(query)) return false;
    return true;
  });

  // ---- Actions: the ways the user can change the data ------------------
  function closeForm() {
    setIsFormOpen(false);
    // Put keyboard focus back on the "New task" button.
    document.getElementById("new-task-button")?.focus();
  }

  function addTask({ title, description }) {
    const newTask = {
      id: createId(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    // Newest first. Also clear the filter and search so the new task is visible.
    setTasks([newTask, ...tasks]);
    setFilter("all");
    setSearch("");
    closeForm();
  }

  function saveTask(id, { title, description }) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, title, description } : task)));
  }

  function toggleTask(id) {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  function confirmDelete() {
    setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    setTaskToDelete(null);
  }

  // ---- What appears on screen -------------------------------------------
  return (
    <div className="flex min-h-screen">
      <Sidebar activeCount={counts.active} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        <main id="tasks" className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8 md:py-16">
          <PageHeader isFormOpen={isFormOpen} onNewTask={() => setIsFormOpen(!isFormOpen)} />

          {isFormOpen && (
            <section
              id="new-task-panel"
              aria-labelledby="new-task-heading"
              className="mt-8 rounded-xl border border-line bg-chrome p-5 sm:p-6"
            >
              <h2 id="new-task-heading" className="mb-4 text-base font-semibold">
                New task
              </h2>
              <TaskForm autoFocus onSubmit={addTask} onCancel={closeForm} />
            </section>
          )}

          <StatCards counts={counts} />

          <section aria-labelledby="task-list-heading" className="mt-10">
            <h2 id="task-list-heading" className="sr-only">
              Your tasks
            </h2>
            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              search={search}
              onSearchChange={setSearch}
              counts={counts}
            />
            <TaskList
              tasks={visibleTasks}
              totalCount={counts.total}
              filter={filter}
              search={search}
              onToggle={toggleTask}
              onSave={saveTask}
              onRequestDelete={setTaskToDelete}
            />
          </section>
        </main>

        <footer className="flex items-center justify-between border-t border-line bg-chrome px-5 py-5 text-xs text-ink-soft md:px-12">
          <p>Keep it simple. Keep going.</p>
          <p className="uppercase tracking-widest">{APP_NAME} &middot; Personal tasks</p>
        </footer>
      </div>

      <ConfirmDialog
        open={taskToDelete !== null}
        title="Delete this task?"
        message={taskToDelete ? `"${taskToDelete.title}" will be permanently removed. This can't be undone.` : ""}
        confirmLabel="Delete task"
        onConfirm={confirmDelete}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
}