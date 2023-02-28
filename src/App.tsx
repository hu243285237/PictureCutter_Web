import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Selection from './components/Selection';
import Option from './components/Option';
import Preview from './components/Preview';
import Export from './components/Export';
import { CutMode } from './utils/enum';
import { OptionProps } from './utils/interface';
import { amountCut, pixelCut, scaleCut } from './utils/util';
import './App.css';

function App() {
  const [imgURL, setImgURL] = useState<string>('');
  const [imgFormat, setImgFormat] = useState<string>('');
  const [option, setOption] = useState<OptionProps>({
    cutMode: CutMode.AMOUNT,
    pixel: { width: 128, height: 128 },
    amount: { row: 1, col: 1 },
    scale: { width: 1, height: 1 },
  });
  const [cuttedImgsURL, setCuttedImgsURL] = useState<Array<string>>([]);

  let timer: NodeJS.Timer;

  useEffect(() => {
    const format = imgURL.split(';')[0].split('/')[1];
    setImgFormat(format);
  }, [imgURL]);

  useEffect(() => {
    if (!imgURL) return;
    const { cutMode, pixel, amount, scale } = option;
    let cuttedImgs = new Array<string>();
    switch (cutMode) {
      case CutMode.PIXEL:
        cuttedImgs = pixelCut(imgURL, pixel.width, pixel.height, imgFormat);
        break;
      case CutMode.AMOUNT:
        cuttedImgs = amountCut(imgURL, amount.row, amount.col, imgFormat);
        break;
      case CutMode.SCALE:
        cuttedImgs = scaleCut(imgURL, scale.width, scale.height, imgFormat);
        break;
      default:
        alert('选择裁剪方式错误');
    }
    setCuttedImgsURL(cuttedImgs);
  }, [imgURL, option]);

  // 处理当选项配置更改时
  const handleOptionChange = (option: OptionProps): void => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOption(option);
    }, 500);
  };

  return (
    <div className="App">
      <Header></Header>
      <Selection
        onInitImageEnd={(imgURL: string): void => {
          setImgURL(imgURL);
        }}
      ></Selection>
      {cuttedImgsURL.length ? (
        <>
          <Option
            defaultOption={option}
            onOptionChange={(option: OptionProps): void => {
              handleOptionChange(option);
            }}
          ></Option>
          <Preview cuttedImgsURL={cuttedImgsURL}></Preview>
          <Export imgsURL={cuttedImgsURL} format={imgFormat}></Export>
        </>
      ) : null}
    </div>
  );
}

export default App;
