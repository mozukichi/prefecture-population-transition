import React from "react";
import { render } from "@testing-library/react";
import { LineGraph } from "./LineGraph";

test("renders linegraph", () => {
  const data: Record<string, number | string>[] = [
    { name: "aaaa", value: 100 },
    { name: "aaaa", value: 200 },
  ];

  const { container } = render(
    <LineGraph graphData={data} style={{ width: "800px", height: "600px" }} />
  );
  expect(container.querySelector("svg")).toBeDefined();
});
