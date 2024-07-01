import NodePath from 'path';
import { config } from 'dotenv';
import { BrowserWindow, screen } from 'electron';
import GlobalConfig from '@electron/global/config';
import PKG from '../../package.json';

/**
 * 加载环境变量, 默认为 .env 文件
 * 若要打包后在主进程中也能访问环境变量, 需要将配置文件一起打包
 * 在 package.json 的 build.files 中添加文件名即可
 */
export const loadEnvFile = () => {
  if (GlobalConfig.IS_DEV_MODE) {
    config();
  } else {
    config({ path: NodePath.resolve(GlobalConfig.DIR_APP, '.env') });
  }
};


/**
 * 根据分辨率适配窗口大小
 * @param dto
 * @param win
 */
export const adaptByScreen = (dto: WinStateDTO, win: BrowserWindow | null) => {
  const devWidth = 1920;
  const devHeight = 1080;
  const workAreaSize = screen.getPrimaryDisplay().workAreaSize; // 显示器工作区域大小
  const zoomFactor = Math.max(workAreaSize.width / devWidth, workAreaSize.height / devHeight);
  const realSize = { width: 0, height: 0 };
  realSize.width = Math.round(dto.width * zoomFactor);
  realSize.height = Math.round(dto.height * zoomFactor);
  win?.webContents.setZoomFactor(zoomFactor);
  return realSize;
};

// 挂载全局变量
export const mountGlobalVariables = () => {
  // 静态资源路径
  global.StaticPath = GlobalConfig.DIR_STATIC;
  // 客户端图标
  global.ClientLogo = GlobalConfig.APP_LOGO;
  // 客户端版本号
  global.ClientVersion = PKG.version;
};
