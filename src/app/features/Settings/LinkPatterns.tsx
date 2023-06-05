import { AddCircle } from "@mui/icons-material";
import { DialogContentText, TextField } from "@mui/material";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store/store";
import { Button } from "../../ui/Button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/HoverCard";
import { Support } from "../../ui/Support";
import { LinkPattern, patternsChanged } from "./slice";

export const LinkPatterns = () => {
  const dispatch = useAppDispatch();

  const storePatterns = useAppSelector(
    (state: RootState) => state.settings.patterns
  );

  const [patterns, setPatterns] = useState<LinkPattern[]>(
    structuredClone(storePatterns)
  );

  const arePatternsReadyToSave =
    patterns && JSON.stringify(patterns) !== JSON.stringify(storePatterns);

  const handleSave = () => {
    dispatch(patternsChanged(patterns));
  };

  const handleCancel = () => {
    setPatterns(structuredClone(storePatterns));
  };

  useEffect(() => {
    setPatterns(structuredClone(storePatterns));
  }, [storePatterns]);

  return (
    <>
      <DialogContentText>
        Patterns and urls for automatic link creation.
      </DialogContentText>
      <PatternList patterns={patterns} setPatterns={setPatterns} />
      <div className="mt-2 flex justify-end gap-2">
        {arePatternsReadyToSave && (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </>
        )}
      </div>
    </>
  );
};

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
                <Button
                  variant="ghost"
                  className="p-2 hover:bg-rose-50 hover:text-rose-500"
                  onClick={() => handleRemovePattern(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </>
          </div>
        ))}
      </div>

      <div className="mr-2 flex flex-row justify-between gap-[10px] pt-[10px]">
        <HoverCard>
          <HoverCardTrigger>
            <a href="#">
              <Support />
            </a>
          </HoverCardTrigger>
          <HoverCardContent>
            {/* TODO: finish instruction */}
            Here will be instruction with possible options.
          </HoverCardContent>
        </HoverCard>
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
