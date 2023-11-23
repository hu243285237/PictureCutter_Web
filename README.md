# 项目介绍

## 在线地址

Github 站点: https://hu243285237.github.io/PictureCutter_Web/

国内站点: http://hu243285237.gitee.io/picturecutter_web/

## 介绍

一个可将图片自动分段裁剪成多张图片的工具。

## 原理

主要使用了 Canvas 上下文的 drawImage 方法，对图片进行分段绘制。

## 优化

使用 WebWorker 离屏渲染，防止主线程阻塞。

更改配置选项时进行防抖，防止高频率无用渲染。

## 导出

可导出为图片组或 PDF 两种格式。

## 兼容性

请在 PC 端使用 Chrome、Firefox、Edge 等浏览器，不支持 IE 浏览器。

## 工程代码

Github: https://github.com/hu243285237/PictureCutter_Web

Gitee: https://gitee.com/hu243285237/PictureCutter_Web

## 使用的 npm 包

file-saver: 用于下载文件到本地

jszip: 用于将裁剪好的图片添加进压缩包

jspdf: 用于输出 PDF 格式

## Github Actions

### `node.js.yml`

说明: 自动化 CI 流程

触发条件: 当 master 检测到 push 或 pull_request 时

执行方法: 在 node.js 环境 build 打包，并将打包后的文件部署到 gh-pages 分支，然后根据 package.json 的 version 字段自动创建 tag

### `sync-gitee.yml`

说明: 自动化同步到 Gitee 仓库

触发条件: 根据定时任务周期性触发

执行方法: 同步镜像工程到 Gitee 仓库，然后部署 Gitee Pages

# 开始项目

## 使用 npm

安装依赖包: `npm install`

本地运行: `npm start`

打包: `npm run build`

## 使用 yarn

安装依赖包: `yarn`

本地运行: `yarn start`

打包: `yarn build`