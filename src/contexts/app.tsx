import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  CutMode,
  OptionConfig,
  AppContextType,
  DEFAULT_OPTION_CONFIG,
  DEFAULT_APP_CONTEXT_VALUE,
} from '../common';
import { amountCut, pixelCut, scaleCut } from '../utils/util';

/**
 * 参数
 */
interface Props {
  /**
   * 子组件
   */
  children: ReactNode;
}

/**
 * App 上下文提供者
 */
export function AppProvider(props: Props) {
  const { children } = props;
  const [imgURL, setImgURL] = useState<string>('');
  const [imgFormat, setImgFormat] = useState<string>('');
  const [imgWidth, setImgWidth] = useState<number>(0);
  const [imgHeight, setImgHeight] = useState<number>(0);
  const [optionConfig, setOptionConfig] = useState<OptionConfig>(
    DEFAULT_OPTION_CONFIG,
  );
  const [cutImgsURL, setCutImgsURL] = useState<string[]>([]);

  useEffect(() => {
    if (imgURL) {
      const format = imgURL.split(';')[0].split('/')[1];
      setImgFormat(format);
      const img = new Image();
      img.onload = () => {
        setImgWidth(img.naturalWidth);
        setImgHeight(img.naturalHeight);
      };
      img.src = imgURL;
    }
  }, [imgURL]);

  useEffect(() => {
    updateCutImgsURL();
  }, [imgURL, optionConfig]);

  /**
   * 更新裁剪后的图片 URL 组
   */
  const updateCutImgsURL = () => {
    if (!imgURL) return;
    const { cutMode, pixel, amount, scale } = optionConfig;
    switch (cutMode) {
      case CutMode.PIXEL:
        pixelCut(
          imgURL,
          pixel.width,
          pixel.height,
          imgFormat,
          (imgsURL: string[]) => {
            setCutImgsURL(imgsURL);
          },
        );
        break;
      case CutMode.AMOUNT:
        amountCut(
          imgURL,
          amount.row,
          amount.col,
          imgFormat,
          (imgsURL: string[]) => {
            setCutImgsURL(imgsURL);
          },
        );
        break;
      case CutMode.SCALE:
        scaleCut(
          imgURL,
          scale.width,
          scale.height,
          imgFormat,
          (imgsURL: string[]) => {
            setCutImgsURL(imgsURL);
          },
        );
        break;
      default:
        alert('选择裁剪方式错误');
    }
  };

  const value: AppContextType = {
    imgURL,
    imgFormat,
    imgWidth,
    imgHeight,
    optionConfig,
    cutImgsURL,
    setImgURL,
    setOptionConfig,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const AppContext = createContext<AppContextType>(DEFAULT_APP_CONTEXT_VALUE);

export const useAppContext = () => useContext(AppContext);
