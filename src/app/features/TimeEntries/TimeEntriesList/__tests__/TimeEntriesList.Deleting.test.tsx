import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import connectStore from "../../../../testUtils/connectStore";
import { timeEntriesFixture } from "../../store/fixtures";
import { TimeEntriesList } from "../TimeEntriesList";

describe("TimeEntriesList Deleting", () => {
  const arrange = () => {
    const user = userEvent.setup();
    render(
      connectStore(<TimeEntriesList />, {
        timeEntries: timeEntriesFixture,
      }),
    );
    return { user };
  };

  it("WHEN clicked on Delete button THEN confirmation dialog is shown", async () => {
    const { user } = arrange();
    const { expandButton } = getEntryWithOneChild();

    // act
    await user.click(expandButton);
    await user.click(screen.getByLabelText("Remove entry"));

    // assert
    expect(screen.getByText("Delete entry DX1-1: Task 1?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  it("WHEN clicked on Delete button and cancelled THEN confirmation modal is closed", async () => {
    const { user } = arrange();
    const { expandButton } = getEntryWithOneChild();
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(2);

    // act
    await user.click(expandButton);
    await user.click(screen.getByLabelText("Remove entry"));
    expect(screen.getByText("Delete entry DX1-1: Task 1?")).toBeInTheDocument();
    await user.click(screen.getByText("Cancel"));

    // assert
    expect(
      screen.queryByText("Delete entry DX1-1: Task 1?"),
    ).not.toBeInTheDocument();
    user.click(expandButton); // collapse grouped entry
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(2);
  });

  it("GIVEN entry with one child WHEN clicked on Delete button and confirmed THEN entry is deleted", async () => {
    const { user } = arrange();
    const { expandButton } = getEntryWithOneChild();
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(2);

    // act
    await user.click(expandButton);
    await user.click(screen.getByLabelText("Remove entry"));
    await user.click(screen.getByText("Remove"));

    // assert
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(1);
  });

  it("GIVEN entry with multiple children WHEN clicked on Delete button and confirmed THEN child entry is deleted", async () => {
    const { user } = arrange();
    const { expandButton } = getEntryWithMultipleChildren();

    // act
    await user.click(expandButton);
    expect(screen.getAllByLabelText("Time entry child row")).toHaveLength(3);
    await user.click(screen.getAllByLabelText("Remove entry")[0]);
    await user.click(screen.getByText("Remove"));

    // assert
    expect(screen.getAllByLabelText("Time entry child row")).toHaveLength(2);
  });
});

const getEntryWithOneChild = () => {
  const entryRow = screen.getAllByTitle("DX1-1: Task 1")[0].parentElement!;
  const expandButton = within(entryRow).getByLabelText(
    "Grouped entry accordion",
  );

  return { entryRow, expandButton };
};

const getEntryWithMultipleChildren = () => {
  const entryRow = screen.getByTitle(
    "DX1-3: Task 3 with logged entries",
  ).parentElement!;
  const expandButton = within(entryRow).getByLabelText(
    "Grouped entry accordion",
  );

  return { entryRow, expandButton };
};
