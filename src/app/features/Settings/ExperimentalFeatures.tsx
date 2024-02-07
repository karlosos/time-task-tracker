import { DialogContentText } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store/store";
import { Switch } from "../../ui/Switch";
import { setAdjustableTimeReporting } from "./slice";

export const ExperimentalFeatures = () => {
  const dispatch = useAppDispatch();
  const isAdjustableTimeReportingEnabled = useAppSelector(
    (state: RootState) =>
      state.settings.featureFlags.isAdjustableTimeReportingEnabled,
  );

  return (
    <>
      <DialogContentText>Experimental features</DialogContentText>
      <div className="mt-2 flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <div className="font-medium">Adjustable time reporting</div>
          <div className="text-[#666666]">
            Accommodating situations where the officially reported time may
            differ from the actual time spend on a task.
          </div>
        </div>
        <Switch
          checked={isAdjustableTimeReportingEnabled}
          onCheckedChange={(checked) =>
            dispatch(setAdjustableTimeReporting(checked))
          }
          className="h-5 w-9"
        />
      </div>
    </>
  );
};
