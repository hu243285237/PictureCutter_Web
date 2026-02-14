import { message } from 'antd';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import jsPDF from 'jspdf';
import { CutMode } from '../common';
import cutWorker from './worker';

/**
 * 以像素裁剪图片
 * @param imgURL 图片
 * @param pixelWidth 像素宽度
 * @param pixelHeight 像素高度
 * @param format 裁剪后的图片格式
 * @param callback 回调函数
 * @returns 裁剪后的图片数组
 */
export function pixelCut(
  imgURL: string,
  pixelWidth: number,
  pixelHeight: number,
  format: string,
  callback: Function,
) {
  const res = new Array<string>();
  const img = new Image();
  img.src = imgURL;
  const amountRow = Math.ceil(img.width / pixelWidth);
  const amountCol = Math.ceil(img.height / pixelHeight);
  cutWorker.reset(CutMode.PIXEL);
  createImageBitmap(img)
    .then((imgSource) => {
      cutWorker.worker.postMessage({
        imgSource,
        pixelWidth,
        pixelHeight,
        amountRow,
        amountCol,
      });
    })
    .catch(() => {
      alert('图片处理失败，请重试或更换图片');
      callback([]);
    });
  setWorkerCallback(res, format, callback);
}

/**
 * 以数量均等裁剪
 * @param imgURL 图片
 * @param amountRow 横向切割成几份
 * @param amountCol 纵向切割成几份
 * @param format 裁剪后的图片格式
 * @param callback 回调函数
 * @returns 裁剪后的图片数组
 */
export function amountCut(
  imgURL: string,
  amountRow: number,
  amountCol: number,
  format: string,
  callback: Function,
) {
  const res = new Array<string>();
  const img = new Image();
  img.src = imgURL;
  const pixelWidth = img.width / amountRow;
  const pixelHeight = img.height / amountCol;
  cutWorker.reset(CutMode.AMOUNT);
  createImageBitmap(img)
    .then((imgSource) => {
      cutWorker.worker.postMessage({
        imgSource,
        pixelWidth,
        pixelHeight,
        amountRow,
        amountCol,
      });
    })
    .catch(() => {
      alert('图片处理失败，请重试或更换图片');
      callback([]);
    });
  setWorkerCallback(res, format, callback);
}

/**
 * 以比例裁剪图片
 * @param imgURL 图片
 * @param scaleWidth 宽度比例
 * @param scaleHeight 高度比例
 * @param format 裁剪后的图片格式
 * @param callback 回调函数
 * @returns 裁剪后的图片数组
 */
export function scaleCut(
  imgURL: string,
  scaleWidth: number,
  scaleHeight: number,
  format: string,
  callback: Function,
) {
  const res = new Array<string>();
  const img = new Image();
  img.src = imgURL;
  cutWorker.reset(CutMode.SCALE);
  createImageBitmap(img)
    .then((imgSource) => {
      cutWorker.worker.postMessage({
        imgSource,
        scaleWidth,
        scaleHeight,
      });
    })
    .catch(() => {
      alert('图片处理失败，请重试或更换图片');
      callback([]);
    });
  setWorkerCallback(res, format, callback);
}

/**
 * 导出图片
 * @param imgsURL 图片组
 * @param format 导出格式
 */
export function exportImgs(imgsURL: Array<string>, format: string): void {
  const zip = new JSZip();
  const folder = zip.folder('images');
  format === 'pdf' ? toPDF() : toZip();

  // 导出为压缩包
  function toZip() {
    for (let i = 0; i < imgsURL.length; i++) {
      folder?.file(i + '.' + format, imgsURL[i].split(',')[1], {
        base64: true,
      });
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'images.zip');
    });
  }

  // 导出为 pdf
  function toPDF() {
    const img = new Image();
    img.src = imgsURL[0];
    const pdf = new jsPDF('portrait', 'pt', [img.width, img.height]);
    for (let i = 0; i < imgsURL.length; i++) {
      const tempImg = new Image();
      tempImg.src = imgsURL[i];
      pdf.addImage(imgsURL[i], 'JPEG', 0, 0, tempImg.width, tempImg.height);
      if (i !== imgsURL.length - 1) {
        pdf.addPage([tempImg.width, tempImg.height], 'portrait');
      }
    }
    pdf.save('images.pdf');
  }
}

// 设置裁剪 worker 的消息监听回调
function setWorkerCallback(
  resArr: string[],
  format: string,
  callback: Function,
) {
  cutWorker.worker.onmessage = (e: MessageEvent) => {
    if (!e.data) return;
    const imageBitmap = e.data as ImageBitmap;
    const canvas = document.createElement('canvas');
    [canvas.width, canvas.height] = [imageBitmap.width, imageBitmap.height];
    const context = canvas.getContext('bitmaprenderer');
    context?.transferFromImageBitmap(imageBitmap);
    resArr.push(canvas.toDataURL('image/' + format, 1.0));
    callback && callback([...resArr]);
  };
  cutWorker.worker.onerror = () => {
    message.error('图片处理失败，请检查图片或参数');
  };
}
