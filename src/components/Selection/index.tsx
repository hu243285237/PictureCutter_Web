import { useRef, useState } from 'react';

interface Props {
  onInitImageEnd: Function;
}

export default function (props: Props) {
  const { onInitImageEnd } = props;

  const areaRef = useRef<any>(null);
  const fileInputRef = useRef<any>(null);
  const [fileName, setFileName] = useState<string>('');
  const [imgURL, setImgURL] = useState<string>('');
  const [img, setImg] = useState<HTMLImageElement>();

  const areaClick = (): void => {
    fileInputRef.current?.click();
  };

  const initImage = (event: any): void => {
    const file = event.target.files[0] as File;
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
    <div className="my-5 flex flex-col items-center justify-center text-aliceblue">
      <h2>STEP 1: 导入</h2>
      <div
        className="mb-4 flex h-[200px] w-[400px] max-w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white"
        ref={areaRef}
        onClick={areaClick}
      >
        {imgURL ? (
          <img className="max-h-full max-w-full" src={imgURL} alt="" />
        ) : (
          <div>
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
      {img ? (
        <>
          <p className="my-1.5">当前选择的图片：{fileName}</p>
          <p className="my-1.5">
            当前图片宽度和高度：{img.width} * {img.height}
          </p>
        </>
      ) : null}
    </div>
  );
}
