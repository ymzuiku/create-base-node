# create-base-node

这是一个 VanillaJS + Vite + Fastify 的全栈项目, 它仅仅是 create-base-node 的 react 剔除版


## Getting Started

### CLI

创建工程:

```bash
npx create-base-node my-project
cd my-project
npm install
```

### Script

- npm run dev : 启动开发模式
- npm run build:server : 编译生产的纯后端
- npm run build:static : 前端工程

## 合法的页面组件导出

规则：

1. 优先读取 `export default`
2. 其次读取首字母大写的 `export` 函数，确保只有一个此类函数

A.有 `export default` 导出 default， 优先使用 `export default`:

```tsx
export default function Home() {
    return <div>Home</div>;
}
```

B.其次使用首字母大写的 `export` 函数:

```tsx
export function Home() {
    return <div>Home</div>;
}
```

```tsx
// 正确，Props仅是类型对象，不会和页面组件冲突
export interface Props {
    title: string;
}

export function Home({title}: Props) {
    return <div>{title}</div>;
}
```

## 进行后端开发

后端的默认入口文件夹为 scripts，若您需要进行完整的后端开发，我们建议您做以下调整：

1. 创建 server 文件夹，并把 `api/index.ts` 文件移动到 `server/index.ts` 中
2. 修改 添加 env 为 SERVER_DIR，从 `api` 修改为 `server`
3. 若有需要拷贝后端文件，可添加环境变量 `COPY_DIR=xxx` 到启动命令中，ssx 会帮你把xxx文件夹下的内容拷贝到运行环境中
4. 若有微服务需求，我们往往需要编译不同的输出路径，可以添加 `COPY_DIR=dist/server-a` 到启动命令中


## Deploy

### 前端

- 拷贝 dist/static 到静态服务器中

### 后端

- 为了更短的 ServerLess 冷启动时间，我们会将所有依赖打包到 index.js 文件中，在生产环境不需要再利用 npm 安装依赖

## 在历史 create-base-node 项目中更新版本

create-base-node 所有的逻辑都编写在 scripts 中，你可以从新的 create-base-node 拷贝 scripts 文件覆盖你当前工程的对应文件。有一个相关的命令帮忙做以上的事情：

```bash
# 在一个 create-base-node 工程中使用：
npx create-base-node --update
# or 强制覆盖更新
npx create-base-node --update --focus
# 安装新依赖（若 package.json 有依赖变动）
npm run install
```

`--update` 命令一共做了两件事情：

1. 备份历史的 scripts 文件夹，并且下载新的 scripts 文件夹
2. 更新 package.json 中和新 create-base-node 相关的依赖

## 编译 PKG 运行环境

PKG 需要描述 package.json 文件，我们可以在环境变量中添加 `BUILD_PKG=true` 来编译 package.json 描述文件



