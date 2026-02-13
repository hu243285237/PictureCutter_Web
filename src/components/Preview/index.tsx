import { useEffect, useState, useMemo, useRef } from 'react';
import { useAppContext } from '../../contexts';
import Step from '../Step';

/**
 * 预览
 */
export default function Preview() {
  const { cutImgsURL } = useAppContext();
  const [animateIndex, setAnimateIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const prevCutImgsURLRef = useRef<string>('');

  useEffect(() => {
    const currentKey =
      cutImgsURL.length > 0 ? cutImgsURL[0] + cutImgsURL.length : '';
    if (prevCutImgsURLRef.current !== currentKey) {
      prevCutImgsURLRef.current = currentKey;
      setAnimateIndex(0);
    }
  }, [cutImgsURL]);

  useEffect(() => {
    if (cutImgsURL.length === 0) return;

    const timer = setInterval(
      () => {
        setAnimateIndex((prevIndex) => {
          if (prevIndex >= cutImgsURL.length - 1) {
            return 0;
          } else {
            return prevIndex + 1;
          }
        });
      },
      (11 - speed) * 20,
    );

    return () => clearInterval(timer);
  }, [cutImgsURL.length, speed]);

  const handleSpeedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const v = Number(event.target.value);
    if (!Number.isNaN(v)) setSpeed(v);
  };

  return (
    <Step step={3} title="预览">
      {cutImgsURL.length && (
        <div className="flex flex-row gap-10">
          {/* 静态预览 */}
          <div className="flex flex-col items-center">
            <li className="flex p-2.5 h-[150px] w-[400px] max-w-full bg-[#f0f8ff] rounded-lg border border-dashed overflow-x-scroll">
              {cutImgsURL.map((item, index) => (
                <img
                  className="mx-2 max-h-full max-w-full shadow-[2px_2px_6px_2px_rgba(100,100,100,0.5)]"
                  key={index}
                  src={item}
                  alt=""
                  draggable="false"
                />
              ))}
            </li>
            <p className="mt-4 text-sm text-gray-400">
              静态预览（共切割成 {cutImgsURL.length} 张图片）
            </p>
          </div>
          {/* 动态预览 */}
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center p-2.5 h-[150px] w-[150px] bg-[#f0f8ff] rounded-lg border border-dashed">
              <img
                className="max-h-full max-w-full shadow-[2px_2px_6px_2px_rgba(100,100,100,0.5)]"
                src={cutImgsURL[animateIndex]}
                alt=""
                draggable="false"
              />
            </div>
            <p className="mt-4 text-sm text-gray-400">动态预览</p>
            {/* <div className="flex items-center gap-2 mt-4 text-sm">
              <span>速度</span>
              <input
                type="range"
                min={1}
                max={10}
                value={speed}
                onChange={handleSpeedChange}
                className="w-24 accent-white"
              />
            </div> */}
          </div>
        </div>
      )}
    </Step>
  );
}
