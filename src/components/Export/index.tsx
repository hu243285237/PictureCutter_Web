import { exportImgs } from '../../utils/util';

interface Props {
  imgsURL: Array<string>;
  format: string;
}

export default function (props: Props) {
  const { imgsURL, format } = props;

  const handleExport = (format: string): void => {
    exportImgs(imgsURL, format);
  };

  return (
    <div className="my-5 mb-10 flex flex-col items-center justify-center text-aliceblue">
      <h2>STEP 4: 导出</h2>
      <div className="flex">
        <label
          className="mx-[18px] my-6 w-[120px] cursor-pointer rounded-[18px] border-2 border-white px-[18px] py-2 transition-[background-color,color,box-shadow] duration-100 hover:scale-105 hover:bg-wheat hover:font-bold hover:text-black hover:shadow-[1px_1px_6px_1px_rgba(255,255,255,0.5)]"
          onClick={() => handleExport(format)}
        >
          导出为图片组
        </label>
        <label
          className="mx-[18px] my-6 w-[120px] cursor-pointer rounded-[18px] border-2 border-white px-[18px] py-2 transition-[background-color,color,box-shadow] duration-100 hover:scale-105 hover:bg-wheat hover:font-bold hover:text-black hover:shadow-[1px_1px_6px_1px_rgba(255,255,255,0.5)]"
          onClick={() => handleExport('pdf')}
        >
          导出为 PDF
        </label>
      </div>
    </div>
  );
}
