import { render, screen, within } from "@testing-library/react";
import connectStore from "../../../../testUtils/connectStore";
import userEvent from "@testing-library/user-event";
import { timeEntriesFixture } from "../../store/fixtures";
import { TimeEntriesList } from "../TimeEntriesList";

describe("TimeEntriesList", () => {
  const arrange = () => {
    render(
      connectStore(<TimeEntriesList />, {
        timeEntries: timeEntriesFixture,
      })
    );
  };

  it("THEN items are displayed", () => {
    arrange();

    // assert
    expect(
      screen.getByTitle("DX1-4444: Task 4 with some logged entries")
    ).toBeInTheDocument();
    expect(
      screen.getByTitle("DX1-3: Task 3 with logged entries")
    ).toBeInTheDocument();
    expect(screen.getAllByTitle("DX1-1: Task 1")).toHaveLength(2);
    expect(
      screen.getAllByTitle("DX1-2: Task 2 with multiple entries")
    ).toHaveLength(2);
  });

  it("THEN items are grouped by day and time per day is calculated", () => {
    arrange();

    // assert
    expect(screen.getByText("2022-08-19")).toBeInTheDocument();
    expect(screen.getByText("03:46:53")).toBeInTheDocument(); // grouped time per day 1
    expect(screen.getByText("2022-08-18")).toBeInTheDocument();
    expect(screen.getByText("02:03:16")).toBeInTheDocument(); // grouped time per day 2
  });

  it("THEN tasks are collapsed by name and time is summed", () => {
    arrange();
    const groupedRow = screen.getByTitle(
      "DX1-4444: Task 4 with some logged entries"
    ).parentElement;

    // assert
    expect(within(groupedRow!).getByText("3")).toBeInTheDocument(); // number of collapsed elements
    expect(
      within(groupedRow!).getByTitle(
        "DX1-4444: Task 4 with some logged entries"
      )
    ).toBeInTheDocument();
    expect(within(groupedRow!).getByText("00:03:05")).toBeInTheDocument();
    expect(within(groupedRow!).getByRole("checkbox")).toBeDisabled();
  });

  it("WHEN time is counting THEN all items are displayer", async () => {
    // arrange
    arrange();
    const user = userEvent.setup();

    // act
    const playButtons = screen.getAllByTestId("PlayCircleIcon");
    await user.click(playButtons[0]);

    // assert
    expect(screen.getByText("2022-08-19")).toBeInTheDocument();
    expect(screen.getByText("03:46:53")).toBeInTheDocument(); // grouped time per day 1
    expect(screen.getByText("2022-08-18")).toBeInTheDocument();
    expect(screen.getByText("02:03:16")).toBeInTheDocument(); // grouped time per day 2
  });
});
