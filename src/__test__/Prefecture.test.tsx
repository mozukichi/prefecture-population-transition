import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { PrefectureSelector } from "../Prefecture";

describe("prefecture test", () => {
  it("renders empty prefecture", () => {
    render(<PrefectureSelector prefectures={[]} />);
  });

  const handleChange = () => {

  };

  it("renders prefecture list", async () => {
    const prefectures = [
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
    ];
    
    const { container } = render(<PrefectureSelector prefectures={prefectures} onChange={handleChange}/>);

    expect(await screen.findByText("北海道")).toBeInTheDocument();
    expect(await screen.findByText("青森県")).toBeInTheDocument();

    const input = container.querySelector("input[type=checkbox]");
    if (input !== null) {
      expect((input as HTMLInputElement).checked).toBe(false);
      fireEvent.click(input);
      expect((input as HTMLInputElement).checked).toBe(true);
    }
  });
});
