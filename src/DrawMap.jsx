import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import tiikiData from "/assets/tiiki.json";

const DrawMap = () => {
  const mapContainer = useRef(null);
  const projectionRef = useRef(null);
  useEffect(() => {
    const width = 800;
    const height = 600;

    let svg = d3.select(mapContainer.current).select("svg");

    svg = d3
      .select(mapContainer.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "50%")
      .attr("height", "50%");

    svg.append("g").attr("class", "map");

    d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("display", "none");

    // プロジェクションを初期化してrefに保存する
    const projectionDamy = d3.geoMercator().fitSize([width, height], tiikiData);
    projectionRef.current = projectionDamy;

    const tooltip = d3.select(".tooltip");
    const projection = projectionRef.current;
    const path = d3.geoPath().projection(projection);

    // 地図のパス要素をアップデート
    const paths = svg
      .select(".map")
      .selectAll("path")
      .data(
        tiikiData.features.filter((feature) => feature.geometry !== null),
        (d) => d.properties.id
      );

    paths
      .enter()
      .append("path")
      .attr("d", path)
      .attr("stroke", "#666")
      .attr("stroke-width", 0.5)
      .attr("fill", "#2566CC")
      .attr("fill-opacity", 0.7)
      .on("mouseover", (event, d) => {
        tooltip
          .style("display", "block")
          .html(d.properties.name)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
        d3.select(event.currentTarget).attr("stroke-width", "1");
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseout", (event) => {
        tooltip.style("display", "none");
        d3.select(event.currentTarget).attr("stroke-width", "0.5");
      })

      .attr("d", path);
  }, []);

  return <div ref={mapContainer} style={{ width: "70%" }}></div>;
};

export default DrawMap;
