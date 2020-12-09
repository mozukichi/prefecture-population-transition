import React from "react";
import { render, screen } from "@testing-library/react";
import { PrefectureSelector } from "../Prefecture";

describe("prefecture test", () => {
  it("renders prefecture list", async () => {
    const prefectures = [
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
    ];
    render(<PrefectureSelector prefectures={prefectures} />);

    expect(await screen.findByText("北海道")).toBeInTheDocument();
    expect(await screen.findByText("青森県")).toBeInTheDocument();
  });
});
