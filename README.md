### v7.0  微信/h5


### 目录结构

```shell
├── components/                 # Shared or generic UI components
│   ├── link/                   # Button component
│   ├── layout/                 # Website layout component
│   └── ...                     # etc.
├── docs/                       # Documentation to the project
├── node_modules/               # 3rd-party libraries and utilities
├── src/                        # Application source code
│   ├── about/                  # About page
│   ├── error/                  # Error page
│   ├── home/                   # Home page
│   ├── history.js              # Handles client-side navigation
│   ├── main.js                 # <== Application entry point <===
│   ├── router.js               # Handles routing and data fetching
│   ├── routes.json             # This list of application routes
│   └── store.js                # Application state manager (Redux)
├── public/                     # Static files such as favicon.ico etc.
│   ├── dist/                   # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── ...                     # etc.
├── test/                       # Unit and integration tests
├── tools/                      # Utility and helper classes
└── package.json                # The list of project dependencies and NPM scripts
```


### Getting Started

**Step 1**. 安装 [Node.js](https://nodejs.org/) v6 和
[Yarn](https://yarnpkg.com/)

**Step 2**. 安装依赖模块

```shell
$ yarn install                  # Install project dependencies listed in package.json
```


**Step 3**. 编译和运行

```shell
$ yarn start                    # Compiles the app and opens it in a browser with "live reload"
```

* Release 模式运行： `yarn start -- --release`
* 无热更新模式运行：`yarn start -- --no-hmr`
* 访问 [http://localhost:3000/](http://localhost:3000/)


### 打包

```shell
$ yarn build                    # Compiles the app into the /public/dist folder
```
打包完所有文件会在 public 目录下


### redux 说明

#### 中间件

* [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware)：简化 redux 异步请求，Action 中只需要写一个 type，Reducer 中会自动分成三类：PENDING、FULFILLED、REJECTED（优先使用）
* [redux-devtools](https://github.com/gaearon/redux-devtools) redux 开发调试工具，可以方便查看 redux 状态

#### 目录规范

1. 全局通用组件放在 `src/components` 下，例如全局导航等
2. 页面逻辑放在 `src/pages` 下，需要在 `src/routes.json` 中添加路由信息
3. 页面组件放在个页面目录中的 `components` 中
4. store 分为通用和页面级，页面级主要用于服务端数据请求和存储，最后合并到 `src/stores/index` 中，页面级 action 和 reducer 合并到同一个文件放在页面目录下并已 `.store` 命名

### 组件规范

1. 必须写 propTypes，并且禁用 object 类型，object 类型请使用 shape 并完整书写其中属性
2. 注意生命周期方法顺序
3. 定时器务必在 componentWillUnmount 中进行清除

### 微信调试开发版本

1. 手机连接 charles 代理
2. 在 charles 代理中设置 Map Remote，将域名映射到 http://localhost:300

### API 文档

[智多星 API文档](https://www.zybuluo.com/lina/note/892990)
[微信JS-SDK说明文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115)
[微信JS-SDK DEMO](http://203.195.235.76/jssdk/)
[React-WEUI](https://github.com/weui/react-weui/)

### 部署测试服务器

#### 测试服务器发布

windows 开发机本地发布可能不变，可以 ssh 到测试服务器上发布，步骤如下

```
1. ssh miller@60.205.182.2 密码:miller
2. cd /home/miller/volunteer-h5
3. sh tools/deploy-testserver.sh
```

#### 本地发布
```
在项目根目录执行：
sh tools/deploy-testserver.sh
注意：如果本地有修改会进入 stash 列表，所以发布后如果发现本地修改没了不要紧张，执行 git stash apply 就可以恢复；

60.205.182.2 miller/miller
静态资源 /data/webapp/volunteer/Volunteer_wechat/public
首页模板 /data/webapp/volunteer/Volunteer_wechat/resources/views/wechat.blade.php
```

### 本地与服务器

1. 本地加载的是 public/index.ejs 编译而来的 index.html，因此调试全局变量请修改 index.ejs
2. 服务器加载的是 wechat.blade.ejs 编译而来的 wechat.blade.php

### 管理系统

* [后台](https://bmw.volzdx.cn)
