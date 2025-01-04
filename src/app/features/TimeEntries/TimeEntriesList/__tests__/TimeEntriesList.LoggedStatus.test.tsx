import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import connectStore from "../../../../testUtils/connectStore";
import { settingsFixture, timeEntriesFixture } from "../../store/fixtures";
import { TimeEntriesList } from "../TimeEntriesList";

describe("TimeEntriesList Logged Status", () => {
  const arrange = () => {
    const user = userEvent.setup();
    render(
      connectStore(<TimeEntriesList />, {
        timeEntries: timeEntriesFixture,
        settings: settingsFixture,
      }),
    );

    return { user };
  };

  it("WHEN parent task has all children logged THEN checkbox is enabled and checked", () => {
    arrange();
    const { entryRow } = getEntryWithCheckedChildren();

    // assert
    expect(within(entryRow).getByRole("checkbox")).toBeEnabled();
    expect(within(entryRow).getByRole("checkbox")).toBeChecked();
  });

  it("WHEN parent task has no logged children THEN checkbox is enabled and not checked", () => {
    arrange();
    const { entryRow } = getEntryWithUncheckedChildren();

    // assert
    expect(within(entryRow).getByRole("checkbox")).toBeEnabled();
    expect(within(entryRow).getByRole("checkbox")).not.toBeChecked();
  });

  it("WHEN parent task has mixed logged children THEN checkbox is disabled and indetermined state", () => {
    arrange();
    const { entryRow } = getEntryWithMixedChildren();

    // assert
    expect(within(entryRow).getByRole("checkbox")).toBeDisabled();
    expect(within(entryRow).getByRole("checkbox")).toHaveAttribute(
      "data-indeterminate",
      "true",
    );
  });

  it("WHEN checked parent task THEN all children all logged", async () => {
    const { user } = arrange();
    const { entryRow, expandButton } = getEntryWithUncheckedChildren();

    // act
    await user.click(within(entryRow).getByRole("checkbox"));

    // assert
    await assertAllChidrenCheckedStatus(user, expandButton, true);
  });

  it("WHEN unchecked parent task THEN all children all not logged", async () => {
    const { user } = arrange();
    const { entryRow, expandButton } = getEntryWithCheckedChildren();

    // act
    await user.click(within(entryRow).getByRole("checkbox"));

    // assert
    await assertAllChidrenCheckedStatus(user, expandButton, false);
  });

  it("WHEN child task log status changed for parent with all children checked THEN parent checkbox is indeterminate state", async () => {
    const { user } = arrange();
    const { entryRow, expandButton } = getEntryWithCheckedChildren();

    // act
    await user.click(expandButton);
    await user.click(within(entryRow).getByRole("checkbox"));
    await user.click(
      within(screen.getAllByLabelText("Time entry child row")[0]).getByRole(
        "checkbox",
      ),
    );

    // assert
    expect(within(entryRow).getByRole("checkbox")).toBeDisabled();
    expect(within(entryRow).getByRole("checkbox")).toHaveAttribute(
      "data-indeterminate",
      "true",
    );
  });
});

const getEntryWithUncheckedChildren = () => {
  const entryRow = screen.getAllByTitle(
    "DX1-2: Task 2 with multiple entries",
  )[0].parentElement!;
  const expandButton = within(entryRow).getByLabelText(
    "Grouped entry accordion",
  );

  return { entryRow, expandButton };
};

const getEntryWithCheckedChildren = () => {
  const entryRow = screen.getByTitle(
    "DX1-3: Task 3 with logged entries",
  ).parentElement!;
  const expandButton = within(entryRow).getByLabelText(
    "Grouped entry accordion",
  );

  return { entryRow, expandButton };
};

const getEntryWithMixedChildren = () => {
  const entryRow = screen.getByTitle(
    "DX1-4444: Task 4 with some logged entries",
  ).parentElement!;
  const expandButton = within(entryRow).getByLabelText(
    "Grouped entry accordion",
  );

  return { entryRow, expandButton };
};

const assertAllChidrenCheckedStatus = async (
  user: UserEvent,
  expandRowButton: HTMLElement,
  isChecked: boolean,
) => {
  await user.click(expandRowButton);

  const children = screen.getAllByLabelText("Time entry child row");
  children.forEach((childRow) => {
    if (isChecked) {
      expect(within(childRow).getByRole("checkbox")).toBeChecked();
    } else {
      expect(within(childRow).getByRole("checkbox")).not.toBeChecked();
    }
  });

  await user.click(expandRowButton);
};
