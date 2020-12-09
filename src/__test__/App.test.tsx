import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";

/**
 * 都道府県一覧のダミーデータ設定
 */
const setupFakePrefectureFetch = () => {
  const fakePrefectures = {
    result: [
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
    ],
  };
  jest.spyOn(global, "fetch").mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakePrefectures),
    } as Response)
  );
};

/**
 * 人口構成のダミーデータの設定
 */
const setupFakePopulationFetch = () => {
  const fakePopulation = {
    result: {
      data: [
        {
          label: "総人口",
          data: [
            { year: 1980, value: 10000 },
            { year: 1985, value: 10000 },
          ],
        },
      ],
    },
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakePopulation),
    } as Response)
  );
};

describe("app test", () => {
  it("renders app", async () => {
    setupFakePrefectureFetch();

    const { container } = render(<App />);

    await waitFor(() => {
      expect(screen.getByLabelText("北海道")).toBeInTheDocument();
      expect(screen.getByLabelText("青森県")).toBeInTheDocument();
    });

    setupFakePopulationFetch();

    const input = container.querySelector("input[type=checkbox]");
    if (input !== null) {
      fireEvent.click(input);
    }

    await waitFor(async () => {
      expect(await screen.findByTestId("linegraph")).toBeInTheDocument();
    });
  });

  // 都道府県一覧データが得られなかった
  it("prefecture no data", () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      } as Response)
    );

    render(<App />);
  });
});
