import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Selection from './components/Selection';
import Option from './components/Option';
import Preview from './components/Preview';
import Export from './components/Export';
import { CutMode } from './utils/enum';
import { OptionProps } from './utils/interface';
import { amountCut, pixelCut, scaleCut } from './utils/util';

function App() {
  const [imgURL, setImgURL] = useState<string>('');
  const [imgFormat, setImgFormat] = useState<string>('');
  const [option, setOption] = useState<OptionProps>({
    cutMode: CutMode.AMOUNT,
    pixel: { width: 128, height: 128 },
    amount: { row: 1, col: 1 },
    scale: { width: 1, height: 1 },
  });
  const [cutImgsURL, setCutImgsURL] = useState<Array<string>>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const format = imgURL.split(';')[0].split('/')[1];
    setImgFormat(format);
  }, [imgURL]);

  useEffect(() => {
    if (!imgURL) return;
    const { cutMode, pixel, amount, scale } = option;
    switch (cutMode) {
      case CutMode.PIXEL:
        pixelCut(
          imgURL,
          pixel.width,
          pixel.height,
          imgFormat,
          (imgsURL: string[]) => {
            setCutImgsURL(imgsURL);
          }
        );
        break;
      case CutMode.AMOUNT:
        amountCut(
          imgURL,
          amount.row,
          amount.col,
          imgFormat,
          (imgsURL: string[]) => {
            setCutImgsURL(imgsURL);
          }
        );
        break;
      case CutMode.SCALE:
        scaleCut(
          imgURL,
          scale.width,
          scale.height,
          imgFormat,
          (imgsURL: string[]) => {
            setCutImgsURL(imgsURL);
          }
        );
        break;
      default:
        alert('选择裁剪方式错误');
    }
  }, [imgURL, option]);

  // 处理当选项配置更改时
  const handleOptionChange = (option: OptionProps): void => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setOption(option);
    }, 500);
  };

  return (
    <div className="App text-center">
      <Header></Header>
      <Selection
        onInitImageEnd={(imgURL: string): void => {
          setImgURL(imgURL);
        }}
      ></Selection>
      {cutImgsURL.length ? (
        <>
          <Option
            defaultOption={option}
            onOptionChange={(option: OptionProps): void => {
              handleOptionChange(option);
            }}
          ></Option>
          <Preview cutImgsURL={cutImgsURL}></Preview>
          <Export imgsURL={cutImgsURL} format={imgFormat}></Export>
        </>
      ) : null}
    </div>
  );
}

export default App;
