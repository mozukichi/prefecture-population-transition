import React, { useState, useEffect } from "react";
import { Prefecture, PrefectureSelector } from "./Prefecture";
import "./App.css";

const App: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[] | null>(null);

  useEffect(() => {
    setPrefectures([
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
    ]);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>都道府県別総人口推移グラフ</h1>
      </header>
      <PrefectureSelector prefectures={prefectures}></PrefectureSelector>
    </div>
  );
};

export default App;
