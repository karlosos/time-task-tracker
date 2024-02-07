import { FileUp } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "../../lib/utils";

type Props = {
  setFile: (file: File) => void;
  setError: (isError: boolean) => void;
};

export const DropZone: React.FC<Props> = ({ setFile, setError }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    [setFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    maxFiles: 1,
  });

  return (
    <div
      className="mb-2 mt-2 flex w-full items-center justify-center"
      {...getRootProps()}
    >
      <label
        htmlFor="dropzone-file"
        className={cn(
          "dark:hover:bg-bray-800 flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600",
          isDragActive ? "border-sky-500" : "",
        )}
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <FileUp className="mb-3 h-10 w-10 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            JSON file previously exported from the app. Only specific format
            will be recognized.
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          {...getInputProps()}
        />
      </label>
    </div>
  );
};
