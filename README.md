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

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
