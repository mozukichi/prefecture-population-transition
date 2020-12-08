import React, { useState, useEffect } from "react";
import {
  fetchResasPrefectures,
  fetchResasPopulation,
  ResasPopulationData,
} from "./resas";
import { Prefecture, PrefectureSelector } from "./Prefecture";
import "./App.css";

const App: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    void (async () => {
      // RESAS-API から都道府県一覧のデータを取得
      const resasPrefs = await fetchResasPrefectures();
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
