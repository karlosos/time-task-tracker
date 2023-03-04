import { render, screen } from "@testing-library/react";
import { getByTextContent } from "../../../../../testUtils/getByTextContent";
import { TimeEntryText } from "../TimeEntryText";

describe("TimeEntryText", () => {
  it("WHEN text with jira id on the beginning provided THEN jira id is made into link", () => {
    // arange
    render(<TimeEntryText timeEntryText="DX1-3464: Something" />);

    // assert
    expect(getByTextContent("DX1-3464: Something")).toBeInTheDocument();
    expect(screen.getByText("DX1-3464")).toHaveAttribute(
      "href",
      "https://jiradc2.ext.net.nokia.com/browse/DX1-3464"
    );
  });

  it("WHEN text with jira id in the middle provided THEN jira id is made into link", () => {
    // arange
    render(<TimeEntryText timeEntryText="Review: DX1-3464: Something" />);

    // assert
    expect(getByTextContent("Review: DX1-3464: Something")).toBeInTheDocument();
    expect(screen.getByText("DX1-3464")).toHaveAttribute(
      "href",
      "https://jiradc2.ext.net.nokia.com/browse/DX1-3464"
    );
  });
});
