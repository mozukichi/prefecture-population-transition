import React from "react";
import { render, screen } from "@testing-library/react";
import { PrefectureSelector } from "./Prefecture";

test("renders prefecture list", () => {
  const prefectures = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
  ];
  render(<PrefectureSelector prefectures={prefectures} />);

  prefectures.forEach((prefecture) => {
    expect(screen.getByText(prefecture.prefName)).toBeInTheDocument();
  });
});
