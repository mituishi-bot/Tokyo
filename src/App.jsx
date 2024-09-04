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

  // すべての選択をクリア
  const clearSelections = () => {
    setSelectedDistrictIndexes([]);
  };

  // すべての区を選択
  const selectAllDistricts = () => {
    const allDistrictIndexes = populationData.map((_, index) => index);
    setSelectedDistrictIndexes(allDistrictIndexes);
  };

  // グレー背景かどうかを判定する関数
  const shouldShowGreyBackground = (showChart) => {
    return !(selectedDistrictIndexes.length > 0 && showChart);
  };

  return (
    <div className="app-container">
      <div className="checkbox-container">
        <div className="button-container">
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
          <button className="botton-style" onClick={selectAllDistricts}>
            すべて選択
          </button>
          <button className="botton-style" onClick={clearSelections}>
            選択をクリア
          </button>
        </div>
      </div>

      <div className="toggle-container">
        <label className="toggle-margin">
          <input
            type="checkbox"
            checked={showPopulation}
            onChange={() => setShowPopulation(!showPopulation)}
          />
          増減推移
        </label>
        <label className="toggle-margin">
          <input
            type="checkbox"
            checked={showKorona}
            onChange={() => setShowKorona(!showKorona)}
          />
          コロナ感染者数推移
        </label>
      </div>

      <h2>東京23区の増減推移(2015年11月~2024年6月)</h2>
      <div
        className={`content-container ${
          shouldShowGreyBackground(showPopulation) ? "grey-background" : ""
        }`}
      >
        {shouldShowGreyBackground(showPopulation) && (
          <h3 className="selection">選択してください</h3>
        )}

        {showPopulation && selectedDistrictIndexes.length > 0 && (
          <Chart
            selectedDistrictIndexes={selectedDistrictIndexes}
            populationData={populationData}
          />
        )}
      </div>

      <h2>コロナの感染者数推移(2020年3月~2022年9月)</h2>
      <div
        className={`content-container ${
          shouldShowGreyBackground(showKorona) ? "grey-background" : ""
        }`}
      >
        {shouldShowGreyBackground(showKorona) && (
          <h3 className="selection">選択してください</h3>
        )}

        {showKorona && selectedDistrictIndexes.length > 0 && (
          <KoronaChart
            selectedDistrictIndexes={selectedDistrictIndexes}
            koronaData={koronaData}
          />
        )}
      </div>
    </div>
  );
};

export default App;
