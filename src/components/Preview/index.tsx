import { useEffect, useState } from 'react';
import Step from '../Step';

/**
 * 参数
 */
interface Props {
  /**
   * 切割后的图片 URL
   */
  cutImgsURL: Array<string>;
}

/**
 * 预览
 */
export default function (props: Props) {
  const { cutImgsURL } = props;
  const [animateIndex, setAnimateIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(5);

  useEffect(() => {
    const timer = setInterval(() => {
      if (animateIndex >= cutImgsURL.length - 1) {
        setAnimateIndex(0);
      } else {
        setAnimateIndex(() => animateIndex + 1);
      }
    }, (11 - speed) * 20);
    return () => clearInterval(timer);
  }, [cutImgsURL, animateIndex, speed]);

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const v = Number(event.target.value);
    if (!Number.isNaN(v)) setSpeed(v);
  };

  return (
    <Step step={3} title="预览">
      <div className="flex flex-col items-center justify-center text-aliceblue w-full">
        {cutImgsURL.length ? (
          <>
            <p>静态预览（共切割成 {cutImgsURL.length} 张图片）</p>
            <div className="flex h-[140px] w-[390px] max-w-full items-center overflow-x-scroll rounded-lg border-[3px] border-dashed border-white bg-aliceblue p-2.5">
              {cutImgsURL.map((item, index) => (
                <img
                  className="mx-2 max-h-full max-w-full shadow-[2px_2px_6px_2px_rgba(100,100,100,0.5)]"
                  key={index}
                  src={item}
                  alt=""
                  draggable="false"
                />
              ))}
            </div>
            <div className="mt-5 flex flex-col items-center justify-center gap-2">
              <p>动态预览（按序列播放）</p>
              <div className="flex items-center gap-2 text-sm">
                <span>速度</span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={speed}
                  onChange={handleSpeedChange}
                  className="w-24 accent-white"
                />
              </div>
              <div className="flex h-[140px] w-[140px] items-center justify-center rounded-lg border-[3px] border-dashed border-white bg-aliceblue p-2.5">
                <img
                  className="max-h-full max-w-full shadow-[2px_2px_6px_2px_rgba(100,100,100,0.5)]"
                  src={cutImgsURL[animateIndex]}
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </Step>
  );
}
