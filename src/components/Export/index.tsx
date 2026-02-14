import { Button } from 'antd';
import { useAppContext } from '../../contexts';
import { exportImgs } from '../../utils/util';
import Step from '../Step';

/**
 * 导出
 */
export default function Export() {
  const { cutImgsURL, imgFormat } = useAppContext();

  /**
   * 处理导出
   * @param format 格式
   */
  const handleExport = (format: string) => {
    exportImgs(cutImgsURL, format);
  };

  const exportButtons = [
    {
      label: '导出为图片组',
      format: imgFormat,
      icon: (
        <svg
          className="w-5 h-5 shrink-0 align-middle"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      label: '导出为 PDF',
      format: 'pdf',
      icon: (
        <svg
          className="w-5 h-5 shrink-0 align-middle"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <Step step={4} title="导出">
      <div className="flex justify-center items-center gap-8">
        {exportButtons.map((button, index) => (
          <Button
            key={index}
            type="default"
            size="large"
            className="h-14! w-50! text-gray-50! bg-gray-800! border-transparent! rounded-4xl! hover:text-white! hover:bg-gray-700!"
            onClick={() => handleExport(button.format)}
            disabled={cutImgsURL.length === 0}
          >
            {button.icon}
            <span>{button.label}</span>
          </Button>
        ))}
      </div>
    </Step>
  );
}
