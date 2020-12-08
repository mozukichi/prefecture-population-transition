import { Prefecture } from "./Prefecture";

const RESAS_API_KEY = "1WAgEHBX1RahNCuFeYHOn8xVh9mnsQHaqjE2wcXs";

export type ResasPrefecturesResponse = {
  message: string | null;
  result: Prefecture[];
};

export type ResasPopulationData = {
  label: string;
  data: { year: number; value: number }[];
};

export type ResasPopulationResponse = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: ResasPopulationData[];
  };
};

/**
 * RESAS-API から都道府県一覧のデータを取得
 */
export const fetchResasPrefectures = async (): Promise<ResasPrefecturesResponse> => {
  const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "X-API-KEY": RESAS_API_KEY,
    },
  });
  return (await response.json()) as ResasPrefecturesResponse;
};

/**
 * 都道府県ごとの人口構成（推移）のデータを取得
 * @param prefCode 都道府県コード
 */
export const fetchResasPopulation = async (
  prefCode: number
): Promise<ResasPopulationResponse> => {
  const params = { prefCode: prefCode.toString(), cityCode: "-" };
  const queryStr = new URLSearchParams(params);
  const url = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${queryStr.toString()}`;
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "X-API-KEY": RESAS_API_KEY,
    },
  });
  return (await response.json()) as ResasPopulationResponse;
};
