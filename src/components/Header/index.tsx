import { useState } from 'react';
import config from '../../../package.json';
import logo from '../../logo.svg';
import './index.scss';

export default function () {
  const [isResLoaded, setIsResLoaded] = useState<boolean>(false);

  return (
    <header className="header-container">
      <h1 className="title">PICTURE CUTTER</h1>
      <p className="description">一个将长图片自动分段切割的工具</p>
      <div className="nav">
        {/* <label className="nav-item">案例教程</label> */}
        <label
          className="nav-item"
          onClick={() => {
            window.open('https://github.com/hu243285237/PictureCutter_Web');
          }}
        >
          工程源码
        </label>
        <label
          className="nav-item"
          onClick={() => {
            window.open(
              'https://github.com/hu243285237/PictureCutter_Web/blob/master/README.md'
            );
          }}
        >
          文档说明
        </label>
        <label
          className="nav-item"
          onClick={() => {
            window.open(
              'https://github.com/hu243285237/PictureCutter_Web/tags'
            );
          }}
        >
          版本v{config.version}
        </label>
      </div>
      <div className={['logo', isResLoaded && 'logo-show'].join(' ')}>
        <img
          className="logo-img"
          src={logo}
          alt="logo"
          draggable="false"
          onLoad={() => {
            setIsResLoaded(true);
          }}
        />
      </div>
    </header>
  );
}
