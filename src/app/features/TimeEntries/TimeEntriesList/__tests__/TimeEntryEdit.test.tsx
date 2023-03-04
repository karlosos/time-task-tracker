import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import connectStore from "../../../../testUtils/connectStore";
import { timeEntriesFixture } from "../../store/fixtures";
import { TimeEntriesList } from "../TimeEntriesList";

process.env.TZ = "UTC";

describe("TimeEntry Edit", () => {
  const arrange = () => {
    render(
      connectStore(<TimeEntriesList />, {
        timeEntries: timeEntriesFixture,
      })
    );

    const entryRow = screen.getAllByTitle("DX1-1: Task 1")[0].parentElement!;
    const expandButton = within(entryRow).getByLabelText(
      "Combined entry accordion"
    );
    userEvent.click(expandButton);
    userEvent.click(screen.getByLabelText("Edit entry"));

    return { expandButton };
  };

  it("WHEN entry text, start time and stop time edited and save clicked THEN entry is updated", async () => {
    // arrange
    const { expandButton: collapseButton } = arrange();

    const textInput = screen.getByRole("textbox", {
      name: "Current entry text",
    });
    const startTimeInput = screen.getByDisplayValue("15:27");
    const stopTimeInput = screen.getByDisplayValue("17:31");
    const saveButton = screen.getByText("Save");

    // act
    userEvent.clear(textInput);
    userEvent.type(textInput, "--Completely new task--");

    userEvent.clear(startTimeInput);
    userEvent.type(startTimeInput, "20:05");

    userEvent.clear(stopTimeInput);
    userEvent.type(stopTimeInput, "20:10");

    userEvent.click(saveButton);

    // assert
    userEvent.click(collapseButton);
    expect(screen.getByText("--Completely new task--")).toBeInTheDocument();
    expect(screen.getByText("00:05:00")).toBeInTheDocument();
  });

  it("WHEN entry text edited and cancel clicked THEN entry text is not updated", async () => {
    // arrange
    const { expandButton: collapseButton } = arrange();

    const textInput = screen.getByRole("textbox", {
      name: "Current entry text",
    });
    const cancelButton = screen.getByText("Cancel");

    // act
    userEvent.clear(textInput);
    userEvent.type(textInput, "--Completely new task--");

    userEvent.click(cancelButton);
    userEvent.click(collapseButton);

    // assert
    expect(
      screen.queryByText("--Completely new task--")
    ).not.toBeInTheDocument();
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(2);
  });
});
