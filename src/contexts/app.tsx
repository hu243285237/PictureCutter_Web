import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { CutMode, OptionConfig, AppContextType, DEFAULT_OPTION_CONFIG } from '../common';
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
  const [optionConfig, setOptionConfig] = useState<OptionConfig>(DEFAULT_OPTION_CONFIG);
  const [cutImgsURL, setCutImgsURL] = useState<Array<string>>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  console.log('--------------------------------');
  console.log('imgURL', imgURL);
  console.log('imgFormat', imgFormat);
  console.log('optionConfig', optionConfig);
  console.log('cutImgsURL', cutImgsURL);

  useEffect(() => {
    if (imgURL) {
      const format = imgURL.split(';')[0].split('/')[1];
      setImgFormat(format);
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
          }
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
          }
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
          }
        );
        break;
      default:
        alert('选择裁剪方式错误');
    }
  };

  /**
   * 处理选项配置更改时
   * @param newOption 选项配置
   */
  const handleOptionConfigChange = (newOptionConfig: OptionConfig) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setOptionConfig(newOptionConfig);
    }, 500);
  };

  const value: AppContextType = {
    imgURL,
    imgFormat,
    optionConfig,
    cutImgsURL,
    setImgURL,
    setOptionConfig: handleOptionConfigChange,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

const AppContext = createContext<AppContextType>(null as any);

export const useAppContext = () => useContext(AppContext);