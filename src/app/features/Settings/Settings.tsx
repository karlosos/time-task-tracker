import {
  AddCircle,
  Delete,
  Settings as MuiSettingsIcon,
  WarningRounded,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { MouseEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store/store";
import { LinkPattern, patternsChanged } from "./slice";

export const Settings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="absolute right-2 top-4 max-mobile:static max-mobile:mx-auto max-mobile:-mb-2 max-mobile:flex max-mobile:max-w-screen-sm max-mobile:justify-end max-mobile:px-2 max-mobile:pt-2">
        <SettingsIcon onClick={() => setIsDialogOpen(true)} />
      </div>

      {isDialogOpen && (
        <SettingsDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
    </>
  );
};

export const SettingsIcon = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
      tabIndex={0}
    >
      <span>Settings</span>
      <MuiSettingsIcon fontSize="small" />
    </button>
  );
};

function SettingsDialog({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: any;
}) {
  const dispatch = useAppDispatch();

  const storePatterns = useAppSelector(
    (state: RootState) => state.settings.patterns
  );

  const handleSaveSettings = () => {
    dispatch(patternsChanged(patterns));
    setIsDialogOpen(false);
  };

  const [patterns, setPatterns] = useState<LinkPattern[]>(
    structuredClone(storePatterns)
  );

  useEffect(() => {
    setPatterns(structuredClone(storePatterns));
  }, [storePatterns]);

  return (
    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Patterns and urls for automatic link creation.
        </DialogContentText>
        <PatternList patterns={patterns} setPatterns={setPatterns} />
        <hr className="my-4" />
        <DialogContentText>Import & Export your data</DialogContentText>
        <div className="mt-2 rounded border-2 border-yellow-200 bg-yellow-100 px-4 py-2">
          <WarningRounded className="text-lg text-yellow-800" /> To be
          implemented.
        </div>
      </DialogContent>
      <div className="mx-6 mb-6 flex flex-row justify-end gap-[10px] pt-[10px]">
        <button
          onClick={() => setIsDialogOpen(false)}
          className="rounded border-2 border-blue-600 bg-white px-3 py-1.5 font-medium text-blue-600 hover:border-blue-800 hover:text-blue-800"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveSettings}
          className="rounded bg-blue-600 px-3 py-1.5 font-medium text-white hover:bg-blue-800"
        >
          Save
        </button>
      </div>
    </Dialog>
  );
}

type PatternListProps = {
  patterns: LinkPattern[];
  setPatterns: (patterns: LinkPattern[]) => void;
};

const PatternList = ({ patterns, setPatterns }: PatternListProps) => {
  const handleChangeUrl = (index: number, url: string) => {
    const newPatterns = patterns.slice();
    newPatterns[index].url = url;
    setPatterns(newPatterns);
  };

  const handleChangeRegex = (index: number, regex: string) => {
    const newPatterns = patterns.slice();
    newPatterns[index].regex = regex;
    setPatterns(newPatterns);
  };

  const handleRemovePattern = (index: number) => {
    const newPatterns = patterns.filter((_, i) => i !== index);
    setPatterns(newPatterns);
  };

  return (
    <>
      <div className="mt-2 flex flex-col">
        {patterns.map((pattern, index) => (
          <div className="flex gap-2" key={index}>
            <>
              <TextField
                label="Pattern"
                margin="dense"
                value={pattern.regex}
                onChange={(e) => handleChangeRegex(index, e.target.value)}
                className="w-40"
              />
              <TextField
                label="URL"
                margin="dense"
                value={pattern.url}
                onChange={(e) => handleChangeUrl(index, e.target.value)}
                className="flex-grow"
              />
              <div className="flex items-center justify-center">
                <IconButton onClick={() => handleRemovePattern(index)}>
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            </>
          </div>
        ))}
      </div>

      <div className="mr-2 flex flex-row justify-end gap-[10px] pt-[10px]">
        <button
          onClick={() => setPatterns([...patterns, { regex: "", url: "" }])}
          className="flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
        >
          <span className="flex justify-center text-sm">
            <AddCircle fontSize="inherit" />
          </span>{" "}
          Add new pattern
        </button>
      </div>
    </>
  );
};
