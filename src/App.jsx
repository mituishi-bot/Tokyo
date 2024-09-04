import React, { useState } from "react";
import Chart from "./polylineChart.jsx";
import KoronaChart from "./KoronaChart.jsx";
import populationData from "/assets/populationData.json";
import koronaData from "/assets/korona.json";
import "./App.css";

const App = () => {
  const [selectedDistrictIndexes, setSelectedDistrictIndexes] = useState([]);
  const [showPopulation, setShowPopulation] = useState(true);
  const [showKorona, setShowKorona] = useState(true);
  const [diffData, setDiffData] = useState([]);

  // チェックボックスの選択状態が変更
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

  console.log("data", populationData);

  return (
    <div className="app-container">
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

      <h2>東京23区の人口推移(2015年11月~2024年6月)</h2>
      <div className="toggle-container">
        <label>
          <input
            type="checkbox"
            checked={showPopulation}
            onChange={() => setShowPopulation(!showPopulation)}
          />
          人口推移
        </label>
        <label>
          <input
            type="checkbox"
            checked={showKorona}
            onChange={() => setShowKorona(!showKorona)}
          />
          コロナ感染者数推移
        </label>
      </div>
      <div className="content-container">
        <div className="chart-container">
          {showPopulation && selectedDistrictIndexes.length > 0 && (
            <Chart
              selectedDistrictIndexes={selectedDistrictIndexes}
              populationData={populationData}
            />
          )}
        </div>
      </div>
      <h2>コロナの感染者数推移(2020年3月~2022年9月)</h2>
      <div className="content-container">
        <div className="chart-container">
          {showKorona && selectedDistrictIndexes.length > 0 && (
            <KoronaChart
              selectedDistrictIndexes={selectedDistrictIndexes}
              koronaData={koronaData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
