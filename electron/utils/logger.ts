/**
 * https://github.com/megahertz/electron-log
 * on Linux: ~/.config/{app name}/logs/main.log
 * on macOS: ~/Library/Logs/{app name}/main.log
 * on Windows: %USERPROFILE%\AppData\Roaming\{app name}\logs\main.log
 */
import eleLog, { Logger } from 'electron-log';

// 设置日志控制台等级，默认为 false
eleLog.transports.console.level = 'info';

// 设置日志文件等级，默认为 false
eleLog.transports.file.level = 'info';

/**
 * 设置日志文件大小 1048576 * 10(10M)
 * 达到规定大小，备份文件并重命名为 name.old.log
 * 有且仅有一个备份日志文件
 */
eleLog.transports.file.maxSize = 1048576 * 10;

// 日志工厂
class LogFactory {
  // 文件名
  private readonly fileName: string;
  /** 实例 */
  private readonly logInst: any;

  /** 构造函数 */
  constructor(name: string) {
    this.fileName = name + '.log';
    this.logInst = eleLog.create({ logId: 'log' });
    this.logInst.transports.console.level = false;
    this.logInst.transports.file.fileName = this.fileName;
    this.logInst.transports.file.format = `[{y}-{m}-{d} {h}:{i}:{s}.{ms}] {text}`;
    Object.freeze(this); // 禁止修改
  }

  // 统一处理, 可在这里对日志进行加密
  private handle(type: string, ...params: any[]) {
    try {
      this.logInst[type]('\n--->', ...params, '\n');
    } catch (reason: any) {
      console.log('\n\n[LogFactory.handle] ', reason);
    }
  }

  log(...params: any[]) {
    this.handle('log', ...params);
  }

  info(...params: any[]) {
    this.handle('info', ...params);
  }

  error(...params: any[]) {
    this.handle('error', ...params);
  }

  warn(...params: any[]) {
    this.handle('warn', ...params);
  }

  verbose(...params: any[]) {
    this.handle('verbose', ...params);
  }

  debug(...params: any[]) {
    this.handle('debug', ...params);
  }

  silly(...params: any[]) {
    this.handle('silly', ...params);
  }
}

export const mainLog = new LogFactory('main');
export const requestLog = new LogFactory('request');
export const exceptionLog = new LogFactory('exception');
