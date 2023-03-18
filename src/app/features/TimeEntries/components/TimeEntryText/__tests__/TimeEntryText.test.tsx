import { render, screen } from "@testing-library/react";
import connectStore from "../../../../../testUtils/connectStore";
import { getByTextContent } from "../../../../../testUtils/getByTextContent";
import { TimeEntryText } from "../TimeEntryText";

describe("TimeEntryText", () => {
  it("WHEN text with jira id on the beginning provided THEN jira id is made into link", () => {
    // arange
    render(connectStore(<TimeEntryText timeEntryText="DX1-3464: Something" />));

    // assert
    expect(getByTextContent("DX1-3464: Something")).toBeInTheDocument();
    expect(screen.getByText("DX1-3464")).toHaveAttribute(
      "href",
      "https://jiradc2.ext.net.nokia.com/browse/DX1-3464"
    );
  });

  it("WHEN multiple patterns used THEN issue ids are made into links", () => {
    // arange
    render(connectStore(<TimeEntryText timeEntryText="DX1-3464: KAR-32: Something" />));

    // assert
    expect(getByTextContent("DX1-3464: KAR-32: Something")).toBeInTheDocument();
    expect(screen.getByText("DX1-3464")).toHaveAttribute(
      "href",
      "https://jiradc2.ext.net.nokia.com/browse/DX1-3464"
    );
    expect(screen.getByText("KAR-32")).toHaveAttribute(
      "href",
      "https://linear.app/karlosos/issue/KAR-32"
    );
  });

  it("WHEN text with jira id in the middle provided THEN jira id is made into link", () => {
    // arange
    render(connectStore(<TimeEntryText timeEntryText="Review: DX1-3464: Something" />));

    // assert
    expect(getByTextContent("Review: DX1-3464: Something")).toBeInTheDocument();
    expect(screen.getByText("DX1-3464")).toHaveAttribute(
      "href",
      "https://jiradc2.ext.net.nokia.com/browse/DX1-3464"
    );
  });
});