import { Settings as MuiSettingsIcon } from "@mui/icons-material";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../ui/Dialog";
import { ImportExport } from "./ImportExport";
import { LinkPatterns } from "./LinkPatterns";

export const Settings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="absolute right-2 top-4 max-mobile:static max-mobile:mx-auto max-mobile:-mb-2 max-mobile:flex max-mobile:max-w-screen-sm max-mobile:justify-end max-mobile:px-2 max-mobile:pt-2">
            <SettingsButton />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Settings</DialogTitle>
          <div>
            <LinkPatterns />
            <hr className="my-4" />
            <ImportExport />
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
