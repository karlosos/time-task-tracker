import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { timeEntriesFixture } from "../../../store/timeEntries/fixtures";
import connectStore from "../../../testUtils/connectStore";
import { TimeEntriesList } from "../TimeEntriesList";

describe("TimeEntry Edit", () => {
  const arrange = () => {
    render(
      connectStore(<TimeEntriesList />, {
        timeEntries: timeEntriesFixture,
      })
    );

    // eslint-disable-next-line testing-library/no-node-access
    const entryRow = screen.getAllByTitle("DX1-1: Task 1")[0].parentElement!;
    const expandButton = within(entryRow).getByLabelText(
      "Combined entry accordion"
    );
    userEvent.click(expandButton);
    userEvent.click(screen.getByLabelText("Edit entry"));

    return { expandButton };
  };

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2022-08-19 20:50"));
  });

  it("WHEN entry text, start time and stop time edited and save clicked THEN entry is updated", async () => {
    // arrange
    const { expandButton: collapseButton } = arrange();

    const textInput = screen.getByRole("textbox", {
      name: "Current entry text",
    });
    const startTimeInput = screen.getByDisplayValue("17:27");
    const stopTimeInput = screen.getByDisplayValue("19:31");
    const saveButton = screen.getByText("Save");

    // act
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      userEvent.clear(textInput);
      userEvent.type(textInput, "--Completely new task--");

      userEvent.clear(startTimeInput);
      userEvent.type(startTimeInput, "20:05");
      userEvent.type(startTimeInput, "{enter}");

      userEvent.clear(stopTimeInput);
      userEvent.type(stopTimeInput, "20:10");
      userEvent.type(stopTimeInput, "{enter}");

      userEvent.click(saveButton);
    });

    // assert
    userEvent.click(collapseButton);
    expect(screen.getByText("--Completely new task--")).toBeInTheDocument();
    expect(screen.getByText("00:05:00")).toBeInTheDocument();
  });

  it("WHEN entry text edited and cancel clicked THEN entry text is not updated", async () => {
    // arrange
    const {expandButton: collapseButton} = arrange();

    const textInput = screen.getByRole("textbox", {
      name: "Current entry text",
    });
    const cancelButton = screen.getByText("Cancel");

    // act
    userEvent.clear(textInput);
    userEvent.type(textInput, "--Completely new task--");

    userEvent.click(cancelButton);
    userEvent.click(collapseButton)

    // assert
    expect(
      screen.queryByText("--Completely new task--")
    ).not.toBeInTheDocument();
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(2);
  });
});
