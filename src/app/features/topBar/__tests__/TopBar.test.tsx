import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import connectStore from "../../../testUtils/connectStore";
import { TopBar } from "../TopBar";

describe("TopBar", () => {
  it("WHEN empty task name THEN start button is disabled", () => {
    // ARRANGE
    render(connectStore(<TopBar />));

    // ASSERT
    const startButton = screen.getByRole("button", { name: "add entry" });
    expect(startButton).toBeDisabled();
  });

  describe("GIVEN filled in task name and clicked start button", () => {
    const arrange = () => {
      render(connectStore(<TopBar />));

      const newEntryInput = screen.getByRole("textbox", {
        name: "new entry text",
      });
      userEvent.type(newEntryInput, "--Test entry 1--");
      const startButton = screen.getByRole("button", { name: "add entry" });
      userEvent.click(startButton);

      expect(screen.getByText("--Test entry 1--")).toBeInTheDocument();
    };

    it("THEN start button is hidden and stop button is visible", () => {
      arrange();

      // assert
      expect(
        screen.queryByRole("button", { name: "add entry" })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "stop timer" })
      ).toBeInTheDocument();
    });

    it("WHEN time passes THEN timer is updated", async () => {
      jest.useFakeTimers();
      arrange();
      expect(screen.getByText("00:00:00")).toBeInTheDocument();

      // act
      act(() => {
        jest.advanceTimersByTime(
          2 * 60 * 60 * 1000 + 35 * 60 * 1000 + 50 * 1000
        ); // advance by 2h 35min 50sec
      });

      // assert
      expect(screen.getByText("02:35:50")).toBeInTheDocument();
    });

    it("WHEN stop button clicked THEN clear topbar", async () => {
      arrange();

      // act
      const stopButton = screen.getByRole("button", { name: "stop timer" });
      userEvent.click(stopButton);

      // assert
      expect(
        screen.queryByRole("button", { name: "stop timer" })
      ).not.toBeInTheDocument();
      expect(screen.queryByText("--Test entry 1--")).not.toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: "add entry" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", {
          name: "new entry text",
        })
      ).toBeInTheDocument();
    });

    it("WHEN timer clicked THEN editing view is visible", async () => {
      arrange();

      // act
      const timer = screen.getByText("00:00:00");
      userEvent.click(timer);

      // assert
      expect(
        screen.getByRole("textbox", { name: "Entry text" })
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Start Time")).toBeInTheDocument();
      expect(screen.getByLabelText("Stop Time")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });

  describe("GIVEN editing view is opened", () => {
    const arrange = () => {
      render(
        connectStore(<TopBar />, {
          timeEntries: {
            ids: ["1"],
            entities: {
              "1": {
                id: "1",
                text: "DX1-3213: Doing something",
                startTime: Date.now(),
                stopTime: undefined,
                logged: false,
              },
            },
          },
        })
      );

      const timer = screen.getByText("00:00:00");
      userEvent.click(timer);
    };

    it("WHEN entry text and start time edited THEN", async () => {
      arrange();
      screen.debug(); // TODO: continue

      // act

      // assert
    });
  });
});
