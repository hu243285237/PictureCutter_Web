import { exportImgs } from '../../utils/util';
import './index.scss';

interface Props {
  imgsURL: Array<string>;
  format: string;
}

export default function (props: Props) {
  const { imgsURL, format } = props;

  // 处理导出图片
  const handleExport = (format: string): void => {
    exportImgs(imgsURL, format);
  };

  return (
    <div className="export-container">
      <h2>STEP 4: 导出</h2>
      <div className="list">
        <label
          className="list-item"
          onClick={() => {
            handleExport(format);
          }}
        >
          导出为图片组
        </label>
        <label
          className="list-item"
          onClick={() => {
            handleExport('pdf');
          }}
        >
          导出为 PDF
        </label>
      </div>
    </div>
  );
}
