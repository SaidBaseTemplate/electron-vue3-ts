import { contextBridge, ipcRenderer } from 'electron';

// 在预加载脚本中使用 contextBridge 暴露需要访问的模块或 API
contextBridge.exposeInMainWorld('electronApi', {
  require: require,
  ipcRenderer: ipcRenderer,
  getElectronGlobalConfig: () => ipcRenderer.invoke('getElectronGlobalConfig')
});
