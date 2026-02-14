# 项目介绍

一个可将图片分段裁剪成多张图片的工具。

## 技术栈

- **构建**: Vite 5
- **框架**: React 19 + TypeScript
- **样式**: Tailwind CSS v4

## 在线地址

- Github 站点: https://hu243285237.github.io/PictureCutter_Web/
- 国内站点: http://hu243285237.gitee.io/picturecutter_web/

## 原理

主要使用了 Canvas 上下文的 `drawImage` 方法，对图片进行分段绘制。

## 优化

- 使用 WebWorker 离屏渲染，防止主线程阻塞

## 导出

可导出为图片组或 PDF 两种格式。

## 兼容性

请在 PC 端使用 Chrome、Firefox、Edge 等浏览器，不支持 IE 浏览器。

## 工程代码

- Github: https://github.com/hu243285237/PictureCutter_Web
- Gitee: https://gitee.com/hu243285237/PictureCutter_Web

## 部分第三方库

| 库         | 用途                           |
| ---------- | ------------------------------ |
| file-saver | 用于下载文件到本地             |
| jszip      | 用于将裁剪好的图片添加进压缩包 |
| jspdf      | 用于输出 PDF 格式              |

## 持续集成

### node.js.yml

- **说明**: 主 CI 流程，负责构建、部署与打 tag。
- **触发条件**: 对 `master` 分支的 **push** 或 **pull_request**。
- **执行步骤**:
  1. 在 Node.js 环境中执行 `npm install` 与 `npm run build`，产物输出到 `dist` 目录。
  2. **仅 push 时**：将 `dist` 部署到 `gh-pages` 分支（GitHub Pages）。
  3. **仅 push 时**：根据 `package.json` 的 `version` 字段创建 tag，格式为 `v{version}`（如 `v2.0.0`）；若该 tag 已存在则跳过，避免重复打 tag 导致失败。

即：PR 时只做构建校验，push 到 master 时执行「构建 → 部署 → 按版本打 tag」。

### sync-gitee.yml

- **说明**: 将仓库同步到 Gitee 并触发 Gitee Pages。
- **触发条件**: 定时任务（默认每日执行）。
- **执行步骤**: 将 GitHub 仓库镜像到 Gitee，并触发 Gitee 仓库的 Pages 部署（基于 `gh-pages` 分支）。

---

# 开始项目

本项目使用 Vite 构建。

## 使用 npm

- 安装依赖: `npm install`
- 本地开发: `npm run dev`
- 打包: `npm run build`
- 预览打包结果: `npm run preview`
