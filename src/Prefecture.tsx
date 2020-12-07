import React, { useState, ChangeEvent } from "react";
import "./Prefecture.css";

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

type PrefectureState = (checks: number[]) => void;

type Props = {
  prefectures: Prefecture[];
  onChange?: PrefectureState;
};

/**
 * 都道府県チェックボックスリスト
 */
export const PrefectureSelector: React.FC<Props> = (props) => {
  if (props.prefectures === null) {
    return <p>Prefectures is nothing.</p>;
  }

  const [state, setState] = useState(
    props.prefectures?.map((pref) => ({
      [pref.prefCode]: false,
    }))
  );

  const isCheckbox = (elem: EventTarget) =>
    (elem as HTMLInputElement).type === "checkbox";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target !== null && !isCheckbox(e.target)) return;

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
    props.onChange?.(checks);
  };

  const checkboxes = props.prefectures?.map((pref) => (
    <React.Fragment key={pref.prefCode}>
      <label className="Prefecture-checkbox">
        <input
          type="checkbox"
          onChange={handleChange}
          value={pref.prefCode}
          name={pref.prefName}
        />
        <span>{pref.prefName}</span>
      </label>
    </React.Fragment>
  ));

  return <div className="Prefecture-container">{checkboxes}</div>;
};
