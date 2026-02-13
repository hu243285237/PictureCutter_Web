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
  const handleExport = (format: string): void => {
    exportImgs(cutImgsURL, format);
  };

  const baseButtonClass =
    'group relative flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white rounded-2xl shadow-lg shadow-black/20 backdrop-blur-md border border-white/20 transition-all duration-300 ease-out cursor-pointer hover:shadow-2xl hover:shadow-black/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-lg';

  const exportButtons = [
    {
      label: '导出为图片组',
      format: imgFormat,
      buttonClass: `${baseButtonClass} bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500`,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      ),
    },
    {
      label: '导出为 PDF',
      format: 'pdf',
      buttonClass: `${baseButtonClass} bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500`,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      ),
    },
  ];

  return (
    <Step step={4} title="导出">
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {exportButtons.map((button, index) => (
          <button
            key={index}
            className={button.buttonClass}
            onClick={() => handleExport(button.format)}
            disabled={cutImgsURL.length === 0}
          >
            <div className="relative z-10 flex items-center gap-3 drop-shadow-md">
              <svg
                className="w-5 h-5 drop-shadow-sm"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {button.icon}
              </svg>
              <span className="drop-shadow-sm">{button.label}</span>
            </div>
          </button>
        ))}
      </div>
    </Step>
  );
}
