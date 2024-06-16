import React, { useEffect } from "react";
import * as d3 from "d3"; // D3.jsをインポート
import tiikiData from "./region.json"; // tiiki.jsonの読み込み

function App() {
  useEffect(() => {
    drawMap();
  }, []);

  const drawMap = () => {
    const width = 800; // 描画サイズ: 幅
    const height = 600; // 描画サイズ: 高さ

    // SVG要素を追加
    const svg = d3
      .select("#map-container")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%");

    // 地図投影設定
    const projection = d3.geoMercator().fitSize([width, height], tiikiData);

    // 地図をpathに投影(変換)
    const path = d3.geoPath().projection(projection);

    // 地図データを描画
    svg
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
        d3.select(this).attr("fill", "#CC4C39").attr("stroke-width", "1");
      })
      .on("mouseout", function (event, d) {
        d3.select(this).attr("fill", "#2566CC").attr("stroke-width", "0.5");
      });
  };

  return <div id="map-container"></div>;
}

export default App;
