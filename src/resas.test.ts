import { act } from "@testing-library/react";
import fetchMock from "fetch-mock";
import { fetchResasPrefectures, fetchResasPopulation } from "./resas";

describe("RESAS-API test", () => {
  // 都道府県一覧のデータの取得
  it("prefectures", async () => {
    fetchMock.get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      status: 200,
      body: {
        result: [
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森県" },
        ],
      },
    });

    await act(async () => {
      expect(await fetchResasPrefectures()).toBeDefined();
    });

    fetchMock.restore();
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
    fetchMock.get(
      "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1&cityCode=-",
      fakeResponse
    );

    await act(async () => {
      expect(await fetchResasPopulation(1)).toBeDefined();
    });

    fetchMock.restore();
  });
});
