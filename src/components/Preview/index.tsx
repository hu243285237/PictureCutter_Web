import { useEffect, useState, useMemo, useRef } from 'react';
import { useAppContext } from '../../contexts';
import Step from '../Step';

/**
 * 预览
 */
export default function Preview() {
  const { cutImgsURL } = useAppContext();
  const [animateIndex, setAnimateIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(5);
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

  const staticPreviewImages = useMemo(() => {
    return cutImgsURL.map((item, index) => (
      <img
        className="mx-2 max-h-full max-w-full shadow-[2px_2px_6px_2px_rgba(100,100,100,0.5)]"
        key={index}
        src={item}
        alt=""
        draggable="false"
      />
    ));
  }, [cutImgsURL]);

  return (
    <Step step={3} title="预览">
      {/* 静态预览 */}
      <div>
        <p>静态预览（共切割成 {cutImgsURL.length} 张图片）</p>
        <div className="flex h-[140px] w-[390px] max-w-full items-center overflow-x-scroll rounded-lg border border-dashed bg-aliceblue p-2.5">
          {staticPreviewImages}
        </div>
      </div>
      {/* 动态预览 */}
      <div>
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
        <div className="flex h-[140px] w-[140px] items-center justify-center rounded-lg border border-dashed bg-aliceblue p-2.5">
          <img
            className="max-h-full max-w-full shadow-[2px_2px_6px_2px_rgba(100,100,100,0.5)]"
            src={cutImgsURL[animateIndex]}
            alt=""
            draggable="false"
          />
        </div>
      </div>
    </Step>
  );
}
