![laf](https://socialify.git.ci/labring/laf/image?description=1&descriptionEditable=%E5%83%8F%E5%86%99%E5%8D%9A%E5%AE%A2%E4%B8%80%E6%A0%B7%E5%86%99%E4%BB%A3%E7%A0%81%EF%BC%81&font=Inter&forks=1&language=1&name=1&owner=1&pattern=Circuit%20Board&stargazers=1&theme=Dark)


<div align="center">
  <p>
    <b>像写博客一样写函数！</b>
  </p>

  <p>
    
  [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/labring/laf)
  [![](https://img.shields.io/docker/pulls/lafyun/system-server)](https://hub.docker.com/r/lafyun/system-server)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)
  [![Website](https://img.shields.io/website?url=https%3A%2F%2Fdocs.lafyun.com&logo=Postwoman)](https://docs.lafyun.com/)
  <a href="https://cdn.jsdelivr.net/gh/yangchuansheng/imghosting3@main/uPic/2022-04-22-14-21-MRJH9o.png"><img src="https://img.shields.io/badge/%E5%BE%AE%E4%BF%A1%E7%BE%A4-2000%2B-brightgreen"></a>

  </p>
</div>

## 👀 `laf` 是什么

- `laf` 是云开发平台，可以快速的开发应用
- `laf` 是一个开源的 BaaS 开发平台（Backend as a Service)
- `laf` 是一个开箱即用的 serverless 开发平台
- `laf` 是一个集「函数计算」、「数据库」、「对象存储」等于一身的一站式开发平台
- `laf` 可以是开源版的腾讯云开发、开源版的 Google Firebase、开源版的 UniCloud

[`laf`](https://github.com/labring/laf) 让每个开发团队都可以随时拥有一个自己的云开发平台！

## 🎉 `laf` 有什么

- 多应用管理，新建、启停应用，无需折腾服务器，一分钟上线应用
- 云函数，`laf` 提供的函数计算服务，可以快速的实现后端业务
- 云数据库，为应用开发提供开箱即用的数据库服务
- 云存储，为应用开发提供专业的文件对象存储服务，兼容 S3 和其他存储服务接口
- WebIDE，在线写代码，完善的类型提示、代码自动完成，像写博客一样写函数，随手发布上线！
- 静态托管，支持静态网站的托管，可以快速的上线静态网站，无需折腾 nginx
- Client Db，支持客户端使用 [laf-client-sdk](https://github.com/labring/laf/tree/main/packages/client-sdk) “直连”数据库，通过访问策略控制访问权限，极大程度提升应用开发效率
- WebSocket，应用支持长连接，业务无死角

可以通过下面的屏幕截图进一步了解 `laf`:
<table>
  <tr>
      <td width="50%" align="center"><b>云函数</b></td>
      <td width="50%" align="center"><b>云存储</b></td>
  </tr>
  <tr>
     <td><img src="https://9b069020-06e3-4949-83d9-992a52ca99fe.lafyun.com/file/laf_preview_screens/ide.png"/></td>
     <td><img src="https://9b069020-06e3-4949-83d9-992a52ca99fe.lafyun.com/file/laf_preview_screens/files.png"/></td>
  </tr>
  <tr>
      <td width="50%" align="center"><b>云数据库：数据管理</b></td>
      <td width="50%" align="center"><b>应用列表</b></td>
  </tr>
  <tr>
     <td><img src="https://9b069020-06e3-4949-83d9-992a52ca99fe.lafyun.com/file/laf_preview_screens/collection.png"/></td>
     <td><img src="https://9b069020-06e3-4949-83d9-992a52ca99fe.lafyun.com/file/laf_preview_screens/apps.png"/></td>
  </tr>
</table>

## 👨‍💻 谁适合使用 `laf` ?

1. 前端开发者 + `laf` = 全栈开发者，前端秒变全栈，成为真正的大前端
    - `laf` 为前端提供了 [laf-client-sdk](https://github.com/labring/laf/tree/main/packages/client-sdk)，适用于任何 js 运行环境
    - `laf` 云函数使用 js/ts 开发，前后端代码无隔裂，无门槛快速上手
    - `laf` 提供了静态网站托管，可将前端构建的网页直接同步部署上来，无需再配置服务器、nginx、域名等
    - `laf` 后续会提供多种客户端的 SDK（Flutter/Android/iOS等），为所有客户端开发者提供后端开发服务和一致的开发体验

2. 后端开发者，可以从琐事中解放出来，专注于业务本身，提升开发效率
    - `laf` 可以节约服务器运维、多环境部署和管理精力
    - `laf` 可以让你告别配置、调试 nginx
    - `laf` 可以让你告别「为每个项目手动部署数据库、安全顾虑等重复性工作」
    - `laf` 可以让你告别「修改一次、发布半天」的重复繁琐的迭代体验
    - `laf` 可以让你随时随地在 Web 上查看函数的运行日志，不必再连接服务器，费神费眼翻找
    - `laf` 可以让你「像写博客一样写一个函数」，招之即来，挥之即去，随手发布！

3. 云开发用户，若你是微信云开发用户，你不仅可以获得更强大、快速的开发体验，还不被微信云开发平台锁定
    - 你可以为客户提供源码交付，为客户私有部署一套 `laf` + 你的云开发应用，而使用闭源的云开发服务，无法交付可独立运行的源码
    - 你可以根据未来的需要，随时将自己的产品部署到自己的服务器上，`laf` 是开源免费的
    - 你甚至可以修改、订制自己的云开发平台，`laf` 是开源的、高度可扩展的

4. Node.js 开发者，`laf` 是使用 Node.js 开发的，你可以把 `laf` 当成一个更方便的 Node.js 开发平台 or 框架
    - 你可以在线编写、调试函数，不用重启服务，一键发布即可用
    - 你可以在线查看、检索函数调用日志
    - 你可以不必折腾数据库、对象存储、nginx，随时随地让你的应用上线
    - 你可以随手将一段 Node.js 代码上云，比如一段爬虫，一段监控代码，像写博客一样写 Node！

5. 独立开发者、初创创业团队， 节约成本，快速开始，专注业务
    - 减少启动项目开发的流程，快速启动，缩短产品验证周期
    - 极大程度提高迭代速度，随时应对变化，随时发布
    - 专注于产品业务本身，快速推出最小可用产品(MVP)，快速进行产品、市场验证
    - 一个人 + `laf` = 团队

> life is short, you need laf:)

## 💥 laf 能用来做什么

> `laf` 是应用的后端开发平台，理论上可以做任何应用！

1. 使用 laf 快速开发微信小程序/公众号： 电商、社交、工具、教育、金融、游戏、短视频、社区、企业等应用！
    - 微信小程序强要求 https 访问，可直接使用 [lafyun.com](http://www.lafyun.com) 创建应用，为小程序提供 https 的接口服务
    - 可将应用的 h5 页面和管理端(admin) 直接部署到可由 `laf` 静态托管
    - 将 h5 直接托管到 `laf` 上，将分配的专用域名配置到公众号即可在线访问
    - 使用云函数实现微信授权、支付等业务
    - 使用云存储存储视频、头像等用户数据

2. 开发 Android or iOS 应用
    - 使用云函数、云数据库、云存储进行业务处理
    - 应用的后端管理(admin) 直接部署到可由 `laf` 静态托管
    - 可使用云函数实现微信授权、支付、热更新等业务

3. 部署个人博客、企业官网
    - 将 vuepress / hexo / hugo 等静态生成的博客，一键部署到 `laf` 静态托管上， 见 [laf-cli](https://github.com/labring/laf-cli)
    - 可使用云函数来处理用户留言、评论、访问统计等业务
    - 可使用云函数扩展博客的其它能力，如课程、投票、提问等
    - 可使用云存储存储视频、图片
    - 可使用云函数做爬虫、推送等功能

4. 企业信息化建设：企业私有部署一套 `laf` 云开发平台
    - 快速开发企业内部信息化系统，可快速上线、修改、迭代，降成本
    - 支持多应用、多账户，不同部门、不同系统，即可隔离，亦可连通
    - 可借助 `laf` 社区生态，直接使用现存的 `laf` 应用，开箱即用，降成本
    - `laf` 开源免费，没有技术锁定的顾虑，可自由订制和使用

5. 个人开发者的「手边云」
    - `laf` 让开发者随手写的一段代码，瞬间具备随手上云的能力
    - 就像在你手机的备忘录随手敲下一段文字，自动同步到云端，且可被全网访问和执行
    - `laf` 是每个开发者的“烂笔头”，像记事一样写个函数
    - `laf` 是每个开发者的“私人助理”，比如随时可以写一个定时发送短信、邮件通知的函数

6. 其它
    - 有用户把 `laf` 云存储当网盘使用
    - 有用户把 `laf` 应用当成一个日志服务器，收集客户端日志数据，使用云函数做分析统计
    - 有用户用 `laf` 来跑爬虫，抓取三方新闻和咨讯等内容
    - 有用户使用 `laf` 云函数做 webhook，监听 Git 仓库提交消息，推送到钉钉、企业微信群
    - 有用户使用 `laf` 云函数做拨测，定时检查线上服务的健康状态
    - ...

> 未来，`lafyun.com` 会上线一个应用市场，汇总收集这些应用，让 `laf` 用户一键即可使用海量应用!

## 🖥 在线体验

::: info
🎉 [lafyun.com](http://www.lafyun.com) 是 `laf` 的一个在线版，可在免费线体验 `laf` 云开发应用服务！

开发者可免费在 [lafyun.com](http://www.lafyun.com) 上快速创建自己的应用，免除服务器部署和运维工作，立即拥有应用独立域名及 HTTPS 证书，快速上线应用！
:::

## 🚀 快速开始

[三分钟体验使用 laf 开发一个简单的登陆注册功能](./quick-start/index.md)

## 🏘️ 社群

+ [微信群](https://cdn.jsdelivr.net/gh/yangchuansheng/imghosting3@main/uPic/2022-04-22-14-21-MRJH9o.png)
+ QQ 群：`603059673`

