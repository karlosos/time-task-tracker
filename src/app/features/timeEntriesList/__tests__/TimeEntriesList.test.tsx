import { render, screen, within } from "@testing-library/react";
import { timeEntriesFixture } from "../../../store/timeEntries/fixtures";
import connectStore from "../../../testUtils/connectStore";
import { TimeEntriesList } from "../TimeEntriesList";

describe("TimeEntriesList", () => {
  it("WHEN no items THEN display empty list", () => {
    // arrange
    render(connectStore(<TimeEntriesList />));

    // assert
    screen.getByText("Start by adding time entries");
  });

  describe("GIVEN items in store", () => {
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
      expect(screen.getByText("03:46:53")).toBeInTheDocument(); // combined time per day 1
      expect(screen.getByText("2022-08-18")).toBeInTheDocument();
      expect(screen.getByText("02:03:16")).toBeInTheDocument(); // combined time per day 2
    });

    it("THEN tasks are collapsed by name and time is summed", () => {
      arrange();
      const combinedRow = screen.getByTitle(
        "DX1-4444: Task 4 with some logged entries"
      ).parentElement;

      // assert
      expect(within(combinedRow!).getByText("3")).toBeInTheDocument(); // number of collapsed elements
      expect(
        within(combinedRow!).getByTitle(
          "DX1-4444: Task 4 with some logged entries"
        )
      ).toBeInTheDocument();
      expect(within(combinedRow!).getByText("00:03:05")).toBeInTheDocument();
      expect(within(combinedRow!).getByRole("checkbox")).toBeDisabled();
    });
  });
});
