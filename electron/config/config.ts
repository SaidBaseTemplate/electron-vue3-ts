import type { BrowserWindowConstructorOptions } from 'electron';
import GlobalConfig from '../global/config';
import path from 'path';

export const WIN_CONFIG: BrowserWindowConstructorOptions = {
  icon: GlobalConfig.APP_LOGO, // 图标
  title: GlobalConfig.getAppTitle(), // 如果由 loadURL() 加载的 HTML 文件中含有标签 <title>，此属性将被忽略
  width: 1200,
  height: 800,
  minWidth: 1200,
  minHeight: 800,
  show: false, // 是否在创建时显示, 默认值为 true
  frame: true, // 是否有边框
  center: true, // 是否在屏幕居中
  hasShadow: false, // 窗口是否有阴影. 默认值为 true
  resizable: true, // 是否允许拉伸大小
  fullscreenable: true, // 是否允许全屏，为 false 则插件 screenfull 不起作用
  autoHideMenuBar: true, // 自动隐藏菜单栏, 除非按了 Alt 键, 默认值为 false
  backgroundColor: "#fff", // 背景颜色
  webPreferences: {
    spellcheck: false, // 禁用拼写检查器
    disableBlinkFeatures: "SourceMap", // 以 "," 分隔的禁用特性列表
    devTools: true, // 是否开启 DevTools, 如果设置为 false（默认值为 true）, 则无法使用 BrowserWindow.webContents.openDevTools()
    webSecurity: false, // 当设置为 false, 将禁用同源策略
    nodeIntegration: true, // 是否启用 Node 集成
    contextIsolation: true, // 是否在独立 JavaScript 环境中运行 Electron API 和指定的 preload 脚本，默认为 true
    preload: path.join(__dirname, '../preload/preload.js'), // 需要引用js文件
    backgroundThrottling: false, // 是否在页面成为背景时限制动画和计时器，默认值为 true
    nodeIntegrationInWorker: true, // 是否在 Web 工作器中启用了 Node 集成
  }
}
