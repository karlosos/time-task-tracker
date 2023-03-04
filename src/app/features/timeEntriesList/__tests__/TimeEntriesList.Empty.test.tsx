import { render, screen } from "@testing-library/react";
import connectStore from "../../../testUtils/connectStore";
import { TimeEntriesList } from "../TimeEntriesList";

describe("TimeEntriesList Empty", () => {
  it("WHEN no items THEN display empty list", () => {
    // arrange
    render(connectStore(<TimeEntriesList />));

    // assert
    screen.getByText("Start by adding time entries");
  });
});
