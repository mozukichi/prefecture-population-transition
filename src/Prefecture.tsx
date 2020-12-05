import React from "react";

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

type Props = {
  prefectures: Prefecture[] | null;
};

/**
 * 都道府県チェックボックスリスト
 */
export const PrefectureSelector: React.FC<Props> = (props) => {
  if (props.prefectures === null) {
    return <p>Prefectures is nothing.</p>;
  }
  const prefectureCheckboxes = props.prefectures.map((prefecture) => (
    <React.Fragment key={prefecture.prefCode}>
      <label>
        {prefecture.prefName}
        <input type="checkbox" />
      </label>
    </React.Fragment>
  ));
  return <div>{prefectureCheckboxes}</div>;
};
