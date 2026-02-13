import config from '../../../package.json';
import logo from '../../logo.svg';

export default function () {
  return (
    <header className="my-5 flex flex-col items-center justify-center text-white">
      <h1 className="my-6 text-[56px] font-bold">PICTURE CUTTER</h1>
      <p className="text-[20px]">一个将长图片自动分段切割的工具</p>
      <div className="flex">
        <label
          className="mx-2 cursor-pointer border-b border-white text-[16px] text-aliceblue hover:text-wheat"
          onClick={() => {
            window.open(
              'https://blog.csdn.net/m0_37250299/article/details/100104956'
            );
          }}
        >
          案例教程
        </label>
        <label
          className="mx-2 cursor-pointer border-b border-white text-[16px] text-aliceblue hover:text-wheat"
          onClick={() => {
            window.open('https://github.com/hu243285237/PictureCutter_Web');
          }}
        >
          工程源码
        </label>
        <label
          className="mx-2 cursor-pointer border-b border-white text-[16px] text-aliceblue hover:text-wheat"
          onClick={() => {
            window.open(
              'https://github.com/hu243285237/PictureCutter_Web/tags'
            );
          }}
        >
          版本v{config.version}
        </label>
      </div>
      <div className="mt-9 h-[120px] w-[120px]">
        <img
          className="h-full w-full animate-logo-spin pointer-events-none select-none"
          src={logo}
          alt="logo"
          draggable="false"
        />
      </div>
    </header>
  );
}
