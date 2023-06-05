import { DialogContentText } from "@mui/material";
import {
  AlertOctagon,
  Download,
  FileDown,
  FileUp,
  Radiation,
} from "lucide-react";
import { useAppDispatch } from "../../hooks";
import { clearAppState } from "../../store/commonActions";
import { Button } from "../../ui/Button";
import { Support } from "../../ui/Support";
import { downloadAppData } from "./slice";

export const ImportExport = () => {
  const dispatch = useAppDispatch();

  return (
    <>
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
                JSON file previously exported from the app. Only specific format
                will be recognized.
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
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">
              You are about to replace your data!
            </span>{" "}
            Confirm importing by holding the "Import" button. Your existing data
            will be lost and replaced by the new data. Existing 23 entries will
            be replaced by new 400.
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* TODO: implement support for importing/exporting data */}
          <a href="#">
            <Support />
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
        <div
          className="ml-6 flex items-center justify-between"
          onClick={() => dispatch(clearAppState())}
        >
          <div className="w-80 text-sm text-gray-700">
            Delete all data. This action cannot be undone.
          </div>
          <Button variant="outline">
            <AlertOctagon className="mr-2 h-4 w-4" />
            Clear data
          </Button>
        </div>
      </div>
    </>
  );
};
