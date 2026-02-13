import { useAppContext } from '../../contexts';
import { CutMode } from '../../common';
import Step from '../Step';

/**
 * 选项
 */
export default function Option() {
  const { optionConfig, setOptionConfig } = useAppContext();

  const { cutMode, pixel, amount, scale } = optionConfig;

  const frameCls = (mode: CutMode) =>
    `flex-1 ${cutMode === mode ? 'opacity-100' : 'opacity-30'}`;
  const titleCls = (mode: CutMode) =>
    `cursor-pointer pb-2 text-center hover:text-antiquewhite ${cutMode === mode ? 'border-b-[3px] border-solid border-white' : ''
    }`;

  return (
    <Step step={2} title="选项">
      <div className="flex w-[600px] max-w-full justify-around gap-4">
        {/* 以像素裁剪 */}
        <div className={frameCls(CutMode.PIXEL)}>
          <p
            className={titleCls(CutMode.PIXEL)}
            onClick={() => setOptionConfig({ ...optionConfig, cutMode: CutMode.PIXEL })}
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
                  setOptionConfig({ ...optionConfig, pixel: { width: value, height: pixel.height } });
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
                  setOptionConfig({ ...optionConfig, pixel: { width: pixel.width, height: value } });
                }}
              />
            </label>
          </div>
        </div>
        {/* 以数量均等裁剪 */}
        <div className={frameCls(CutMode.AMOUNT)}>
          <p
            className={titleCls(CutMode.AMOUNT)}
            onClick={() => setOptionConfig({ ...optionConfig, cutMode: CutMode.AMOUNT })}
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
                  setOptionConfig({ ...optionConfig, amount: { row: value, col: amount.col } });
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
                  setOptionConfig({ ...optionConfig, amount: { row: amount.row, col: value } });
                }}
              />
            </label>
          </div>
        </div>
        {/* 以比例裁剪 */}
        <div className={frameCls(CutMode.SCALE)}>
          <p
            className={titleCls(CutMode.SCALE)}
            onClick={() => setOptionConfig({ ...optionConfig, cutMode: CutMode.SCALE })}
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
                  setOptionConfig({ ...optionConfig, scale: { width: value, height: scale.height } });
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
                  setOptionConfig({ ...optionConfig, scale: { width: scale.width, height: value } });
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </Step>
  );
}
