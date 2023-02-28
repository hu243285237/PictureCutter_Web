import logo from '../../logo.svg';
import './index.scss';

export default function () {
  return (
    <header className="header-container">
      <h1 className="title">PICTURE CUTTER</h1>
      <p className="description">一个将长图片自动分段切割的工具</p>
      {/* <div className="nav">
        <label className="nav-item">案例教程</label>
        <label className="nav-item">工程源码</label>
        <label className="nav-item">开发日志</label>
        <label className="nav-item">版本v1.0.0</label>
      </div> */}
      <img className="logo" src={logo} alt="logo" draggable="false" />
    </header>
  );
}
