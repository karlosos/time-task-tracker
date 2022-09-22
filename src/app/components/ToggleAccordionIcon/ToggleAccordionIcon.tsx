export const ToggleAccordionIcon = ({
  onClick,
  isCollapsed,
}: {
  onClick: () => void;
  isCollapsed: boolean;
}) => {
  return (
    <div
      aria-label="Combined entry accordion"
      onClick={onClick}
      className="bg-neutral-50 border border-neutral-300 hover:bg-neutral-200 rounded w-6 h-6 flex items-center justify-center hover:cursor-pointer select-none"
    >
      <svg
        className={
          "transition duration-200 " + (isCollapsed ? "rotate-180" : "")
        }
        width="10"
        height="12"
        viewBox="0 0 10 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5.3333L8.75 6.66664L5.00001 2.66663L1.25 6.66666L0 5.33333L4.99998 0L10 5.3333Z"
          fill="#363942"
        />
        <path
          d="M10 10.6666L8.75 12L5.00001 7.99997L1.25 12L0 10.6667L4.99998 5.33334L10 10.6666Z"
          fill="#363942"
        />
      </svg>
    </div>
  );
};
