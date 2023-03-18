import {
  AddCircle,
  Delete,
  Save,
  Settings as MuiSettingsIcon,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
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
      <div className="absolute right-2 top-4 ">
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
      className="flex cursor-pointer items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700 hover:text-neutral-900"
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
  };

  const [patterns, setPatterns] = useState<LinkPattern[]>(structuredClone(storePatterns));

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
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setIsDialogOpen(false)}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveSettings}
          startIcon={<Save />}
          aria-label="Confirm save"
        >
          Save changes
        </Button>
      </DialogActions>
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
    // This changes state directly
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
      <div className="flex flex-col">
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
                  <Delete />
                </IconButton>
              </div>
            </>
          </div>
        ))}
      </div>
      <Button
        onClick={() => setPatterns([...patterns, { regex: "", url: "" }])}
      >
        <AddCircle /> Add new pattern
      </Button>
    </>
  );
};
