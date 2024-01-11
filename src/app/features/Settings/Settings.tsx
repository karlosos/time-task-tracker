import { Settings as MuiSettingsIcon } from "@mui/icons-material";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/Dialog";
import { ExperimentalFeatures } from "./ExperimentalFeatures";
import { ImportExport } from "./ImportExport";
import { LinkPatterns } from "./LinkPatterns";

export const Settings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <SettingsButton />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Settings</DialogTitle>
          <div>
            <LinkPatterns />
            <hr className="my-4" />
            <ExperimentalFeatures />
            <hr className="my-4" />
            <ImportExport closeSettingsDialog={() => setIsDialogOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const SettingsButton = () => {
  return (
    <button
      className="flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
      tabIndex={0}
    >
      <span>Settings</span>
      <MuiSettingsIcon fontSize="small" />
    </button>
  );
};
