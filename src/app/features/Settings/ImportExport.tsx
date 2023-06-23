import { DialogContentText } from "@mui/material";
import {
  AlertOctagon,
  Download,
  FileDown,
  Radiation,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  BackupData,
  clearAppState,
  loadBackup,
} from "../../store/commonActions";
import { Button } from "../../ui/Button";
import { HoldButton } from "../../ui/HoldButton";
import { Support } from "../../ui/Support";
import { selectTimeEntriesCount } from "../TimeEntries/store";
import { DropZone } from "./DropZone";
import { downloadAppData } from "./slice";

export const ImportExport: React.FC<{ closeSettingsDialog: () => void }> = ({
  closeSettingsDialog,
}) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File>();
  const [importedData, setImportedData] = useState<BackupData>();
  const [importFileError, setImportFileError] = useState<boolean>(false);

  useEffect(() => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => setImportFileError(true);
    reader.onload = () => {
      const data = JSON.parse(reader.result as string);
      setImportedData(data);
    };

    if (file) {
      reader.readAsText(file);
    }
  }, [file]);

  const currentTimeEntriesCount = useAppSelector(selectTimeEntriesCount);

  return (
    <>
      <div>
        <DialogContentText>Manage data</DialogContentText>
        <div className="mt-2 flex items-center text-base">
          <Upload className="mr-2 h-4 w-4 stroke-2 text-gray-500" />
          <span className="font-semibold text-gray-800">Import data</span>
        </div>
        {file ? (
          <div className="mb-2 mt-2">
            <ImportWarningAlert
              newTimeEntriesCount={
                importedData ? importedData.timeEntries.ids.length : 0
              }
              currentTimeEntriesCount={currentTimeEntriesCount}
            />
            {importFileError && <ImportErrorAlert />}

            <div className="flex items-center justify-between">
              {/* TODO: implement support for importing/exporting data */}
              <a href="/#">
                <Support />
              </a>
              <div className="flex flex-row justify-end gap-[10px] pt-[10px]">
                <Button
                  variant="outline"
                  onClick={() => {
                    setFile(undefined);
                    setImportedData(undefined);
                    setImportFileError(false);
                  }}
                >
                  Discard
                </Button>
                {/* TODO: this button should be hold to action */}
                <Button
                  variant={"default"}
                  onClick={() => {
                    importedData && dispatch(loadBackup(importedData));
                    closeSettingsDialog();
                  }}
                >
                  Import
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <DropZone setFile={setFile} setError={setImportFileError} />
        )}
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
          <Button variant="outline" onClick={() => dispatch(downloadAppData())}>
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
          <HoldButton
            onSubmit={() => {
              dispatch(clearAppState());
              closeSettingsDialog();
            }}
            variant={"outline"}
          >
            <AlertOctagon className="mr-2 h-4 w-4" />
            Clear data
          </HoldButton>
        </div>
      </div>
    </>
  );
};

const ImportWarningAlert = ({
  currentTimeEntriesCount,
  newTimeEntriesCount,
}: {
  currentTimeEntriesCount: number;
  newTimeEntriesCount: number;
}) => (
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
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      ></path>
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium">You are about to replace your data!</span>{" "}
      Confirm importing by clicking the "Import" button. Your existing data will
      be lost and replaced by the new data. Existing {currentTimeEntriesCount}{" "}
      entries will be replaced by new {newTimeEntriesCount} entries.
    </div>
  </div>
);

const ImportErrorAlert = () => (
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
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      ></path>
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium">Error!!!!!</span> Error lol XD
    </div>
  </div>
);
