import { useEffect, useState } from 'react';
import { CutMode } from '../../utils/enum';
import { OptionProps } from '../../utils/interface';

interface Props {
  defaultOption: OptionProps;
  onOptionChange: Function;
}

export default function (props: Props) {
  const { defaultOption, onOptionChange } = props;

  const [cutMode, setCutMode] = useState<CutMode>(defaultOption.cutMode);
  const [pixel, setPixel] = useState<{ width: number; height: number }>(
    defaultOption.pixel
  );
  const [amount, setAmount] = useState<{ row: number; col: number }>(
    defaultOption.amount
  );
  const [scale, setScale] = useState<{ width: number; height: number }>(
    defaultOption.scale
  );

  useEffect(() => {
    onOptionChange({
      cutMode,
      pixel,
      amount,
      scale,
    });
  }, [cutMode, pixel, amount, scale]);

  const frameCls = (mode: CutMode) =>
    `flex-1 ${cutMode === mode ? 'opacity-100' : 'opacity-30'}`;
  const titleCls = (mode: CutMode) =>
    `cursor-pointer pb-2 text-center hover:text-antiquewhite ${
      cutMode === mode ? 'border-b-[3px] border-solid border-white' : ''
    }`;

  return (
    <div className="my-5 flex flex-col items-center justify-center text-aliceblue">
      <h2>STEP 2: 选项</h2>
      <div className="flex w-[600px] max-w-full justify-around gap-4">
        <div className={frameCls(CutMode.PIXEL)}>
          <p
            className={titleCls(CutMode.PIXEL)}
            onClick={() => setCutMode(CutMode.PIXEL)}
          >
            以像素裁剪
          </p>
          <div className="mt-1 w-full space-y-1">
            <label className="flex items-center justify-center gap-2">
              <p>宽:</p>
              <input
                className="w-[42px]"
                type="number"
                defaultValue={pixel.width}
                min={1}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setPixel({ width: value, height: pixel.height });
                }}
              />
            </label>
            <label className="flex items-center justify-center gap-2">
              <p>高:</p>
              <input
                className="w-[42px]"
                type="number"
                defaultValue={pixel.height}
                min={1}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setPixel({ width: pixel.width, height: value });
                }}
              />
            </label>
          </div>
        </div>
        <div className={frameCls(CutMode.AMOUNT)}>
          <p
            className={titleCls(CutMode.AMOUNT)}
            onClick={() => setCutMode(CutMode.AMOUNT)}
          >
            以数量均等裁剪
          </p>
          <div className="mt-1 w-full space-y-1">
            <label className="flex items-center justify-center gap-2">
              <p>横向切割成几份:</p>
              <input
                className="w-[42px]"
                type="number"
                defaultValue={amount.row}
                min={1}
                step={1}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setAmount({ row: value, col: amount.col });
                }}
              />
            </label>
            <label className="flex items-center justify-center gap-2">
              <p>纵向切割成几份:</p>
              <input
                className="w-[42px]"
                type="number"
                defaultValue={amount.col}
                min={1}
                step={1}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setAmount({ row: amount.row, col: value });
                }}
              />
            </label>
          </div>
        </div>
        <div className={frameCls(CutMode.SCALE)}>
          <p
            className={titleCls(CutMode.SCALE)}
            onClick={() => setCutMode(CutMode.SCALE)}
          >
            以比例裁剪
          </p>
          <div className="mt-1 w-full space-y-1">
            <label className="flex items-center justify-center gap-2">
              <p>宽:</p>
              <input
                className="w-[42px]"
                type="number"
                defaultValue={scale.width}
                min={0}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setScale({ width: value, height: scale.height });
                }}
              />
            </label>
            <label className="flex items-center justify-center gap-2">
              <p>高:</p>
              <input
                className="w-[42px]"
                type="number"
                defaultValue={scale.height}
                min={0}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setScale({ width: scale.width, height: value });
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
