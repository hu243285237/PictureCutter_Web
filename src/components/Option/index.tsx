import { InputNumber } from 'antd';
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
    `cursor-pointer mb-4 pb-2 text-center hover:text-amber-100 border-b-[2px] ${cutMode === mode ? 'border-white' : 'border-transparent'}`;

  const labelCls =
    'flex items-center justify-center gap-2 whitespace-nowrap flex-nowrap';
  const ulCls = 'space-y-2';
  const inputNumberCls = 'w-[78px]!';

  return (
    <Step step={2} title="选项">
      <div className="flex gap-12">
        {/* 以像素裁剪 */}
        <div className={frameCls(CutMode.PIXEL)}>
          <p
            className={titleCls(CutMode.PIXEL)}
            onClick={() =>
              setOptionConfig({ ...optionConfig, cutMode: CutMode.PIXEL })
            }
          >
            以像素裁剪
          </p>
          <ul className={ulCls}>
            <label className={labelCls}>
              <span>宽</span>
              <InputNumber
                className={inputNumberCls}
                min={1}
                value={pixel.width}
                onChange={(value) => {
                  const v = value ?? 1;
                  if (v < 1) return;
                  setOptionConfig({
                    ...optionConfig,
                    pixel: { width: v, height: pixel.height },
                  });
                }}
              />
              <span>px</span>
            </label>
            <label className={labelCls}>
              <span>高</span>
              <InputNumber
                className={inputNumberCls}
                min={1}
                value={pixel.height}
                onChange={(value) => {
                  const v = value ?? 1;
                  if (v < 1) return;
                  setOptionConfig({
                    ...optionConfig,
                    pixel: { width: pixel.width, height: v },
                  });
                }}
              />
              <span>px</span>
            </label>
          </ul>
        </div>
        {/* 以数量均等裁剪 */}
        <div className={frameCls(CutMode.AMOUNT)}>
          <p
            className={titleCls(CutMode.AMOUNT)}
            onClick={() =>
              setOptionConfig({ ...optionConfig, cutMode: CutMode.AMOUNT })
            }
          >
            以数量均等裁剪
          </p>
          <ul className={ulCls}>
            <label className={labelCls}>
              <span>横向切割成</span>
              <InputNumber
                className={inputNumberCls}
                min={1}
                step={1}
                value={amount.row}
                onChange={(value) => {
                  const v = value ?? 1;
                  if (v < 1) return;
                  setOptionConfig({
                    ...optionConfig,
                    amount: { row: v, col: amount.col },
                  });
                }}
              />
              <span>份</span>
            </label>
            <label className={labelCls}>
              <span>纵向切割成</span>
              <InputNumber
                className={inputNumberCls}
                min={1}
                step={1}
                value={amount.col}
                onChange={(value) => {
                  const v = value ?? 1;
                  if (v < 1) return;
                  setOptionConfig({
                    ...optionConfig,
                    amount: { row: amount.row, col: v },
                  });
                }}
              />
              <span>份</span>
            </label>
          </ul>
        </div>
        {/* 以比例裁剪 */}
        <div className={frameCls(CutMode.SCALE)}>
          <p
            className={titleCls(CutMode.SCALE)}
            onClick={() =>
              setOptionConfig({ ...optionConfig, cutMode: CutMode.SCALE })
            }
          >
            以比例裁剪
          </p>
          <ul className={ulCls}>
            <label className={labelCls}>
              <span>宽</span>
              <InputNumber
                className={inputNumberCls}
                min={1}
                value={scale.width}
                onChange={(value) => {
                  const v = value ?? 1;
                  if (v < 1) return;
                  setOptionConfig({
                    ...optionConfig,
                    scale: { width: v, height: scale.height },
                  });
                }}
              />
              <span>倍</span>
            </label>
            <label className={labelCls}>
              <span>高</span>
              <InputNumber
                className={inputNumberCls}
                min={1}
                value={scale.height}
                onChange={(value) => {
                  const v = value ?? 1;
                  if (v < 1) return;
                  setOptionConfig({
                    ...optionConfig,
                    scale: { width: scale.width, height: v },
                  });
                }}
              />
              <span>倍</span>
            </label>
          </ul>
        </div>
      </div>
    </Step>
  );
}
