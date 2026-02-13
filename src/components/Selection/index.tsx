import { type ChangeEvent, useRef, useState } from 'react';
import Step from '../Step';

/**
 * 参数
 */
interface Props {
  /**
   * 初始化图片结束回调
   * @param imgURL 图片URL
   */
  onInitImageEnd: (imgURL: string) => void;
}

/**
 * 导入
 */
export default function (props: Props) {
  const { onInitImageEnd } = props;
  const areaRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [imgURL, setImgURL] = useState<string>('');
  const [img, setImg] = useState<HTMLImageElement | undefined>(undefined);

  /**
   * 图片区域点击
   */
  const areaClick = (): void => {
    fileInputRef.current?.click();
  };

  /**
   * 初始化图片
   * @param event 事件
   */
  const initImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (window.FileReader) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        setFileName(file.name);
        const imgURL = e.target?.result as string;
        const img = new Image();
        img.src = imgURL;
        setImg(img);
        setImgURL(imgURL);
        onInitImageEnd(imgURL);
      };
    }
  };

  return (
    <Step step={1} title="导入">
      {/* 图片区域 */}
      <div
        className="flex flex-col items-center justify-center mb-4 h-[200px] w-[400px] rounded-lg border border-dashed cursor-pointer"
        ref={areaRef}
        onClick={areaClick}
      >
        {imgURL ? (
          <img className="max-h-full max-w-full" src={imgURL} alt="" />
        ) : (
          <div className='flex flex-col gap-2 text-base text-gray-400'>
            <p>点击这里选择你要裁剪的图片</p>
            <p>click here to select</p>
          </div>
        )}
        <input
          className="hidden"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={initImage}
        />
      </div>
      {/* 图片信息 */}
      {img && (
        <p className='text-sm text-gray-400'>
          {fileName} - {img.width} * {img.height}
        </p>
      )}
    </Step>
  );
}
