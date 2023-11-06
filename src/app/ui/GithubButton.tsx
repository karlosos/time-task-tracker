import { GitHub as MuiGithubIcon } from "@mui/icons-material";

export const GithubButton = () => {
  return (
    <a
      href="https://github.com/karlosos/time-task-tracker"
      target="_blank"
      rel="noreferrer"
    >
      <button
        className="flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
        tabIndex={0}
      >
        <span>Star me on GitHub</span>
        <MuiGithubIcon fontSize="small" />
      </button>
    </a>
  );
};
