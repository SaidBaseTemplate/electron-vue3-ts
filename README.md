<div align="center"><h1>electron-vue3-ts</h1></div>

<div align="center">

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Vite](https://img.shields.io/badge/Packing-Vite-A269FF.svg)](https://github.com/SaidBaseTemplate/electron-vue3-ts)
[![Typescript](https://img.shields.io/badge/Language-Typescript-3078C6.svg)](https://github.com/SaidBaseTemplate/electron-vue3-ts)
[![License](https://img.shields.io/github/license/SaidBaseTemplate/electron-vue3-ts)](https://github.com/SaidBaseTemplate/electron-vue3-ts/blob/master/LICENSE)
[![Stars](https://img.shields.io/github/stars/SaidBaseTemplate/electron-vue3-ts)](https://github.com/SaidBaseTemplate/electron-vue3-ts)

</div>


## ✨ 介绍

`electron-vue3-ts` 是一个基于 `Vite` 、`Vue3`和 `TypeScript` 的`Electron`项目模板，可用于快速开发`Electron+Vue3+Ts`的前端项目。

该模板与 `said-cli` 脚手架配套使用，旨在简化项目初始化和开发过程。

## 特性

- 🛠️ 使用 `Vite` ，极速构建，提升开发体验
- 📦 集成 `TypeScript`，强类型支持，提升代码质量
- ♻️ 使用最新的`Vue3`框架进行开发，帮助快速上手
- 🔧 支持热更新和开发服务器，提升开发效率

## 文件结构

项目的主要文件和目录结构如下：

```
electron-vue3-ts
├── .husky/                    # husky脚本目录
├── dist/                      # 构建输出目录
├── src/                       # 源代码目录
│   ├── common/                # 公共方法目录
│   ├── config/                # 配置目录
│   ├── exec/                  # 命令执行方法目录
│   ├── App.vue                # Vue根组件
│   └── main.ts                # 入口文件
├── .gitignore                 # Git 忽略文件配置
├── .prettierignore            # prettier 忽略文件配置
├── .prettierrc                # prettier 配置文件
├── .versionrc                 # standard-version 配置文件
├── CHANGELOG.md               # 版本更新文档
├── commitlint.config.js       # commitlint 配置文件
├── LICENSE                    # 开源协议
├── package.json               # NPM 配置
├── pnpm-lock.yaml             # PNPM 依赖锁定文件
├── README.md                  # 项目说明文件
├── vite.config.ts             # Vite 配置文件
└── tsconfig.json              # TypeScript 配置文件
```

## 快速开始

[said-cli](https://github.com/guizimo/said-cli) 是一个快速拉取模板的脚手架工具，旨在简化和加速项目的初始化过程。

使用 `said-cli` 创建一个基于 `electron-vue3-ts` 模板的新项目。

### 安装 said-cli

如果你还没有安装 `said-cli`，请先全局安装：

```
npm install -g said-cli
```

### 开发

安装依赖

```shell
pnpm i
```

运行

```shell
pnpm run dev
```

打包生成构建产物

```shell
pnpm run build
```



## 更新日志

[**Changelog**](./CHANGELOG.md) - 查看项目的更新日志

## 贡献

欢迎任何形式的贡献！你可以通过以下方式贡献代码：

1. Fork 此仓库
2. 创建你的功能分支 (git checkout -b feature/fooBar)
3. 提交你的更改 (git commit -am 'Add some fooBar')
4. 推送到分支 (git push origin feature/fooBar)
5. 创建一个新的Pull Request

## 许可证

该项目基于 `MIT` 许可证开源。详情请参阅 [LICENSE](https://github.com/SaidBaseTemplate/electron-vue3-ts/blob/main/LICENSE) 文件。

## 联系

如果你有任何问题或建议，请通过以下方式联系我：

- **Email**: 17680262548@163.com
- **GitHub Issues**: [这里](https://github.com/SaidBaseTemplate/electron-vue3-ts/issues)

感谢你使用 `electron-vue3-ts`！希望它能帮助你更快地启动和开发项目。
