import React, { useState, useEffect, useRef } from "react";
import {
  fetchResasPrefectures,
  fetchResasPopulation,
  ResasPopulationData,
  ResasPopulationResponse,
} from "./resas";
import { Prefecture, PrefectureSelector } from "./Prefecture";
import { LineGraph } from "./LineGraph";
import "./App.css";

/**
 * アプリ本体のコンポーネント
 */
const App: React.FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);
  const [graphData, setGraphData] = useState<
    Record<string, number | string>[] | null
  >(null);

  const mounted = useRef(true);

  // マウント時
  useEffect(() => {
    void (async () => {
      // RESAS-API から都道府県一覧のデータを取得
      const resasPrefs = await fetchResasPrefectures();

      if (!(mounted.current && "result" in resasPrefs)) {
        return;
      }

      setPrefectures(resasPrefs?.result);
    })();

    return () => {
      mounted.current = false;
    };
  }, []);

  // 選択中の都道府県が変更されたとき
  useEffect(() => {
    void (async () => {
      if (selectedPrefs.length === 0) {
        setGraphData(null);
        return;
      }

      // 選択されている全ての都道府県について RESAS-API から人口構成（推移）のデータを取得
      // レスポンス仕様: https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
      const responses = await Promise.all(
        selectedPrefs.map((pref) => fetchResasPopulation(pref))
      );

      // 選択中の都道府県名のリスト
      const prefNames = prefectures.reduce<Record<string, string>>((p, v) => {
        p[v.prefCode] = v.prefName;
        return p;
      }, {});
      const checkedPrefNames = selectedPrefs.map(
        (prefCode) => prefNames[prefCode]
      );

      // RESAS-API の人口構成のデータをグラフデータに変換
      const graphData = resasPopulationToGraphData(checkedPrefNames, responses);

      setGraphData(graphData);
    })();
  }, [selectedPrefs]);

  // 都道府県のチェックボックス変更
  const handleChangePrefectures = (prefs: number[]) => {
    setSelectedPrefs(prefs);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>都道府県別総人口推移グラフ</h1>
      </header>

      <PrefectureSelector
        prefectures={prefectures}
        onChange={handleChangePrefectures}
      />

      <div className="App-graph-container">
        {graphData !== null ? (
          <LineGraph
            style={{ width: "80%", height: "100%" }}
            graphData={graphData}
          />
        ) : null}
      </div>

      <footer className="App-footer">
        <p>Prefecture Population Transition</p>
      </footer>
    </div>
  );
};

/**
 * RESAS-API の人口構成のデータをグラフデータに変換
 * @param prefNames 都道府県名のリスト
 * @param responses 都道府県ごとの RESAS-API のレスポンスのリスト
 */
const resasPopulationToGraphData = (
  prefNames: string[],
  responses: ResasPopulationResponse[]
) => {
  // 各都道府県の総人口のデータを抽出
  const totalData: Record<string, number>[][] = responses
    .map((response) => response.result.data)
    .map(
      (datum) =>
        datum.filter(
          (datum: ResasPopulationData) => datum.label === "総人口"
        )[0].data
    );

  // 「年」のリスト
  const years = [
    ...new Set(totalData.flatMap((data) => data.map((record) => record.year))),
  ];
  // 総人口データの配列をグラフ用のデータに変換
  const graphData = years.map((year: number) => {
    const record: Record<string, number> = { 年: year };
    totalData.forEach((data, index) => {
      const value = data.find((datum) => datum.year === year)?.value;
      if (value === undefined) {
        return;
      }
      record[prefNames[index]] = value;
    });
    return record;
  });

  return graphData;
};

export default App;
