import React from "react";
import CSS from "csstype";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  graphData: Record<string, string | number>[];
  style?: CSS.Properties;
}

export const LineGraph: React.FC<Props> = (props) => {
  // 系列の洗い出し
  const seriesList = props.graphData.reduce(
    (p: string[], v) =>
      [
        ...new Set([...p, ...Object.keys(v).filter((key) => key !== "年")]),
      ] as string[],
    []
  );

  return (
    <div className="LineChart" style={props.style}>
      <ResponsiveContainer aspect={4 / 3}>
        <LineChart data={props.graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="年" />
          <YAxis />
          <Tooltip />
          <Legend />
          {seriesList.map((series, index) => (
            <Line
              key={`series-${series}`}
              type="monotone"
              dataKey={series}
              stroke={lineColor(index)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * グラフの折れ線の色を取得
 * @param index 色番号
 * @return 色を表す文字列
 */
const lineColor = (index: number) => {
  const base = index % 7;
  const level = Math.floor(index / 7) / 7;
  const h = (360 * (base % 7)) / 7;
  const l = 60 * level + 30;
  return `hsl(${h},100%,${l}%)`;
};
