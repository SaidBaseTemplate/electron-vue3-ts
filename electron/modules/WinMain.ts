import electron, { ipcMain, BrowserWindow, type BrowserWindowConstructorOptions } from "electron"
import * as remote from "@electron/remote/main"
import GlobalConfig from '@electron/global/config';
import { WIN_CONFIG } from '@electron/config/config';
import { mainLog } from '@electron/utils/logger';
import { adaptByScreen } from '@electron/utils/tools';

class WinMain {
  // 窗口实例
  private static WIN_INST: BrowserWindow | null = null

  // 获取窗口实例
  static getWinInst() {
    return this.WIN_INST
  }

  // 显示窗口
  static show(key?: string, center?: boolean) {
    mainLog.log("[show main win] ", key)
    this.WIN_INST?.show()
    this.WIN_INST?.focus()
    center && this.WIN_INST?.center()
  }

  // 创建窗口
  static create() {
    if (this.WIN_INST) return
    this.WIN_INST = new BrowserWindow(WIN_CONFIG)
    this.WIN_INST.removeMenu()
    this.WIN_INST.loadURL(GlobalConfig.WIN_URL)

    // 启用 remote
    remote.enable(this.WIN_INST.webContents)

    /**
     * 窗口-准备好显示
     * 在窗口的控制台中使用 F5 刷新时，也会触发该事件
     */
    this.WIN_INST.on("ready-to-show", () => {
      this.show("win=>ready-to-show", true)
      GlobalConfig.IS_DEV_MODE && this.openDevTools()
    })

    /** 窗口-即将关闭 */
    this.WIN_INST.on("close", () => {})

    /** 窗口-已关闭 */
    this.WIN_INST.on("closed", () => (this.WIN_INST = null))
  }

  // 打开控制台
  static openDevTools() {
    if (!this.WIN_INST) return
    const winCtns = this.WIN_INST.webContents
    if (winCtns.isDevToolsOpened()) return
    winCtns.openDevTools({ mode: "undocked" })
  }

  // 监听通信事件
  static ipcListening() {
    /** 中转消息- 代替中央事件总线 */
    ipcMain.on("vue_bus", (_, { channel, data }) => {
      if (!this.WIN_INST || !channel) return
      this.WIN_INST.webContents.send(channel, data)
    })
    /** 设置窗口最小值 */
    ipcMain.on("set_min_size", (_, dto: WinStateDTO) => {
      if (!this.WIN_INST) return
      const size = adaptByScreen(dto, this.WIN_INST)
      const val = this.WIN_INST.isResizable()
      this.WIN_INST.setResizable(true)
      this.WIN_INST.setMinimumSize(size.width, size.height)
      this.WIN_INST.setResizable(val)
    })
    /** 设置窗口大小 */
    ipcMain.on("set_win_size", (_, dto: WinStateDTO) => {
      if (!this.WIN_INST) return
      const size = adaptByScreen(dto, this.WIN_INST)
      this.WIN_INST.setResizable(true)
      this.WIN_INST.setSize(size.width, size.height)
      dto.center && this.WIN_INST.center()
      this.WIN_INST.setMaximizable(dto.maxable)
      this.WIN_INST.setResizable(dto.resizable)
    })
  }
}

export default WinMain
