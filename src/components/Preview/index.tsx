import { useEffect, useState } from 'react';

interface Props {
  cutImgsURL: Array<string>;
}

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

  const handleSpeedChange = (event: any): void => {
    setSpeed(event.target.value);
  };

  return (
    <div className="my-5 flex flex-col items-center justify-center text-aliceblue">
      <h2>STEP 3: 预览</h2>
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
          <div className="mt-5 flex flex-col items-center justify-center">
            <p>动态预览（按序列播放）</p>
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
  );
}
