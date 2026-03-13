import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkTimerBadge } from "../WorkTimerBadge";
import connectStore from "../../../testUtils/connectStore";
import {
  settingsFixture,
  timeEntriesFixture,
} from "../../TimeEntries/store/fixtures";
import { shiftTimerInitialState } from "../slice";

describe("Work Timer", () => {
  const arrange = ({
    isShiftTimerEnabled,
  }: {
    isShiftTimerEnabled: boolean;
  }) => {
    const user = userEvent.setup();
    render(
      connectStore(<WorkTimerBadge />, {
        timeEntries: timeEntriesFixture,
        settings: {
          ...settingsFixture,
          featureFlags: {
            areTagPillsVisible: false,
            isAdjustableTimeReportingEnabled: false,
            isShiftTimerEnabled: isShiftTimerEnabled,
          },
        },
        shiftTimer: shiftTimerInitialState,
      }),
    );

    return { user };
  };

  it("WHEN feature flag is off THEN timer badge is not visible", async () => {
    arrange({ isShiftTimerEnabled: false });

    // assert
    expect(screen.queryByText("08:00:00")).not.toBeInTheDocument();
  });

  it("WHEN timer is start to 8 hours THEN it counts down to 8 hours", async () => {
    const { user } = arrange({ isShiftTimerEnabled: true });

    // act
    const timerButton = screen.getByTitle("Open Timer Settings");
    user.click(timerButton);

    const dialog = await screen.findByLabelText("Work timer dialog");
    expect(dialog).toBeInTheDocument();

    expect(within(dialog).getByText("Set new timer")).toBeInTheDocument();

    const startButton = within(dialog).getByText("Resume");
    user.click(startButton);

    // assert
    await waitForElementToBeRemoved(() =>
      within(dialog).queryByText("Set new timer"),
    );
    // TODO: elapse some time and assert that timer changes
  });
});
