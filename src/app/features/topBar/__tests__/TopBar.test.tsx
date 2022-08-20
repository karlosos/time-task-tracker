import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import connectStore from "../../../testUtils/connectStore";
import { TopBar } from "../TopBar";

describe("TopBar", () => {
  it("WHEN empty task name THEN start button is disabled", () => {
    // arrange 
    render(connectStore(<TopBar />));

    // assert 
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
      // arrange
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

    it("WHEN stop button clicked THEN topbar is cleared", async () => {
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
        screen.getByRole("textbox", { name: "Current entry text" })
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Start Time")).toBeInTheDocument();
      expect(screen.getByLabelText("Stop Time")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });
  });

  describe("GIVEN editing view is opened", () => {
    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date("2022-08-16 20:50"));
    });

    const arrange = () => {
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
        })
      );

      const timer = screen.getByText("00:03:00");
      userEvent.click(timer);
    };

    it("WHEN entry text and start time edited and save clicked THEN running entry is updated", async () => {
      // arrange
      arrange();

      const textInput = screen.getByRole("textbox", {
        name: "Current entry text",
      });
      const startTimeInput = screen.getByDisplayValue("20:47");
      const saveButton = screen.getByText("Save");

      // act
      userEvent.clear(textInput);
      userEvent.type(textInput, "--Completely new task--");

      userEvent.clear(startTimeInput);
      userEvent.type(startTimeInput, "20:05");
      userEvent.type(startTimeInput, "{enter}")

      userEvent.click(saveButton);

      // assert
      expect(screen.getByText("--Completely new task--")).toBeInTheDocument();
      expect(screen.getByText("00:45:00")).toBeInTheDocument();
    });

    it("WHEN entry text edited and cancel clicked THEN entry text is not updated", async () => {
      // arrange
      arrange();

      const textInput = screen.getByRole("textbox", {
        name: "Current entry text",
      });
      const cancelButton = screen.getByText("Cancel");

      // act
      userEvent.clear(textInput);
      userEvent.type(textInput, "--Completely new task--");

      userEvent.click(cancelButton);

      // assert
      expect(screen.queryByText("--Completely new task--")).not.toBeInTheDocument();
      expect(screen.getByText("DX1-3213: Doing something")).toBeInTheDocument();
    })
  });
});
