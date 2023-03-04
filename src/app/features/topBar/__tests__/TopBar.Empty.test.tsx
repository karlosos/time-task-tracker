import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import connectStore from "../../../testUtils/connectStore";
import { TopBar } from "../TopBar";

describe("TopBar Empty", () => {
  it("WHEN empty task name THEN start button is disabled", () => {
    // arrange
    render(connectStore(<TopBar />));

    // assert
    const startButton = screen.getByRole("button", { name: "add entry" });
    expect(startButton).toBeDisabled();
  });

  it("WHEN filled in task name WHEN enter key clicked THEN task is added", async () => {
    // arrange
    render(connectStore(<TopBar />));

    const newEntryInput = screen.getByRole("textbox", {
      name: "new entry text",
    });
    userEvent.type(newEntryInput, "--Test entry 1--");

    // act
    userEvent.type(newEntryInput, "{enter}");

    // assert
    expect(screen.getByText("--Test entry 1--")).toBeInTheDocument();
  });
});
