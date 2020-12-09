import React, { useState, ChangeEvent } from "react";
import "./Prefecture.css";

export interface Prefecture {
  prefCode: number;
  prefName: string;
}

type PrefectureState = (checks: number[]) => void;

interface Props {
  // 表示する都道府県一覧
  prefectures: Prefecture[];

  // 選択中の都道府県を変更したときのイベント
  onChange?: PrefectureState;
}

/**
 * 都道府県チェックボックスリスト
 */
export const PrefectureSelector: React.FC<Props> = (props) => {
  if (props.prefectures.length === 0) {
    return <p>Prefectures is nothing.</p>;
  }

  // 都道府県のチェック状態
  const [state, setState] = useState(
    props.prefectures?.map((pref) => ({
      [pref.prefCode]: false,
    }))
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const elem = e.target as HTMLInputElement;

    const nextState = {
      ...state,
      [elem.value]: elem.checked,
    };
    setState(nextState);

    // 都道府県ごとのチェック情報を「チェックした都道府県コードの配列」に変換
    const checks = Object.entries(nextState)
      .filter(([, checked]) => checked)
      .map(([prefCode]) => Number(prefCode));

    // 選択中の都道府県の変更イベント
    props.onChange?.(checks);
  };

  const checkboxes = props.prefectures?.map((pref) => (
    <label className="Prefecture-checkbox" key={pref.prefCode}>
      <input
        type="checkbox"
        onChange={handleChange}
        value={pref.prefCode}
        name={pref.prefName}
      />
      <span>{pref.prefName}</span>
    </label>
  ));

  return (
    <div className="Prefecture-container">
      <div className="Prefecture-checkbox-container">{checkboxes}</div>
    </div>
  );
};
