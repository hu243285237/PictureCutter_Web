import { AppContextType, CutMode, OptionConfig } from '..';

/**
 * 默认选项配置
 */
export const DEFAULT_OPTION_CONFIG: OptionConfig = {
  cutMode: CutMode.AMOUNT,
  pixel: { width: 128, height: 128 },
  amount: { row: 1, col: 1 },
  scale: { width: 1, height: 1 },
};

/**
 * 默认 App 上下文
 */
export const DEFAULT_APP_CONTEXT_VALUE: AppContextType = {
  imgURL: '',
  imgFormat: '',
  imgWidth: 0,
  imgHeight: 0,
  optionConfig: DEFAULT_OPTION_CONFIG,
  cutImgsURL: [],
  setImgURL: () => {},
  setOptionConfig: () => {},
};
