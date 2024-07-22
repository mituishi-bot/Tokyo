import React from "react";
import { ResponsiveLine } from "@nivo/line";
import * as d3 from "d3";

const Chart = ({ selectedDistrictIndexes, populationData }) => {
  // 選択された区のデータを取得
  const selectedData = selectedDistrictIndexes.map(
    (index) => populationData[index]
  );

  // 折れ線グラフ用のデータ
  const chartData = selectedData.map((district) => ({
    id: district.name,
    data: district.data.map((item) => ({
      x: new Date(item.year),
      y: item.population,
    })),
  }));

  // 23種類のカラー
  const customColors = [
    "#1f77b4",
    "#aec7e8",
    "#ff7f0e",
    "#ffbb78",
    "#2ca02c",
    "#98df8a",
    "#d62728",
    "#ff9896",
    "#9467bd",
    "#c5b0d5",
    "#8c564b",
    "#c49c94",
    "#e377c2",
    "#f7b6d2",
    "#7f7f7f",
    "#c7c7c7",
    "#bcbd22",
    "#dbdb8d",
    "#17becf",
    "#9edae5",
    "#393b79",
    "#5254a3",
    "#6b6ecf",
    "#9c9ede",
  ];

  const colorScale = d3
    .scaleOrdinal()
    .domain(chartData.map((d) => d.id))
    .range(customColors);

  const maxY = Math.max(
    ...selectedData.flatMap((district) =>
      district.data.map((item) => item.population)
    )
  );

  // COVID-19期間の設定
  const covidStart = new Date("2020-03");
  const covidEnd = new Date("2022-09");

  return (
    <div style={{ height: "600px" }}>
      <ResponsiveLine
        data={chartData}
        colors={colorScale}
        lineWidth={3}
        margin={{ top: 60, right: 50, bottom: 50, left: 150 }}
        xScale={{
          type: "time",
          format: "%Y-%m",
          precision: "month",
          useUTC: false,
        }}
        xFormat="time:%Y-%m"
        yScale={{
          type: "linear",
          min: "auto",
          max: maxY,
          stacked: false,
          reverse: false,
        }}
        axisBottom={{
          format: "%Y-%m",
          tickValues: "every 12 months",
          legend: "年",
          legendOffset: 46,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: "人口数",
          legendOffset: -100,
          legendPosition: "middle",
        }}
        enablePoints={true}
        pointSize={5}
        pointBorderWidth={1}
        pointBorderColor={{ from: "color", modifiers: [] }}
        pointLabelYOffset={-12}
        useMesh={true}
        tooltip={({ point }) => (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <strong>{point.serieId}</strong>
            <br />
            <strong>年: </strong>
            {d3.timeFormat("%Y-%m")(point.data.x)}
            <br />
            <strong>人口数: </strong>
            {point.data.yFormatted}
          </div>
        )}
        legends={[
          {
            anchor: "top-left",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -30,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 12,
            symbolShape: "square",
          },
        ]}
        markers={[
          {
            axis: "x",
            value: covidStart,
            lineStyle: { stroke: "red", strokeWidth: 2 },
            legend: "COVID-19 Start",
            legendOrientation: "vertical",
          },
          {
            axis: "x",
            value: covidEnd,
            lineStyle: { stroke: "red", strokeWidth: 2 },
            legend: "COVID-19 End",
            legendOrientation: "vertical",
          },
        ]}
      />
    </div>
  );
};

export default Chart;
