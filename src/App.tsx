import React, { useState, useEffect } from "react";
import { Prefecture, PrefectureSelector } from "./Prefecture";
import "./App.css";

type ResasPrefecturesResponse = {
  message: string | null;
  result: Prefecture[];
};

const App: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    void (async () => {
      // RESAS-API から都道府県一覧のデータを取得
      const resasUrl = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
      const apiKey = "1WAgEHBX1RahNCuFeYHOn8xVh9mnsQHaqjE2wcXs";
      const response = await fetch(resasUrl, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "X-API-KEY": apiKey,
        },
      });
      const resasPrefs = (await response.json()) as ResasPrefecturesResponse;
      setPrefectures(resasPrefs?.result);
    })();
  }, []);

  const handleChangePrefectures = (prefs: number[]) => {
    console.log(prefs);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>都道府県別総人口推移グラフ</h1>
      </header>

      <PrefectureSelector
        prefectures={prefectures}
        onChange={handleChangePrefectures}
      ></PrefectureSelector>
    </div>
  );
};

export default App;
