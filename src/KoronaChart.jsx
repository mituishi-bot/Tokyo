import React from "react";
import { ResponsiveLine } from "@nivo/line";
import * as d3 from "d3";

const KoronaChart = ({ selectedDistrictIndexes, koronaData, setYear }) => {
  const selectedData = selectedDistrictIndexes.map(
    (index) => koronaData[index]
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
  const covidStart = new Date("2020-04");
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

  const WaveName = [
    "コロナ初",
    "第一波",
    "第二波",
    "第三波",
    "第四波",
    "第五波",
    "第六波",
    "コロナ終",
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
          legend: "感染者数",
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
              padding: "5px 12px",
              border: "1px solid #ccc",
            }}
          >
            <strong>{point.serieId}</strong>
            <br />
            <strong>年: </strong>
            {d3.timeFormat("%Y-%m")(point.data.x)}
            <br />
            <strong>感染者数: </strong>
            {point.data.yFormatted}
          </div>
        )}
        legends={[
          {
            anchor: "top-left", //左上に配置
            direction: "row", // 横に並べる
            justify: false, // 項目の配置を均等
            translateX: 0, // X方向に移動
            translateY: -30, // Y方向に移動
            itemsSpacing: 0, // 項目間のスペースを指定
            itemDirection: "left-to-right", // 項目の並べ方向を指定
            itemWidth: 80, // 各項目の幅
            itemHeight: 20, // 各項目の高さ
            symbolSize: 12, // サイズを指定
            symbolShape: "square", // 形状を指定
          },
        ]}
        markers={[0, 1, 2, 3, 4, 5, 6, 7].map((index) => {
          const obj = {
            axis: "x",
            value: Wave[index],
            lineStyle: { stroke: "blue", strokeWidth: 2 },
            legend: WaveName[index],
            legendOrientation: "vertical",
          };
          return obj;
        })}
        layers={[
          "grid",
          backgroundLayer,
          waveLayer,
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

export default KoronaChart;
