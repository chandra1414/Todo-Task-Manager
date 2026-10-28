# Daymark: a simple task manager

A small, practical to-do app built with React, Vite, and Tailwind CSS. You can add, edit, delete, search, and filter tasks, and everything is saved in your browser, so your tasks are still there after a refresh or after you stop and restart the app. There is no backend, login, or database.

## What you need first

You only need **Node.js**, which is the program that runs the development tools on your computer. npm (the package installer) comes with it.

1. Open a terminal (Terminal on Mac/Linux, PowerShell or Command Prompt on Windows).
2. Check if Node.js is already installed:

   ```bash
   node -v
   ```

   You need version **20.19 or newer** (22.12 or newer also works). If you see "command not found" or an older number, download the **LTS** version from <https://nodejs.org> and install it, then open a new terminal window.

## What is Vite?

Vite is the tool that runs your React code while you work. When you start it, it gives you a local web address, and the page refreshes by itself every time you save a file. You do not need to configure it: `vite.config.js` is already set up.

## Install

1. Unzip the project and open a terminal **inside the `task-manager` folder**. (In VS Code: File > Open Folder, then Terminal > New Terminal.)
2. Install the packages the project depends on:

   ```bash
   npm install
   ```

   This creates a `node_modules` folder. It can take a minute. You only need to do this once.

## Run the app

```bash
npm run dev
```

The app opens in your browser at **http://localhost:5300**. Leave the terminal running while you use the app. Press `Ctrl + C` in the terminal to stop it. To start it again later, just run `npm run dev` again.

## Check that your tasks are saved

1. Run the app and click **New task**. Add a task or two.
2. Press `Ctrl + C` in the terminal to stop the app, then close the browser tab.
3. Run `npm run dev` again. Your tasks are still there.

## Build for production (optional)

```bash
npm run build     # creates an optimized copy in the "dist" folder
npm run preview   # serves that copy locally so you can check it
```

Note: `npm run preview` uses a different address, so it has its own separate saved tasks.

## What the app does

- **New task** opens a form: a required title and an optional description, with a clear message if the title is empty.
- Click the circle to mark a task complete or pending.
- Hover a task (or tab to it) to see **Edit** and **Delete**. Delete asks for confirmation first.
- Tabs filter by **All tasks**, **In progress**, and **Completed**.
- **Find a task** searches by title.
- The cards at the top show how many tasks are left, how many are completed, and the tab counts show the total.
- The time on each task is when you added it.

## Where things are

```
task-manager/
  index.html                 The single HTML page. React fills in <div id="root">.
  package.json               Project name, scripts, and list of packages.
  vite.config.js             Vite setup (React + Tailwind plugins, fixed port).
  public/favicon.svg         The small icon in the browser tab.
  src/
    main.jsx                 Starts React and loads the app.
    App.jsx                  THE MAIN APP: holds the tasks and all the actions.
    index.css                STYLING: Tailwind import, colors, and base styles.
    config.js                App name and the letter shown in the avatar.
    hooks/
      useLocalStorage.js     Saves and loads data from the browser.
    lib/
      formatAdded.js         Turns a timestamp into "4:45 PM" / "Yesterday" / "Oct 25".
    components/
      Sidebar.jsx            Left sidebar (hidden on phones).
      TopBar.jsx             Breadcrumb and avatar along the top.
      PageHeader.jsx         Date, heading, and the New task button.
      StatCards.jsx          The three summary cards.
      TaskForm.jsx           The form used for both adding and editing.
      FilterBar.jsx          Tabs and the search box.
      TaskList.jsx           The list, plus all the empty-state messages.
      TaskItem.jsx           One task: checkbox, text, time, Edit and Delete.
      ConfirmDialog.jsx      The "Delete this task?" pop-up.
      Logo.jsx, Avatar.jsx, Icons.jsx   Small visual pieces.
```

Styling is done with Tailwind class names written directly on the elements (for example `rounded-lg border px-4 py-2`). The colors are defined once in `src/index.css` under `@theme`. Change them there to re-theme the whole app. To change the app name or the avatar letter, edit `src/config.js`.

## How saving works

Tasks are stored in your browser's localStorage under the key `task-manager.tasks`. Every change (add, edit, tick, delete) is written there immediately. That means:

- They survive refreshes, closing the tab, and stopping and restarting `npm run dev`.
- Browsers keep saved data **per web address**. That is why this app always runs on the same address, `http://localhost:5300`. If you open the app from a different address, it will look empty because that address has its own storage.
- They stay on this browser and this computer. A different browser or device will start empty.
- Clearing your browser's site data removes them.

To wipe everything manually: open your browser's developer tools, go to **Application** (Chrome/Edge) or **Storage** (Firefox), find **Local Storage** for `localhost:5300`, and delete the `task-manager.tasks` entry.

## Troubleshooting

- **`npm: command not found`**: Node.js is not installed, or the terminal was opened before installing. Install Node.js and open a new terminal.
- **Errors mentioning the Node version**: update Node.js to the current LTS release.
- **`Port 5300 is already in use`**: the app is already running in another terminal window. Find that window and press `Ctrl + C`, then try again.
- **The page is blank or unstyled**: make sure you ran `npm install` first, and that the terminal running `npm run dev` shows no errors.
- **Your tasks disappeared**: check the address bar. It must be exactly `localhost:5300`, in the same browser you used before.
