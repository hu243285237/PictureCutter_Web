import { useRef, useState } from 'react';
import './index.scss';

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

  // 区域点击事件
  const areaClick = (): void => {
    fileInputRef.current?.click();
  };

  // 初始化图片
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
    <div className="selection-container">
      <h2>STEP 1: 导入</h2>
      <div className="area" ref={areaRef} onClick={areaClick}>
        {imgURL ? (
          <img className="area-img" src={imgURL}></img>
        ) : (
          <div>
            <p>点击这里选择你要裁剪的图片</p>
            <p>click here to select</p>
          </div>
        )}
        <input
          className="area-file-input"
          ref={fileInputRef}
          type={'file'}
          accept="image/*"
          onChange={initImage}
        ></input>
      </div>
      {img ? (
        <>
          <p className='area-info'>当前选择的图片：{fileName}</p>
          <p className='area-info'>
            当前图片宽度和高度：{img.width} * {img.height}
          </p>
        </>
      ) : null}
    </div>
  );
}
