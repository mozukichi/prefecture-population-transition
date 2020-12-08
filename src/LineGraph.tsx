import React from "react";
import {
  LineChart,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: Record<string, number>[];
}

export const LineGraph: React.FC<Props> = (props) => {
  // 系列の洗い出し
  const seriesList = props.data.reduce(
    (p: string[], v) =>
      [
        ...new Set([...p, ...Object.keys(v).filter((key) => key !== "年")]),
      ] as string[],
    []
  );

  return (
    <LineChart width={800} height={600} data={props.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="年" />
      <YAxis />
      <Tooltip />
      <Legend />
      {seriesList.map((series) => (
        <Line
          key={`series-${series}`}
          type="monotone"
          dataKey={series}
          stroke="#000"
        />
      ))}
    </LineChart>
  );
};