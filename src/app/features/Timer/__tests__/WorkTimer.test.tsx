import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkTimerBadge } from "../WorkTimerBadge";
import connectStore from "../../../testUtils/connectStore";
import {
  settingsFixture,
  timeEntriesFixture,
} from "../../TimeEntries/store/fixtures";
import { shiftTimerInitialState } from "../slice";
import { testId } from "../../../testUtils/testId";

describe("Work Timer", () => {
  jest.useFakeTimers();

  const arrange = ({
    isShiftTimerEnabled,
  }: {
    isShiftTimerEnabled: boolean;
  }) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
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
    expect(
      screen.queryByTestId(testId.workTimerBadgeValue),
    ).not.toBeInTheDocument();
  });

  it("WHEN timer is start to 8 hours THEN it counts down", async () => {
    const { user } = arrange({ isShiftTimerEnabled: true });

    // act
    const timerButton = screen.getByTitle("Open Timer Settings");
    await user.click(timerButton);

    const dialog = await screen.findByLabelText("Work timer dialog");
    expect(dialog).toBeInTheDocument();

    expect(within(dialog).getByText("Set new timer")).toBeInTheDocument();

    const start8HoursButton = within(dialog).getByText("8 Hours");
    await user.click(start8HoursButton);

    // assert
    expect(within(dialog).queryByText("Set new timer")).not.toBeInTheDocument();
    expect(screen.getByTestId(testId.workTimerBadgeValue)).toHaveTextContent(
      "08:00:00",
    );
    expect(screen.getByTestId(testId.workTimerDialogValue)).toHaveTextContent(
      "08:00:00",
    );

    // elapse some time
    act(() => {
      jest.advanceTimersByTime(4 * 60 * 1000 + 30 * 1000); // 4m 30s
    });

    // assert that timer changes value from 08:00:00 to 07:55:30
    expect(screen.getByTestId(testId.workTimerBadgeValue)).toHaveTextContent(
      "07:55:30",
    );
    expect(screen.getByTestId(testId.workTimerDialogValue)).toHaveTextContent(
      "07:55:30",
    );
  });

  it("WHEN timer is started with 17:00 preset THEN the countdown is correct", async () => {
    // set fake time to 15:30
    jest.setSystemTime(new Date("2024-03-20T15:30:00"));

    const { user } = arrange({ isShiftTimerEnabled: true });

    // act
    const timerButton = screen.getByTitle("Open Timer Settings");
    await user.click(timerButton);

    const dialog = await screen.findByLabelText("Work timer dialog");
    const till1700Button = within(dialog).getByText("Till 17:00");
    await user.click(till1700Button);

    // assert that the countdown is 1:30:00
    expect(screen.getByTestId(testId.workTimerBadgeValue)).toHaveTextContent(
      "01:30:00",
    );
    expect(screen.getByTestId(testId.workTimerDialogValue)).toHaveTextContent(
      "01:30:00",
    );
  });

  it("WHEN timer is started with custom time THEN the countdown is correct", async () => {
    // set fake time to 15:30
    jest.setSystemTime(new Date("2024-03-20T15:30:00"));

    const { user } = arrange({ isShiftTimerEnabled: true });

    // act
    const timerButton = screen.getByTitle("Open Timer Settings");
    await user.click(timerButton);

    const dialog = await screen.findByLabelText("Work timer dialog");
    const customButton = within(dialog).getByText("Custom");
    await user.click(customButton);

    const input = within(dialog).getByPlaceholderText("e.g. 17:00");
    await user.type(input, "18:00");

    const startButton = within(dialog).getByRole("button", {
      name: /Start \(2 hours 30 minutes\)/,
    });
    await user.click(startButton);

    // assert that the countdown is 2:30:00
    expect(screen.getByTestId(testId.workTimerBadgeValue)).toHaveTextContent(
      "02:30:00",
    );
    expect(screen.getByTestId(testId.workTimerDialogValue)).toHaveTextContent(
      "02:30:00",
    );
  });

  it("WHEN timer is finished THEN the badge shows overtime", async () => {
    // set fake time to 10:00
    jest.setSystemTime(new Date("2024-03-20T10:00:00"));

    const { user } = arrange({ isShiftTimerEnabled: true });

    // act
    const timerButton = screen.getByTitle("Open Timer Settings");
    await user.click(timerButton);

    const dialog = await screen.findByLabelText("Work timer dialog");
    const start8HoursButton = within(dialog).getByText("8 Hours");
    await user.click(start8HoursButton);

    // assert start state
    expect(screen.getByTestId(testId.workTimerBadgeValue)).toHaveTextContent(
      "08:00:00",
    );

    // elapse time for a timer (8 hours + 10 seconds)
    act(() => {
      jest.advanceTimersByTime(8 * 60 * 60 * 1000 + 10 * 1000);
    });

    // assert that timer displays negative value
    expect(screen.getByTestId(testId.workTimerBadgeValue)).toHaveTextContent(
      "-00:00:10",
    );
    expect(screen.getByTestId(testId.workTimerDialogValue)).toHaveTextContent(
      "-00:00:10",
    );

    // advance timers further (another 50 seconds)
    act(() => {
      jest.advanceTimersByTime(50 * 1000);
    });

    // assert that timer displays negative value (-00:01:00)
    expect(screen.getByTestId(testId.workTimerBadgeValue)).toHaveTextContent(
      "-00:01:00",
    );
  });
});
