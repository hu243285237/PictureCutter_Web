import { CutMode } from '..';

/**
 * 选项配置
 */
export interface OptionConfig {
  /**
   * 裁剪模式
   */
  cutMode: CutMode;
  /**
   * 像素
   */
  pixel: { width: number; height: number };
  /**
   * 数量
   */
  amount: { row: number; col: number };
  /**
   * 比例
   */
  scale: { width: number; height: number };
}

/**
 * App 上下文
 */
export interface AppContextType {
  /**
   * 图片 URL
   */
  imgURL: string;
  /**
   * 图片格式
   */
  imgFormat: string;
  /**
   * 选项配置
   */
  optionConfig: OptionConfig;
  /**
   * 裁剪后的图片 URL 组
   */
  cutImgsURL: Array<string>;
  /**
   * 设置图片 URL
   */
  setImgURL: (url: string) => void;
  /**
   * 设置选项配置
   */
  setOptionConfig: (optionConfig: OptionConfig) => void;
}
