import React, { useState } from "react";
import Chart from "./barChartData.jsx";
import populationData from "/assets/populationData.json"; // データファイルのインポート
import DrawMap from "./DrawMap";
import "./App.css"; // CSSファイルのインポート

const App = () => {
  const [selectedDistrictIndexes, setSelectedDistrictIndexes] = useState([]);

  //チェックボックスの選択状態が変更
  const handleDistrictChange = (index) => {
    const selectedIndex = selectedDistrictIndexes.indexOf(index);
    if (selectedIndex === -1) {
      // インデックスが選択されていない場合、追加する
      setSelectedDistrictIndexes([...selectedDistrictIndexes, index]);
    } else {
      // インデックスが選択されている場合、削除する
      setSelectedDistrictIndexes(
        selectedDistrictIndexes.filter((i) => i !== index)
      );
    }
  };

  return (
    <div className="app-container">
      <h2>東京23区のマップ</h2>
      <DrawMap selectedDistrictIndexes={selectedDistrictIndexes} />
      <h2>東京23区の折れ線グラフ</h2>
      <div className="content-container">
        <div className="chart-container">
          {selectedDistrictIndexes.length > 0 && (
            <Chart
              selectedDistrictIndexes={selectedDistrictIndexes}
              populationData={populationData}
            />
          )}
        </div>
      </div>
      <div className="checkbox-container">
        {populationData.map((district, index) => (
          <label key={index} className="checkbox-label">
            <input
              type="checkbox"
              value={index}
              checked={selectedDistrictIndexes.includes(index)}
              onChange={() => handleDistrictChange(index)}
            />
            <span className="checkmark"></span>
            {district.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default App;
