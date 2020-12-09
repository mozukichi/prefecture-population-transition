import { act } from "@testing-library/react";
import { fetchResasPrefectures, fetchResasPopulation } from "./resas";

describe("RESAS-API test", () => {

  // 都道府県一覧のデータの取得
  it("prefectures", async () => {
    const fakeResponse = {
      result: [
        { prefCode: 1, prefName: "北海道" },
        { prefCode: 2, prefName: "青森県" },
      ],
    };
  
    jest.spyOn(global, "fetch").mockImplementationOnce(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(fakeResponse),
        } as Response)
    );

    await act(async () => {
      expect(await fetchResasPrefectures()).toBe(fakeResponse);
    });
  });

  // 人口構成のデータの取得
  it("population", async () => {
    const fakeResponse = {
      status: 200,
      body: {
        result: {
          data: [
            {
              label: "総人口",
              data: [
                {
                  year: 1980,
                  value: 10000,
                },
                {
                  year: 1985,
                  value: 10000,
                },
              ],
            },
          ],
        },
      },
    };

    jest.spyOn(global, "fetch").mockImplementationOnce(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(fakeResponse),
        } as Response)
    );

    await act(async () => {
      expect(await fetchResasPopulation(1)).toBe(fakeResponse);
    });
  });
});
