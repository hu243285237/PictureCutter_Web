import { CutMode, OptionConfig } from '..';

/**
 * 默认选项配置
 */
export const DEFAULT_OPTION_CONFIG: OptionConfig = {
  cutMode: CutMode.AMOUNT,
  pixel: { width: 128, height: 128 },
  amount: { row: 1, col: 1 },
  scale: { width: 1, height: 1 },
};
