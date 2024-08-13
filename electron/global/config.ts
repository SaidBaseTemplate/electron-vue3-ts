import NodeOS from 'os';
import NodePath from 'path';
import { app, screen, BrowserWindow } from 'electron';
import PKG from '../../package.json';

class GlobalConfig {
  // 是否为 windows 平台
  static readonly IS_WIN32 = process.platform === 'win32';
  // 是否为 MacOS 平台
  static readonly IS_MACOS = process.platform === 'darwin';
  // 是否为 Linux
  static readonly IS_LINUX = process.platform === 'linux';
  // 是否为开发模式
  static readonly IS_DEV_MODE = !app.isPackaged;
  // 项目名称
  static readonly PROJECT_NAME = PKG.name;
  // APP版本
  static readonly APP_VERSION = PKG.version;

  /**
   * 源码目录
   * - dev : {project directory}/
   * - prod :
   *    1. on macOS : /Applications/{app name}.app/Contents/Resources/app?.asar
   *    2. on Linux : {installation directory}/resources/app?.asar
   *    3. on Windows : {installation directory}/resources/app?.asar
   */
  static readonly DIR_APP = app.getAppPath();

  // 静态资源目录
  static readonly DIR_STATIC = NodePath.resolve(this.DIR_APP, 'static');

  // 存放资源文件的目录
  static readonly DIR_RESOURCES = NodePath.resolve(this.DIR_APP, this.IS_DEV_MODE ? '' : '..');

  // 根目录/安装目录
  static readonly DIR_ROOT = this.IS_DEV_MODE ? this.DIR_APP : NodePath.resolve(this.DIR_RESOURCES, '..');

  // 图标路径
  private static readonly LOGO_PATH = {
    win32: 'icons/256x256.png',
    darwin: 'icons/icon.icns',
    linux: 'icons/256x256.png'
  };
  // 客户端图标
  static readonly APP_LOGO = NodePath.join(this.DIR_STATIC, this.LOGO_PATH[process.platform]);
  static readonly DOCKER_LOGO = NodePath.join(this.DIR_STATIC, this.LOGO_PATH.linux);

  // 运行地址
  static readonly WIN_URL = this.IS_DEV_MODE
    ? `http://${process.env.VITE_APP_HOST}:${process.env.VITE_BASE_PORT}`
    : NodePath.join(this.DIR_APP, 'dist', 'index.html');

  // 运行地址
  static getWinUrl() {
    if (this.IS_DEV_MODE) return `http://${process.env.VITE_APP_HOST}:${process.env.VITE_BASE_PORT}`;
    return NodePath.join(this.DIR_APP, 'dist/index.html');
  }

  // 程序名称
  static getAppTitle() {
    return process.env.VITE_APP_TITLE || this.PROJECT_NAME;
  }

  // 本地日志路径
  static getLocalLogsPath() {
    switch (true) {
      case this.IS_WIN32:
        return app.getPath('logs');
      case this.IS_MACOS:
        return NodePath.join(NodeOS.homedir(), 'Library/Logs', this.PROJECT_NAME);
    }
    return '';
  }
}

export default GlobalConfig;
