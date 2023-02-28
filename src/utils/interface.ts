import { CutMode } from './enum';

export interface OptionProps {
  cutMode: CutMode;
  pixel: { width: number; height: number };
  amount: { row: number; col: number };
  scale: { width: number; height: number };
}
