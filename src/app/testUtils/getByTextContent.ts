import { screen } from "@testing-library/react";

export const getByTextContent = (text: string) => {
  return screen.getByText((content, element) => {
    const hasText = (element: Element | null) =>
      element ? element.textContent === text : false;
    const elementHasText = hasText(element);
    const childrenDontHaveText = Array.from(element?.children || []).every(
      (child) => !hasText(child),
    );
    return elementHasText && childrenDontHaveText;
  });
};
