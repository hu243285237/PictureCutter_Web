import { CutMode } from './enum';

export default (function () {
  // 以像素裁剪和以数量裁剪的代码
  const pixelAndAmountCutCode = () => {
    onmessage = (e: MessageEvent) => {
      if (!e.data) return;
      const { pixelWidth, pixelHeight, imgSource, amountRow, amountCol } =
        e.data;
      for (let i = 0; i < amountCol; i++) {
        for (let j = 0; j < amountRow; j++) {
          const offscreenCanvas = new OffscreenCanvas(pixelWidth, pixelHeight);
          const ctx = offscreenCanvas.getContext(
            '2d'
          ) as OffscreenCanvasRenderingContext2D;
          ctx.drawImage(
            imgSource,
            pixelWidth * j,
            pixelHeight * i,
            pixelWidth,
            pixelHeight,
            0,
            0,
            pixelWidth,
            pixelHeight
          );
          const imageBitmap = offscreenCanvas.transferToImageBitmap();
          postMessage(imageBitmap);
        }
      }
    };
  };

  // 以比例裁剪的代码
  const scaleCutCode = () => {
    onmessage = (e: MessageEvent) => {
      if (!e.data) return;
      const { imgSource, scaleWidth, scaleHeight } = e.data;
      let amount = 0;
      let cutLength = 0;
      const dir =
        imgSource.height > imgSource.width ? 'VERTICAL' : 'HORIZONTAL';
      const scale = scaleWidth / scaleHeight;
      if (dir === 'VERTICAL') {
        amount = Math.ceil(scale * (imgSource.height / imgSource.width));
        cutLength = (1 / scale) * imgSource.width;
      } else {
        amount = Math.ceil((1 / scale) * (imgSource.width / imgSource.height));
        cutLength = scale * imgSource.height;
      }
      for (let i = 0; i < amount; i++) {
        const offscreenCanvas = new OffscreenCanvas(0, 0);
        if (dir === 'VERTICAL') {
          let drawLength;
          if (i === amount - 1) {
            drawLength = imgSource.height % cutLength;
          } else {
            drawLength = cutLength;
          }
          [offscreenCanvas.width, offscreenCanvas.height] = [
            imgSource.width,
            drawLength,
          ];
          const ctx = offscreenCanvas.getContext(
            '2d'
          ) as OffscreenCanvasRenderingContext2D;
          ctx?.drawImage(
            imgSource,
            0,
            cutLength * i,
            imgSource.width,
            drawLength,
            0,
            0,
            imgSource.width,
            drawLength
          );
        } else {
          let drawLength;
          if (i === amount - 1) {
            drawLength = imgSource.width % cutLength;
          } else {
            drawLength = cutLength;
          }
          [offscreenCanvas.width, offscreenCanvas.height] = [
            drawLength,
            imgSource.height,
          ];
          const ctx = offscreenCanvas.getContext(
            '2d'
          ) as OffscreenCanvasRenderingContext2D;
          ctx?.drawImage(
            imgSource,
            cutLength * i,
            0,
            drawLength,
            imgSource.height,
            0,
            0,
            drawLength,
            imgSource.height
          );
        }
        const imageBitmap = offscreenCanvas.transferToImageBitmap();
        postMessage(imageBitmap);
      }
    };
  };

  // 将代码转为字符串
  const convert = (workerCode: Function) => {
    let code = workerCode.toString();
    code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
    const blob = new Blob([code], { type: 'text/javascript' });
    return URL.createObjectURL(blob);
  };

  // 裁剪类 worker
  class CutWorker {
    worker: Worker;
    constructor(cutMode: CutMode) {
      this.worker = new Worker(this.getCodeStr(cutMode));
    }
    public reset(cutMode: CutMode) {
      this.worker.terminate();
      this.worker = new Worker(this.getCodeStr(cutMode));
    }
    private getCodeStr(cutMode: CutMode) {
      let str = '';
      switch (cutMode) {
        case CutMode.PIXEL:
        case CutMode.AMOUNT:
          str = convert(pixelAndAmountCutCode);
          break;
        case CutMode.SCALE:
          str = convert(scaleCutCode);
          break;
        default:
          throw new Error('cutMode error');
      }
      return str;
    }
  }

  return new CutWorker(CutMode.AMOUNT);
})();
