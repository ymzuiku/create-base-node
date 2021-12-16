import "@testing-library/jest-dom";
import { getByText } from "@testing-library/dom";

test("renders learn react link", () => {
  const ele = document.createElement("div");
  ele.textContent = "dog";
  expect(getByText(ele, "dog")).toBeTruthy();
});
