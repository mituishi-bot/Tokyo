import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const GradientMemory = ({ style }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvasのサイズを設定
    canvas.width = 40;
    canvas.height = 150;

    // グラデーションのステップ数を設定
    const steps = canvas.height;

    // 背景にグラデーションを適用
    for (let i = 0; i < steps; i++) {
      const color = d3.interpolateRdYlBu(i / (steps - 1));
      ctx.fillStyle = color;
      ctx.fillRect(0, i, canvas.width, 1);
    }
  }, []);

  return <canvas ref={canvasRef} style={style}></canvas>;
};

export default GradientMemory;
