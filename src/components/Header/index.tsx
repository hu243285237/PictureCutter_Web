import config from '../../../package.json';
import logo from '../../logo.svg';
import './index.css';

const navLinkClass =
  'cursor-pointer border-b border-white text-[16px] text-aliceblue hover:text-wheat';

const navItems = [
  {
    label: '案例教程',
    href: 'https://blog.csdn.net/m0_37250299/article/details/100104956',
  },
  {
    label: '工程源码',
    href: 'https://github.com/hu243285237/PictureCutter_Web',
  },
  {
    label: `版本v${config.version}`,
    href: 'https://github.com/hu243285237/PictureCutter_Web/tags',
  },
];

/**
 * 头部组件
 */
export default function () {
  return (
    <header className="my-5 flex flex-col items-center justify-center">
      {/* 标题 */}
      <h1 className="my-6 text-[56px] font-bold">PICTURE CUTTER</h1>
      {/* 描述 */}
      <p className="my-4 text-[20px]">一个将长图片自动分段切割的工具</p>
      {/* 导航 */}
      <div className="flex gap-4 mb-9">
        {navItems.map((item) => (
          <label
            key={item.href}
            className={navLinkClass}
            onClick={() => window.open(item.href)}
          >
            {item.label}
          </label>
        ))}
      </div>
      {/* 图片 */}
      <div className="h-[120px] w-[120px]">
        <img
          className="header__logo-spin h-full w-full pointer-events-none select-none"
          src={logo}
        />
      </div>
    </header>
  );
}
