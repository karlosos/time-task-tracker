import {
  AddCircle,
  Delete,
  Settings as MuiSettingsIcon,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import {
  AlertOctagon,
  Download,
  FileDown,
  FileUp,
  HelpCircle,
  Radiation,
} from "lucide-react";
import { MouseEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store/store";
import { Button } from "../../ui/Button";
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

  // TODO: save patterns on change
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
        <div>
          <DialogContentText>Manage data</DialogContentText>
          <div className="mt-2 mb-2 flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="dark:hover:bg-bray-800 flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="mb-3 h-10 w-10 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  JSON file previously exported from the app. Only specific
                  format will be recognized.
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <div
            className="flex rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="mr-3 inline h-5 w-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">
                You are about to replace your data!
              </span>{" "}
              Confirm importing by holding the "Import" button. Your existing
              data will be lost and replaced by the new data. Existing 23
              entries will be replaced by new 400.
            </div>
          </div>

          <div className="flex items-center justify-between">
            <a href="#">
              <div className="flex items-center text-sm font-medium text-gray-400">
                <HelpCircle className="mr-1 h-4 w-4 stroke-[2px]" />
                Support
              </div>
            </a>

            <div className="flex flex-row justify-end gap-[10px] pt-[10px]">
              <Button variant="outline">Discard</Button>
              {/* TODO: this button should be hold to action */}
              <Button variant={"default"}>Import</Button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center text-base">
            <Download className="mr-2 h-4 w-4 stroke-2 text-gray-500" />
            <span className="font-semibold text-gray-800">Export data</span>
          </div>
          <div className="ml-6 flex items-center justify-between">
            <div className="w-80 text-sm text-gray-700">
              Exported data can be later imported or read manually. Data is
              exported in JSON format.
            </div>
            <Button variant="outline">
              <FileDown className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center text-base">
            <Radiation className="mr-2 h-4 w-4 stroke-2 text-gray-500" />
            <span className="font-semibold text-gray-800">Clear data</span>
          </div>
          <div className="ml-6 flex items-center justify-between">
            <div className="w-80 text-sm text-gray-700">
              Delete all data. This action cannot be undone.
            </div>
            <Button variant="outline">
              <AlertOctagon className="mr-2 h-4 w-4" />
              Clear data
            </Button>
          </div>
        </div>
      </DialogContent>
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
