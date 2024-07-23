import { app, dialog, Menu, ipcMain, type MessageBoxSyncOptions } from "electron"
import * as remote from "@electron/remote/main"

import { mainLog } from "../utils/logger"
import GlobalConfig from '../global/config';
import { loadEnvFile, mountGlobalVariables } from '../utils/tools';
import WinMain from '../modules/WinMain';
import WinTray from '../modules/WinTray';

class WinApp {
  // 初始化App配置
  private static initAppConfig() {
    // 关闭安全警告
    process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "false"
    // 忽略证书相关错误
    app.commandLine.appendSwitch("ignore-certificate-errors")
    // 禁用默认系统菜单
    // Menu.setApplicationMenu(null)
  }

  // 启动应用
  static startApp() {
    if (!app.requestSingleInstanceLock()) {
      return this.exitApp("There are already instances running.")
    }
    // 初始化 remote
    remote.initialize()
    // 初始化App配置
    this.initAppConfig()
    // 加载环境变量
    loadEnvFile()
    // 挂载全局变量
    mountGlobalVariables()

    // 初始化完成
    app.whenReady().then(async () => {
      // 监听相关事件
      this.ipcListening()
      // 创建主窗口
      WinMain.create()
      // 监听主窗口事件
      WinMain.ipcListening()
      // 创建托盘菜单
      WinTray.initTrayMenu()
      // 创建服务窗口
      WinTray.create()
      // 监听服务窗口事件
      WinTray.ipcListening()
    })

    // 运行第二个实例时
    app.on("second-instance", () => WinMain.show("second-instance"))

    // 所有的窗口都被关闭
    app.on("window-all-closed", () => {
      WinTray.destroy()
      this.exitApp()
    })

    // 程序退出之前
    app.on("before-quit", () => {
      mainLog.log("[before quit app] ")
    })

    // 程序退出
    app.on("quit", () => {
      mainLog.log("[app is quit] ")
      WinTray.destroy()
      app.releaseSingleInstanceLock()
    })
  }

  // 重启应用
  static restartApp() {
    !GlobalConfig.IS_DEV_MODE && app.relaunch()
    app.exit(0)
  }

  // 退出应用
  static exitApp(title?: string, content?: string) {
    mainLog.log("[exit-app] ", title || "", content || "")
    if (title && content) {
      const callback = () => {
        const opt: MessageBoxSyncOptions = {
          type: "warning",
          icon: GlobalConfig.APP_LOGO,
          noLink: true,
          title: title,
          message: `${content}`,
          buttons: ["确定"],
          cancelId: -1,
          defaultId: 0
        }
        dialog.showMessageBoxSync(opt)
        app.quit()
      }
      app.isReady() ? callback() : app.whenReady().then(callback)
    } else {
      app.quit()
    }
  }

  // 监听相关事件
  static ipcListening() {
    // 重启
    ipcMain.on("restart_app", () => this.restartApp())
  }
}

export default WinApp
