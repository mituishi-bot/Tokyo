import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import tiikiData from "/data.json"; // GeoJSONデータのインポート
import tokyoData from "./Tokyo.json"; // 東京の人口データのインポート
import "./App.css";
import GradientMemory from "./GradientMemory";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [selectedWard, setSelectedWard] = useState("千代田区"); // デフォルトは千代田区
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    const createdSvg = drawMap();
    setSvg(createdSvg);
  }, []);

  const drawMap = () => {
    const width = 800;
    const height = 600;

    const createdSvg = d3
      .select("#map-container")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "80%")
      .attr("height", "80%");

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("display", "none");

    const projection = d3.geoMercator().fitSize([width, height], tiikiData);
    const path = d3.geoPath().projection(projection);

    createdSvg
      .selectAll("path")
      .data(tiikiData.features.filter((feature) => feature.geometry !== null))
      .enter()
      .append("path")
      .attr("d", path)
      .attr("stroke", "#666")
      .attr("stroke-width", 0.5)
      .attr("fill", "#2566CC")
      .attr("fill-opacity", 0.7)
      .on("mouseover", function (event, d) {
        tooltip
          .style("display", "block")
          .html(d.properties.name)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
        d3.select(this).attr("stroke-width", "1");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
        d3.select(this).attr("stroke-width", "0.5");
      });

    return createdSvg;
  };

  const getColorScale = (data) => {
    const maxPopulation = d3.max(Object.values(data));
    return d3.scaleSequential(d3.interpolateReds).domain([0, maxPopulation]);
  };

  const handleSelectChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);

    const [era, month] = date.split(" ");
    let yearData = null;

    if (
      ["平成27年", "平成28年", "平成29年", "平成30年", "平成31年"].includes(era)
    ) {
      yearData = tokyoData.area[0][selectedWard][era];
    } else if (["令和元年", "令和2年"].includes(era)) {
      yearData = tokyoData.area[0][selectedWard][era];
    }
    console.log(yearData);
    if (yearData && yearData[month]) {
      setPopulationData(yearData[month]);
      updateMapColors(yearData[month]);
    } else {
      setPopulationData(null);
      updateMapColors({});
    }
  };

  const updateMapColors = (populationData) => {
    if (!svg) return;

    const colorScale = getColorScale(populationData);

    svg.selectAll("path").attr("fill", (d) => {
      const name = d.properties.name;
      const population = populationData[name] || 0;
      return colorScale(population);
    });
  };

  // 全ての年月をリスト化
  const dates = [
    "平成27年 11月",
    "平成27年 12月",
    "平成28年 1月",
    "平成28年 2月",
    "平成28年 3月",
    "平成28年 4月",
    "平成28年 5月",
    "平成28年 6月",
    "平成28年 7月",
    "平成28年 8月",
    "平成28年 9月",
    "平成28年 10月",
    "平成28年 11月",
    "平成28年 12月",
    "平成29年 1月",
    "平成29年 2月",
    "平成29年 3月",
    "平成29年 4月",
    "平成29年 5月",
    "平成29年 6月",
    "平成29年 7月",
    "平成29年 8月",
    "平成29年 9月",
    "平成29年 10月",
    "平成29年 11月",
    "平成29年 12月",
    "平成30年 1月",
    "平成30年 2月",
    "平成30年 3月",
    "平成30年 4月",
    "平成30年 5月",
    "平成30年 6月",
    "平成30年 7月",
    "平成30年 8月",
    "平成30年 9月",
    "平成30年 10月",
    "平成30年 11月",
    "平成30年 12月",
    "平成31年 1月",
    "平成31年 2月",
    "平成31年 3月",
    "平成31年 4月",
    "令和元年 5月",
    "令和元年 6月",
    "令和元年 7月",
    "令和元年 8月",
    "令和元年 9月",
    "令和元年 10月",
    "令和元年 11月",
    "令和元年 12月",
    "令和2年 1月",
    "令和2年 2月",
    "令和2年 3月",
    "令和2年 4月",
    "令和2年 5月",
    "令和2年 6月",
    "令和2年 7月",
    "令和2年 8月",
    "令和2年 9月",
    "令和2年 10月",
  ];

  const data = {
    series: [
      { name: "Series 1" },
      { name: "Series 2" },
      { name: "Series 3" },
      { name: "Series 4" },
      { name: "Series 5" },
    ],
  };

  const color = (index) => {
    const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF5733", "#57FF33"];
    return colors[index % colors.length];
  };

  return (
    <div className="container">
      <GradientMemory
        style={{
          position: "relative",
          left: "30px",
          top: "-50px",
        }}
      />

      <div id="map-container" style={{ width: "80%", height: "80vh" }}></div>
      <div className="sidebar">
        <h1 className="subTitle">東京の人口データ</h1>
        <form>
          <select className="custom-select" onChange={handleSelectChange}>
            <option value="">選択してください</option>
            {dates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>
        </form>
        {selectedDate && (
          <div>
            <h2>{selectedDate}の人口</h2>
            <p>{JSON.stringify(populationData)}</p>
          </div>
        )}
      </div>

      <svg
        width={100}
        height={data.series.length * 30}
        style={{ overflow: "visible" }}
      >
        {data.series.map((series, i) => (
          <g key={i} transform={`translate(0, ${i * 30})`}>
            <rect width={20} height={20} fill={color(i)} />
            <text x={25} y={15} alignmentBaseline="middle">
              {series.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default App;
