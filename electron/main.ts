import WinApp from "@electron/modules/WinApp";

/** 必要的全局错误捕获 */
process.on("uncaughtException", (error: Error) => {
  WinApp.exitApp("异常捕获", error.message || error.stack)
})

WinApp.startApp()
