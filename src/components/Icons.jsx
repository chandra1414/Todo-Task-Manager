// Small inline SVG icons. They take the text color of their parent
// (currentColor), so you can recolor them with Tailwind text-* classes.

function Icon({ className = "size-4", children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

export const ListIcon = (props) => (
  <Icon {...props}>
    <path d="M3.5 6.5l1.6 1.6 3-3.2M12 7h8.5M3.5 13h5M12 13h8.5M3.5 18.5h5M12 18.5h8.5" />
  </Icon>
);

export const PlusIcon = (props) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const CheckIcon = (props) => (
  <Icon {...props}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);

export const SearchIcon = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </Icon>
);

export const ClockIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Icon>
);

export const PencilIcon = (props) => (
  <Icon {...props}>
    <path d="M4 20l1.2-4.2L16.6 4.4a2 2 0 012.8 0l.2.2a2 2 0 010 2.8L8.2 18.8 4 20z" />
  </Icon>
);

export const TrashIcon = (props) => (
  <Icon {...props}>
    <path d="M4 7h16M9 7V5h6v2M6.5 7l.8 12a1 1 0 001 .9h7.4a1 1 0 001-.9l.8-12M10 11v5M14 11v5" />
  </Icon>
);

export const AsteriskIcon = (props) => (
  <Icon {...props}>
    <path d="M12 4v16M5 8l14 8M19 8L5 16" />
  </Icon>
);
