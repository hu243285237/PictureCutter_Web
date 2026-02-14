import { useEffect, useRef, useState } from 'react';
import { Slider } from 'antd';
import { useAppContext } from '../../contexts';
import Step from '../Step';

/**
 * 预览
 */
export default function Preview() {
  const { cutImgsURL } = useAppContext();
  const [animateIndex, setAnimateIndex] = useState<number>(0);
  const [frameRate, setFrameRate] = useState<number>(10);
  const prevCutImgsURLRef = useRef<string>('');

  useEffect(() => {
    const currentKey = cutImgsURL.length > 0 ? cutImgsURL[0] + cutImgsURL.length : '';
    if (prevCutImgsURLRef.current !== currentKey) {
      prevCutImgsURLRef.current = currentKey;
      setAnimateIndex(0);
    }
  }, [cutImgsURL]);

  useEffect(() => {
    if (cutImgsURL.length === 0 || frameRate <= 0) return;

    const intervalMs = 1000 / frameRate;
    const timer = setInterval(() => {
      setAnimateIndex((prevIndex) => {
        if (prevIndex >= cutImgsURL.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [cutImgsURL.length, frameRate]);

  const handleFrameRateChange = (value: number): void => {
    if (!Number.isNaN(value)) setFrameRate(value);
  };

  return (
    <Step step={3} title="预览">
      {cutImgsURL.length > 0 && (
        <div className="flex flex-col gap-12">
          {/* 静态预览 */}
          <div className="flex flex-col items-center">
            <ul className="flex items-center p-2.5 h-[150px] w-[400px] max-w-full bg-[#f0f8ff] rounded-lg border-2 overflow-x-scroll">
              {cutImgsURL.map((item, index) => (
                <img
                  className="mx-2 max-h-full max-w-full shadow-[2px_2px_6px_2px_rgba(100,100,100,0.5)]"
                  key={index}
                  src={item}
                  alt=""
                  draggable="false"
                />
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-400">
              静态预览（共切割成 {cutImgsURL.length} 张图片）
            </p>
          </div>
          {/* 动态预览 */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col justify-center items-center p-2.5 h-[150px] w-[200px] rounded-lg border-2 bg-[#f0f8ff]">
              <img
                className="max-h-full max-w-full shadow-[2px_2px_6px_2px_rgba(100,100,100,0.5)]"
                src={cutImgsURL[animateIndex]}
                alt=""
                draggable="false"
              />
            </div>
            <div className="preview-speed-slider mt-2 w-[200px]">
              <Slider min={0} max={30} value={frameRate} onChange={handleFrameRateChange} />
            </div>
            <p className="mt-2 text-sm text-gray-400">动态预览（帧率：{frameRate} FPS）</p>
          </div>
        </div>
      )}
    </Step>
  );
}
