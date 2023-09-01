import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("Todo exists", () => {
  const todo = { text: "abc", done: false };
  render(
    <Todo todo={todo} onClickComplete={() => null} onClickDelete={() => null} />
  );
  expect(screen.getByText("abc")).toBeDefined();
});
