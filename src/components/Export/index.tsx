import { exportImgs } from '../../utils/util';
import Step from '../Step';

/**
 * 参数
 */
interface Props {
  /**
   * 图片 URL
   */
  imgsURL: Array<string>;
  /**
   * 格式
   */
  format: string;
}

/**
 * 导出
 */
export default function (props: Props) {
  const { imgsURL, format } = props;

  const handleExport = (format: string): void => {
    exportImgs(imgsURL, format);
  };

  return (
    <Step step={4} title="导出">
      <div className="flex">
        <label
          className="mx-[18px] w-[120px] cursor-pointer rounded-[18px] border-2 border-white px-[18px] py-2 transition-[background-color,color,box-shadow] duration-100 hover:scale-105 hover:bg-wheat hover:font-bold hover:text-black hover:shadow-[1px_1px_6px_1px_rgba(255,255,255,0.5)]"
          onClick={() => handleExport(format)}
        >
          导出为图片组
        </label>
        <label
          className="mx-[18px] w-[120px] cursor-pointer rounded-[18px] border-2 border-white px-[18px] py-2 transition-[background-color,color,box-shadow] duration-100 hover:scale-105 hover:bg-wheat hover:font-bold hover:text-black hover:shadow-[1px_1px_6px_1px_rgba(255,255,255,0.5)]"
          onClick={() => handleExport('pdf')}
        >
          导出为 PDF
        </label>
      </div>
    </Step>
  );
}
