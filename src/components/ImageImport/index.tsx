import { type ChangeEvent, useRef, useState } from 'react';
import { useAppContext } from '../../contexts';
import Step from '../Step';

/**
 * 图片导入
 */
export default function ImageImport() {
  const { imgURL, setImgURL } = useAppContext();
  const [fileName, setFileName] = useState<string>('');
  const [img, setImg] = useState<HTMLImageElement>();
  const areaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * 处理图片区域点击
   */
  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * 处理图片改变
   * @param event 事件
   */
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (window.FileReader) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        const imgURL = e.target?.result as string;
        const img = new Image();
        img.src = imgURL;
        setImg(img);
        setImgURL(imgURL);
        setFileName(file.name);
      };
    }
  };

  return (
    <Step step={1} title="导入">
      {/* 图片区域 */}
      <div
        className="flex flex-col items-center justify-center mb-4 h-[200px] w-[400px] rounded-lg border border-dashed cursor-pointer"
        ref={areaRef}
        onClick={handleAreaClick}
      >
        {imgURL ? (
          <img className="max-h-full max-w-full" src={imgURL} alt="" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-base text-gray-400">
            <p>点击这里选择你要裁剪的图片</p>
          </div>
        )}
        <input
          className="hidden"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {/* 图片信息 */}
      {img && (
        <p className="text-sm text-gray-400">
          {fileName} - {img.width} * {img.height}
        </p>
      )}
    </Step>
  );
}
