import { useEffect, useState } from 'react';
import { CutMode } from '../../utils/enum';
import { OptionProps } from '../../utils/interface';
import './index.scss';

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

  return (
    <div className="option-container">
      <h2>STEP 2: 选项</h2>
      <div className="frame">
        {/* 以像素裁剪 */}
        <div
          className={[
            'frame-content',
            cutMode === CutMode.PIXEL && 'frame-content-checked',
          ].join(' ')}
        >
          <p
            className={[
              'frame-content-title',
              cutMode === CutMode.PIXEL && 'frame-content-title-checked',
            ].join(' ')}
            onClick={() => {
              setCutMode(CutMode.PIXEL);
            }}
          >
            以像素裁剪
          </p>
          <div className="frame-content-list">
            <label className="frame-content-list-item">
              <p>宽:</p>
              <input
                className="frame-content-list-item-input"
                type="number"
                defaultValue={pixel.width}
                min={1}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setPixel({
                    width: value,
                    height: pixel.height,
                  });
                }}
              ></input>
            </label>
            <label className="frame-content-list-item">
              <p>高:</p>
              <input
                className="frame-content-list-item-input"
                type="number"
                defaultValue={pixel.height}
                min={1}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setPixel({
                    width: pixel.width,
                    height: value,
                  });
                }}
              ></input>
            </label>
          </div>
        </div>
        {/* 以数量裁剪 */}
        <div
          className={[
            'frame-content',
            cutMode === CutMode.AMOUNT && 'frame-content-checked',
          ].join(' ')}
        >
          <p
            className={[
              'frame-content-title',
              cutMode === CutMode.AMOUNT && 'frame-content-title-checked',
            ].join(' ')}
            onClick={() => {
              setCutMode(CutMode.AMOUNT);
            }}
          >
            以数量均等裁剪
          </p>
          <div className="frame-content-list">
            <label className="frame-content-list-item">
              <p>横向切割成几份:</p>
              <input
                className="frame-content-list-item-input"
                type="number"
                defaultValue={amount.row}
                min={1}
                step={1}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setAmount({
                    row: value,
                    col: amount.col,
                  });
                }}
              ></input>
            </label>
            <label className="frame-content-list-item">
              <p>纵向切割成几份:</p>
              <input
                className="frame-content-list-item-input"
                type="number"
                defaultValue={amount.col}
                min={1}
                step={1}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setAmount({
                    row: amount.row,
                    col: value,
                  });
                }}
              ></input>
            </label>
          </div>
        </div>
        {/* 以比例裁剪 */}
        <div
          className={[
            'frame-content',
            cutMode === CutMode.SCALE && 'frame-content-checked',
          ].join(' ')}
        >
          <p
            className={[
              'frame-content-title',
              cutMode === CutMode.SCALE && 'frame-content-title-checked',
            ].join(' ')}
            onClick={() => {
              setCutMode(CutMode.SCALE);
            }}
          >
            以比例裁剪
          </p>
          <div className="frame-content-list">
            <label className="frame-content-list-item">
              <p>宽:</p>
              <input
                className="frame-content-list-item-input"
                type="number"
                defaultValue={scale.width}
                min={0}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setScale({
                    width: value,
                    height: scale.height,
                  });
                }}
              ></input>
            </label>
            <label className="frame-content-list-item">
              <p>高:</p>
              <input
                className="frame-content-list-item-input"
                type="number"
                defaultValue={scale.height}
                min={0}
                onChange={(e): void => {
                  const value = parseFloat(e.target.value);
                  if (!value || value < 0) return;
                  setScale({
                    width: scale.width,
                    height: value,
                  });
                }}
              ></input>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
