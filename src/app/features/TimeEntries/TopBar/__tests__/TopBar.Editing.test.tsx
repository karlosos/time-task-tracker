import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import connectStore from "../../../../testUtils/connectStore";
import { TopBar } from "../TopBar";
import { settingsFixture } from "../../store/fixtures";

describe("TopBar Editing", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2022-08-16 20:50"));
  });

  const arrange = async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      connectStore(<TopBar />, {
        timeEntries: {
          ids: ["1"],
          entities: {
            "1": {
              id: "1",
              text: "DX1-3213: Doing something",
              startTime: new Date("2022-08-16 20:47").getTime(), // 3 minutes ago
              stopTime: undefined,
              logged: false,
            },
          },
        },
        settings: settingsFixture,
      }),
    );

    const timer = screen.getByText("00:03:00");
    await user.click(timer);
    return { user };
  };

  it("WHEN entry text and start time edited and save clicked THEN running entry is updated", async () => {
    // arrange
    const { user } = await arrange();

    const textInput = screen.getByRole("textbox", {
      name: "Current entry text",
    });
    const startTimeInput = screen.getByDisplayValue("20:47");
    const saveButton = screen.getByText("Save");

    // act
    await user.clear(textInput);
    await user.type(textInput, "--Completely new task--");

    await user.clear(startTimeInput);
    await user.type(startTimeInput, "20:05");

    await user.click(saveButton);

    // assert
    expect(screen.getByText("--Completely new task--")).toBeInTheDocument();
    expect(screen.getByText("00:45:00")).toBeInTheDocument();
  });

  it("WHEN entry text edited and cancel clicked THEN entry text is not updated", async () => {
    // arrange
    const { user } = await arrange();

    const textInput = screen.getByRole("textbox", {
      name: "Current entry text",
    });
    const cancelButton = screen.getByText("Cancel");

    // act
    await user.clear(textInput);
    await user.type(textInput, "--Completely new task--");

    await user.click(cancelButton);

    // assert
    expect(
      screen.queryByText("--Completely new task--"),
    ).not.toBeInTheDocument();
    expect(screen.getByTitle("DX1-3213: Doing something")).toBeInTheDocument();
  });
});
