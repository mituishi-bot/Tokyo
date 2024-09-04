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
      data.year === showYear;
    });
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

  console.log(koronaDetail);

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
            <h2>東京23区の増減推移(2015年11月~2024年6月)</h2>
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
                  setYear={setYear}
                />
              )}
            </div>
          </div>

          <div className="right-side-content">
            <h3>新型コロナウイルスの経緯</h3>

            <p>2019-12月</p>
            <p>
              中国武漢市における原因不明のウイルス性肺炎の発生のかんして武漢当局が発表
            </p>

            <p>2020-1月</p>
            <p>国内初の新型コロナウイルス感染症患者</p>
            <p>WHOがHEICを宣言 政府に新型コロナウイルス感染症対策本部を設置</p>

            <p>2020-2月</p>
            <p>新型コロナウイルス感染症を感染症法における指定感染症に指定</p>
            <p>
              クルーズ船「ダイヤモンド・プリンセス号」の横浜・大黒ふ頭沖での検疫の開始
            </p>

            <p>「新型コロナウイルス感染症に関する緊急対応策」を決定</p>

            <p>「新型コロナウイルス感染症対策の基本方針」を決定</p>

            <p>全国規模のイベントの中止、延期、規模縮小等の対応を要請</p>

            <p>
              小学校・中学校高等学校等ついて、3月2日から春休みまでの臨時休校を要請
            </p>

            <p>2020-3月</p>
            <p>「新型コロナウイルス感染症に関する緊急対応策第2弾」を決定</p>

            <p>新型インフルエンザ等対策特別措置法の改正</p>

            <p>「新型コロナウイルス感染症対策の基本的対処方針」を決定</p>

            <p>2020-4月</p>
            <p>
              緊急事態宣言の発出
              （東京、埼玉、千葉、神奈川、大阪、兵庫、福岡、期限5月6日）
              「新型コロナウイルス感染症緊急経済対策」を決定
            </p>
            <p>
              緊急事態言の対象地域を全都道府県に拡大
              2020年度補正予算（第1次）が成立
            </p>

            <p>2020-5月</p>
            <p>緊急事態言の期限を5月末まで延長</p>
            <p>
              {" "}
              緊急事態言の対象地域を縮小（北海道、東京、埼玉、千葉、神奈川、京都、大阪、兵庫の8部
            </p>
            <p> 道府県を除く39県を解除）</p>
            <p> 緊急事態宣言の対象地域を縮小（京都、大阪、兵庫を解除）</p>
            <p> 緊急事言の全面解除</p>

            <p>2020-6月</p>
            <p>2020年度補正予算（第2次）が成立</p>
            <p> 都道府県をまたぐ移動自粛要請について全国的に緩和</p>

            <p>2020-7月</p>
            <p>GoTo トラベル事業の開始</p>

            <p>2020-8月</p>
            <p>「新型コロナウイルス感染症に関する今後の取組」を決定</p>

            <p>2020-9月</p>
            <p>催物の開催制限を条件付きで緩和</p>

            <p>2020-10月</p>
            <p>
              ビジネスや留学などの滞在者を対象にした入国制限が緩和（新規入国対象の拡大）
            </p>

            <p>2020-11月</p>
            <p>
              政府の新型コロナウイルス感染症対策分科会が緊急提言（最近の感染状況を踏まえたより一層の対策強化について）
            </p>

            <p>2020-12月</p>
            <p>
              予防接種法及び検疫法の一部を改正する法律が成立（9日公布・施行）
            </p>
            <p>
              「国民の命と暮らしを守る安心と希望のための総合経済対策」を開議決定
            </p>
            <p>GoTo トラベル事業の全国一時停止</p>
            <p>
              {" "}
              日本の空港検疫の陽性検体（5名）から英国で報告された変異株が初めて確認
            </p>
            <p>
              {" "}
              全世界からの外国人の新規入国を12月28日から令和3年1月末まで停止することを決定
            </p>

            <p>2021年-1月</p>
            <p> 緊急事言の発出（東京、埼玉、千葉、神奈川。期限2月7日）</p>
            <p>
              {" "}
              緊急事態言の対象地域を拡大（栃木、愛知、阜、大阪、京都、兵庫、福岡を追加。計11都府県）
            </p>
            <p>2020年度補正予算（第3次</p>

            <p>2021年-2月</p>
            <p>
              緊急事態宣言の期限の3月7日までの延長（栃木県以外の10部府県）を決定
            </p>
            <p>
              新型インフルエンザ等対策特別措置法、感染症法の改正法案が成立・公布（13日施行）
            </p>
            <p>
              {" "}
              緊急事態宣言の対象地域を縮小（愛知、岐阜、大阪、京都、兵庫、福岡の6府県を解除）
            </p>

            <p>2021年-3月</p>
            <p>
              緊急事態言の期限の3月21日までの再延長（東京、埼玉、千葉、神奈川）を決定
            </p>
            <p> 「緊急事言解除後の新型コロナウイルス感染症への対応」を決定</p>
            <p> 緊急事宜言の全面解除 令和3年度予算が成立 </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
