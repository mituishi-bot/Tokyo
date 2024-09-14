import React, { useState, useEffect } from "react";
import Chart from "./polylineChart.jsx";
import KoronaChart from "./KoronaChart.jsx";
import populationData from "/assets/populationData.json";
import koronaData from "/assets/korona.json";
import koronaDetail from "/assets/koronaDetail.json";
import "./App.css";

const App = () => {
  const [selectedDistrictIndexes, setSelectedDistrictIndexes] = useState([]);
  const [showPopulation, setShowPopulation] = useState(true);
  const [showKorona, setShowKorona] = useState(true);
  const [showYear, setYear] = useState(undefined);
  const [koronaBackground, setBackground] = useState(undefined);

  useEffect(() => {
    const detail = koronaDetail.find((data) => {
      return data.year === showYear;
    });
    console.log(detail, showYear);
    setBackground(detail);
  }, [showYear]);

  const handleDistrictChange = (index) => {
    const selectedIndex = selectedDistrictIndexes.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedDistrictIndexes([...selectedDistrictIndexes, index]);
    } else {
      setSelectedDistrictIndexes(
        selectedDistrictIndexes.filter((i) => i !== index)
      );
    }
  };

  const clearSelections = () => {
    setSelectedDistrictIndexes([]);
  };

  const selectAllDistricts = () => {
    const allDistrictIndexes = populationData.map((_, index) => index);
    setSelectedDistrictIndexes(allDistrictIndexes);
  };

  const shouldShowGreyBackground = (showChart) => {
    return !(selectedDistrictIndexes.length > 0 && showChart);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div>
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
            <div className="button-container">
              <label className="checkbox-label toggle-margin">
                <input
                  type="checkbox"
                  checked={showPopulation}
                  onChange={() => setShowPopulation(!showPopulation)}
                />
                <span className="checkmark"></span>
                増減推移
              </label>

              <label className="checkbox-label toggle-margin">
                <input
                  type="checkbox"
                  checked={showKorona}
                  onChange={() => setShowKorona(!showKorona)}
                />
                <span className="checkmark"></span>
                コロナ感染者数推移
              </label>
            </div>
          </div>
        </div>

        <div className="division">
          <div className="tokyo-division">
            <h2>東京23区の人口増減推移(2015年11月~2024年6月)</h2>
            <div
              className={`content-container ${
                shouldShowGreyBackground(showPopulation)
                  ? "grey-background"
                  : ""
              }`}
            >
              {shouldShowGreyBackground(showPopulation) && (
                <h3 className="selection">選択してください</h3>
              )}

              {showPopulation && selectedDistrictIndexes.length > 0 && (
                <Chart
                  selectedDistrictIndexes={selectedDistrictIndexes}
                  populationData={populationData}
                  setYear={setYear}
                />
              )}
            </div>

            <h2>コロナの感染者増減推移(2020年4月~2022年9月)</h2>
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
                  setYear={setYear}
                />
              )}
            </div>
          </div>

          <div className="right-side-content">
            <h3>新型コロナウイルスの経緯</h3>
            {koronaBackground ? (
              <div className="korona-background">
                <p>年: {koronaBackground.year}</p>
                <p>説明: {koronaBackground.event}</p>
              </div>
            ) : (
              <p>年を選択してください。</p>
            )}
            <footer>
              <p>
                感染対策:
                <a
                  href="https://www.mhlw.go.jp/stf/wp/hakusyo/kousei/20/backdata/8-3-1.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  厚生労働省-新型コロナウイルス感染症を巡るこれまでの経緯
                </a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
