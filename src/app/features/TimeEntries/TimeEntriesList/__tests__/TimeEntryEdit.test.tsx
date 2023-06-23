import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import connectStore from "../../../../testUtils/connectStore";
import { timeEntriesFixture } from "../../store/fixtures";
import { TimeEntriesList } from "../TimeEntriesList";

process.env.TZ = "UTC";

describe("TimeEntry Edit", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-08-19 14:00'));
  })

  const arrange = async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      connectStore(<TimeEntriesList />, {
        timeEntries: timeEntriesFixture,
      })
    );

    const entryRow = screen.getAllByTitle("DX1-1: Task 1")[0].parentElement!;
    const expandButton = within(entryRow).getByLabelText(
      "Combined entry accordion"
    );
    await user.click(expandButton);
    await user.click(screen.getByLabelText("Edit entry"));

    return { user, expandButton };
  };

  it("WHEN entry text, start time and stop time edited and save clicked THEN entry is updated", async () => {
    // arrange
    const { user, expandButton: collapseButton } = await arrange();

    const textInput = screen.getByRole("textbox", {
      name: "Current entry text",
    });
    const startTimeInput = screen.getByDisplayValue("15:27");
    const stopTimeInput = screen.getByDisplayValue("17:31");
    const saveButton = screen.getByText("Save");

    // act
    await user.clear(textInput);
    await user.type(textInput, "--Completely new task--");

    await user.clear(startTimeInput);
    await user.type(startTimeInput, "20:05");

    await user.clear(stopTimeInput);
    await user.type(stopTimeInput, "20:10");

    await user.click(saveButton);

    // assert
    await user.click(collapseButton);
    expect(screen.getByText("--Completely new task--")).toBeInTheDocument();
    expect(screen.getByText("00:05:00")).toBeInTheDocument();
  });

  it("WHEN entry text edited and cancel clicked THEN entry text is not updated", async () => {
    // arrange
    const { user, expandButton: collapseButton } = await arrange();

    const textInput = screen.getByRole("textbox", {
      name: "Current entry text",
    });
    const cancelButton = screen.getByText("Cancel");

    // act
    await user.clear(textInput);
    await user.type(textInput, "--Completely new task--");

    await user.click(cancelButton);
    await user.click(collapseButton);

    // assert
    expect(
      screen.queryByText("--Completely new task--")
    ).not.toBeInTheDocument();
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(2);
  });
});
