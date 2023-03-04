import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import connectStore from "../../../../testUtils/connectStore";
import { testId } from "../../../../testUtils/testId";
import { TopBar } from "../TopBar";

describe("TopBar Ongoing", () => {
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
      jest.advanceTimersByTime(2 * 60 * 60 * 1000 + 35 * 60 * 1000 + 50 * 1000); // advance by 2h 35min 50sec
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
    expect(screen.getByTestId(testId.startTime)).toBeInTheDocument();
    expect(screen.getByTestId(testId.stopTime)).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});
