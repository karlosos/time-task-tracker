import { DialogContentText } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RootState } from "../../store/store";
import { Switch } from "../../ui/Switch";
import { setAdjustableTimeReporting, setTagPillsVisibility } from "./slice";

export const ExperimentalFeatures = () => {
  const dispatch = useAppDispatch();
  const isAdjustableTimeReportingEnabled = useAppSelector(
    (state: RootState) =>
      state.settings.featureFlags.isAdjustableTimeReportingEnabled,
  );
  const areTagPillsVisible = useAppSelector(
    (state: RootState) =>
      state.settings.featureFlags.areTagPillsVisible,
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
          className="h-5 w-9 ml-1"
        />
      </div>
      <div className="mt-2 flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <div className="font-medium">Tag pills</div>
          <div className="text-[#666666]">
            Showing clickable tags based on found patterns when expanding entry. Allows copying tags to clipboard.
          </div>
        </div>
        <Switch
          checked={areTagPillsVisible}
          onCheckedChange={(checked) =>
            dispatch(setTagPillsVisibility(checked))
          }
          className="h-5 w-9 ml-1"
        />
      </div>
    </>
  );
};
