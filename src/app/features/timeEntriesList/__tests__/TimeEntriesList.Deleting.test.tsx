import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { timeEntriesFixture } from "../../../store/timeEntries/fixtures";
import connectStore from "../../../testUtils/connectStore";
import { TimeEntriesList } from "../TimeEntriesList";

describe("TimeEntriesList Deleting", () => {
  const arrange = () => {
    render(
      connectStore(<TimeEntriesList />, {
        timeEntries: timeEntriesFixture,
      })
    );
  };

  it("WHEN clicked on Delete button THEN confirmation dialog is shown", () => {
    arrange();
    const { expandButton } = getEntryWithOneChild();

    // act
    userEvent.click(expandButton);
    userEvent.click(screen.getByLabelText("Remove entry"));

    // assert
    expect(screen.getByText("Delete entry DX1-1: Task 1?")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  it("WHEN clicked on Delete button and cancelled THEN confirmation modal is closed", () => {
    arrange();
    const { expandButton } = getEntryWithOneChild();
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(2);

    // act
    userEvent.click(expandButton);
    userEvent.click(screen.getByLabelText("Remove entry"));
    expect(screen.getByText("Delete entry DX1-1: Task 1?")).toBeInTheDocument();
    userEvent.click(screen.getByText("Cancel"));

    // assert
    expect(
      screen.queryByText("Delete entry DX1-1: Task 1?")
    ).not.toBeInTheDocument();
    userEvent.click(expandButton); // collapse combined entry
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(2);
  });

  it("GIVEN entry with one child WHEN clicked on Delete button and confirmed THEN entry is deleted", () => {
    arrange();
    const { expandButton } = getEntryWithOneChild();
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(2);

    // act
    userEvent.click(expandButton);
    userEvent.click(screen.getByLabelText("Remove entry"));
    userEvent.click(screen.getByText("Remove"));

    // assert
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(1);
  });

  it("GIVEN entry with multiple children WHEN clicked on Delete button and confirmed THEN child entry is deleted", () => {
    arrange();
    const { expandButton } = getEntryWithMultipleChildren();

    // act
    userEvent.click(expandButton);
    expect(screen.getAllByLabelText("Time entry child row")).toHaveLength(3);
    userEvent.click(screen.getAllByLabelText("Remove entry")[0]);
    userEvent.click(screen.getByText("Remove"));

    // assert
    expect(screen.getAllByLabelText("Time entry child row")).toHaveLength(2);
  });
});

const getEntryWithOneChild = () => {
  // eslint-disable-next-line testing-library/no-node-access
  const entryRow = screen.getAllByTitle("DX1-1: Task 1")[0].parentElement!;
  const expandButton = within(entryRow).getByLabelText(
    "Combined entry accordion"
  );

  return { entryRow, expandButton };
};

const getEntryWithMultipleChildren = () => {
  // eslint-disable-next-line testing-library/no-node-access
  const entryRow = screen.getByTitle("DX1-3: Task 3 with logged entries")
    .parentElement!;
  const expandButton = within(entryRow).getByLabelText(
    "Combined entry accordion"
  );

  return { entryRow, expandButton };
};
