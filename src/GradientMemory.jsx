import React, { useRef, useEffect } from "react";

const GradientMemory = ({ style }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvasのサイズを設定
    canvas.width = 40;
    canvas.height = 150;

    // グラデーションを作成
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "yellow");
    gradient.addColorStop(1, "blue");

    // 背景にグラデーションを適用
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return <canvas ref={canvasRef} style={style}></canvas>;
};

export default GradientMemory;
