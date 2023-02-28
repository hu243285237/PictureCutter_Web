import { Direaction } from './enum';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import jsPDF from 'jspdf';

/**
 * 以像素裁剪图片
 * @param imgURL 图片
 * @param pixelWidth 像素宽度
 * @param pixelHeight 像素高度
 * @param format 裁剪后的图片格式
 * @returns 裁剪后的图片数组
 */
export function pixelCut(
  imgURL: string,
  pixelWidth: number,
  pixelHeight: number,
  format: string
): Array<string> {
  const res = new Array<string>();
  const img = new Image();
  img.src = imgURL;
  const amountRow = Math.ceil(img.width / pixelWidth);
  const amountCol = Math.ceil(img.height / pixelHeight);
  for (let i = 0; i < amountCol; i++) {
    for (let j = 0; j < amountRow; j++) {
      const canvas = document.createElement('canvas');
      [canvas.width, canvas.height] = [pixelWidth, pixelHeight];
      const context = canvas.getContext('2d');
      context?.drawImage(
        img,
        pixelWidth * j,
        pixelHeight * i,
        pixelWidth,
        pixelHeight,
        0,
        0,
        pixelWidth,
        pixelHeight
      );
      res.push(canvas.toDataURL('image/' + format, 1.0));
    }
  }
  return res;
}

/**
 * 以数量均等裁剪
 * @param imgURL 图片
 * @param amountRow 横向切割成几份
 * @param amountCol 纵向切割成几份
 * @param format 裁剪后的图片格式
 * @returns 裁剪后的图片数组
 */
export function amountCut(
  imgURL: string,
  amountRow: number,
  amountCol: number,
  format: string
): Array<string> {
  const res = new Array<string>();
  const img = new Image();
  img.src = imgURL;
  const pixelWidth = img.width / amountRow;
  const pixelHeight = img.height / amountCol;
  for (let i = 0; i < amountCol; i++) {
    for (let j = 0; j < amountRow; j++) {
      const canvas = document.createElement('canvas');
      [canvas.width, canvas.height] = [pixelWidth, pixelHeight];
      const context = canvas.getContext('2d');
      context?.drawImage(
        img,
        pixelWidth * j,
        pixelHeight * i,
        pixelWidth,
        pixelHeight,
        0,
        0,
        pixelWidth,
        pixelHeight
      );
      res.push(canvas.toDataURL('image/' + format, 1.0));
    }
  }
  return res;
}

/**
 * 以比例裁剪图片
 * @param imgURL 图片
 * @param scaleWidth 宽度比例
 * @param scaleHeight 高度比例
 * @param format 裁剪后的图片格式
 * @returns 裁剪后的图片数组
 */
export function scaleCut(
  imgURL: string,
  scaleWidth: number,
  scaleHeight: number,
  format: string
): Array<string> {
  const res = new Array<string>();
  const img = new Image();
  img.src = imgURL;
  let amount = 0;
  let cutLength = 0;
  const dir =
    img.height > img.width ? Direaction.VERTICAL : Direaction.HORIZONTAL;
  const scale = scaleWidth / scaleHeight;
  if (dir === Direaction.VERTICAL) {
    amount = Math.ceil(scale * (img.height / img.width));
    cutLength = (1 / scale) * img.width;
  } else {
    amount = Math.ceil((1 / scale) * (img.width / img.height));
    cutLength = scale * img.height;
  }
  for (let i = 0; i < amount; i++) {
    const canvas = document.createElement('canvas');
    if (dir === Direaction.VERTICAL) {
      [canvas.width, canvas.height] = [img.width, cutLength];
      let context = canvas.getContext('2d');
      context?.drawImage(
        img,
        0,
        cutLength * i,
        img.width,
        cutLength,
        0,
        0,
        img.width,
        cutLength
      );
    } else {
      [canvas.width, canvas.height] = [cutLength, img.height];
      let context = canvas.getContext('2d');
      context?.drawImage(
        img,
        cutLength * i,
        0,
        cutLength,
        img.height,
        0,
        0,
        cutLength,
        img.height
      );
    }
    res.push(canvas.toDataURL('image/' + format, 1.0));
  }
  return res;
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
      pdf.addImage(imgsURL[i], 'JPEG', 0, 0, img.width, img.height);
      if (i !== imgsURL.length - 1) {
        pdf.addPage([img.width, img.height], 'portrait');
      }
    }
    pdf.save('images.pdf');
  }
}
