import React from "react";
import { ResponsiveLine } from "@nivo/line";
import * as d3 from "d3";

const Chart = ({ selectedDistrictIndexes, populationData, setYear }) => {
  // 選択された区のデータを取得
  const selectedData = selectedDistrictIndexes.map(
    (index) => populationData[index]
  );

  const chartData = [];
  for (const district of selectedData) {
    const data = [];
    for (let i = 1; i < district.data.length; i++) {
      console.log(
        district.data[i - 1],
        district.data[i],
        district.data[i - 1] - district.data[i]
      );
      const item = {
        x: new Date(district.data[i].year),
        y: district.data[i].population - district.data[i - 1].population,
      };
      data.push(item);
    }
    const districtData = {
      id: district.name,
      data: data,
    };
    chartData.push(districtData);
  }

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
    ...chartData.flatMap((district) => district.data.map((item) => item.y))
  );

  // COVID-19期間の設定
  const covidStart = new Date("2020-03");
  const firstWave = new Date("2020-07");
  const secondWave = new Date("2020-11");
  const thirdWave = new Date("2021-03");
  const fourthWave = new Date("2021-07");
  const fifthWave = new Date("2021-12");
  const sixWave = new Date("2022-06");
  const covidEnd = new Date("2022-09");

  const Wave = [
    covidStart,
    firstWave,
    secondWave,
    thirdWave,
    fourthWave,
    fifthWave,
    sixWave,
    covidEnd,
  ];

  const WaveColor = [
    "rgba(0,0, 255 ,0.5)",
    "rgba(0,0, 255, 0.45)",
    "rgba(0,0, 255, 0.4)",
    "rgba(0,0, 255, 0.35)",
    "rgba(0,0, 255, 0.3)",
    "rgba(0,0, 255, 0.25)",
    "rgba(0,0, 255, 0.2)",
    "rgba(0,0, 255, 0.1)",
  ];

  const waveLayer = ({ xScale, yScale }) => {
    return (
      <>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
          <rect
            key={index}
            x={xScale(Wave[index])}
            width={xScale(Wave[index + 1]) - xScale(Wave[index])}
            height={yScale.range()[0] - yScale.range()[1]}
            fill={WaveColor[index]}
          />
        ))}
      </>
    );
  };

  const backgroundLayer = ({ xScale, yScale }) => {
    return (
      <rect
        x={xScale(covidStart)}
        width={xScale(covidEnd) - xScale(covidStart)}
        height={yScale.range()[0] - yScale.range()[1]}
        fill="rgba(255, 0, 0, 0.2)"
      />
    );
  };

  const handMouseOver = ({ data }) => {
    setYear(data.xFormatted);
  };

  return (
    <div style={{ height: "600px" }}>
      <ResponsiveLine
        data={chartData}
        colors={colorScale}
        lineWidth={3}
        margin={{ top: 40, right: 50, bottom: 50, left: 120 }}
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
          legend: "増減数",
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
            translateX: -50,
            translateY: -40,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 70,
            itemHeight: 10,
            symbolSize: 10,
            symbolShape: "square",
            wrap: 20,
            itemTextColor: "#000",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#f00",
                },
              },
            ],
          },
        ]}
        markers={[
          {
            axis: "x",
            value: covidStart,
            lineStyle: { stroke: "blue", strokeWidth: 2 },
            legend: "コロナ初",
            legendOrientation: "vertical",
          },
          {
            axis: "x",
            value: covidEnd,
            lineStyle: { stroke: "blue", strokeWidth: 2 },
            legend: "コロナ終",
            legendOrientation: "vertical",
          },
        ]}
        layers={[
          "grid",
          waveLayer,
          backgroundLayer,
          "markers",
          "axes",
          "areas",
          "crosshair",
          "lines",
          "points",
          "slices",
          "mesh",
          "legends",
        ]}
        onMouseMove={handMouseOver}
      />
    </div>
  );
};

export default Chart;
