import { useEffect, useState } from 'react';
import './index.scss';

interface Props {
  cuttedImgsURL: Array<string>;
}

export default function (props: Props) {
  const { cuttedImgsURL } = props;
  const [animateIndex, setAnimateIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(5);

  let timer: NodeJS.Timer;

  useEffect(() => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (animateIndex >= cuttedImgsURL.length - 1) {
        setAnimateIndex(0);
      } else {
        setAnimateIndex(() => animateIndex + 1);
      }
    }, (11 - speed) * 20);
    return () => {
      clearInterval(timer);
    };
  }, [cuttedImgsURL, animateIndex, speed]);

  // 处理速度更改时
  const handleSpeedChange = (event: any): void => {
    setSpeed(event.target.value);
  };

  return (
    <div className="preview-container">
      <h2>STEP 3: 预览</h2>
      {cuttedImgsURL.length ? (
        <>
          <p>静态预览（共切割成 {cuttedImgsURL.length} 张图片）</p>
          <div className="list">
            {cuttedImgsURL.map((item, index) => {
              return (
                <img
                  className="list-item"
                  key={index}
                  src={item}
                  alt=""
                  draggable="false"
                ></img>
              );
            })}
          </div>
          <div className="animate">
            <p>动态预览（按序列播放）</p>
            <div className="animate-frame">
              <img
                className="animate-frame-img"
                src={cuttedImgsURL[animateIndex]}
                alt=""
                draggable="false"
              ></img>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
