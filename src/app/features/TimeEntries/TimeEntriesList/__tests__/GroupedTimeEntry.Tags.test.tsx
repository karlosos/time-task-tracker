import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import connectStore from "../../../../testUtils/connectStore";
import { settingsFixture, timeEntriesFixture } from "../../store/fixtures";
import { TimeEntriesList } from "../TimeEntriesList";

describe("Grouped Time Entry Tags", () => {
  const arrange = ({ areTagPillsVisible }: { areTagPillsVisible: boolean }) => {
    const user = userEvent.setup();
    render(
      connectStore(<TimeEntriesList />, {
        timeEntries: timeEntriesFixture,
        settings: {
          ...settingsFixture,
          featureFlags: {
            areTagPillsVisible: areTagPillsVisible,
            isAdjustableTimeReportingEnabled: false,
          },
        },
      }),
    );

    return { user };
  };

  it("WHEN parent row is expanded THEN tags are visible", async () => {
    const { user } = arrange({ areTagPillsVisible: true });
    const expandButton = getExpandButton();

    // act
    await user.click(expandButton);

    // assert
    expect(screen.getByLabelText("pattern tag")).toBeInTheDocument();
  });

  it("WHEN copy button is clicked THEN text is copied to the clipboard", async () => {
    // arrange
    const { user } = arrange({ areTagPillsVisible: true });
    const expandButton = getExpandButton();
    await user.click(expandButton);

    // act
    const pill = screen.getByLabelText("pattern tag");
    const copyButton = within(pill).getByLabelText("copy to clipboard");
    await user.click(copyButton);

    // assert
    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe("DX1-4444");
  });

  it("GIVEN feature is disabled WHEN parent row is expanded THEN tags are visible", async () => {
    const { user } = arrange({ areTagPillsVisible: false });
    const expandButton = getExpandButton();

    // act
    await user.click(expandButton);

    // assert
    expect(screen.queryByLabelText("pattern tag")).not.toBeInTheDocument();
  });
});

const getExpandButton = () => {
  const entryRow = screen.getByTitle(
    "DX1-4444: Task 4 with some logged entries",
  ).parentElement!;
  const expandButton = within(entryRow).getByLabelText(
    "Grouped entry accordion",
  );

  return expandButton;
};
