import "@testing-library/jest-dom";
import { getByText } from "@testing-library/dom";

import { App } from "./index";

test("renders learn react link", () => {
  const view = App();

  expect(getByText(view, "dog")).toBeTruthy();
});
