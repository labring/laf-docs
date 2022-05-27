---
title: 快速开始
---

## 快速开始

::: info
我们将在 [lafyun.com](https://www.lafyun.com) 上，通过开发一个简单的「用户登录/注册」的功能，快速体验 `laf` 云开发。
:::

### 准备工作
  
  1. 你需要在 [lafyun.com](https://www.lafyun.com) 上注册一个账户
  2. 登录到 [lafyun.com](https://www.lafyun.com) 控制台 ，点击左上角的 `新建` 按钮，创建一个空应用
  3. 待应用成功启动后，点击右侧 「开发」 按钮，进入应用的「开发控制台」，接下来，我们将在「开发控制台」 进行第一个 `laf` 应用的功能开发

### 编写云函数

本教程会编写两个云函数: 
- `register` 处理注册请求
- `login` 处理登录请求.




#### 用户注册云函数
  
::: info
在「云函数」管理页面，点击 「新建函数」，创建注册云函数 `register`，

点击 `register` 函数右侧的 「开发」按钮，进入 WebIDE，编写以下代码：
:::

```ts
import cloud from '@/cloud-sdk'
import { createHash } from 'crypto'

exports.main = async function (ctx: FunctionContext) {
  const username = ctx.body?.username || ''
  const password = ctx.body?.password || ''

  // check param
  if (!/[a-zA-Z0-9]{3,16}/.test(username)) return { error: 'invalid username' }
  if (!/[a-zA-Z0-9]{3,16}/.test(password))  return { error: 'invalid password' }

  // check username existed
  const db = cloud.database()
  const exists = await db.collection('users')
    .where({ username: username })
    .count()

  if(exists.total > 0) return { error: 'username already existed'}

  // add user
  const { id } = await db.collection('users')
    .add({
      username: username,
      password: createHash('sha256').update(password).digest('hex'),
      created_at: new Date()
    })

  console.log('user registered: ', id)
  return { data: id }
}
```
::: info
点击右上角的 「显示调试面板」(Ctrl/Cmd + B) 即可调试运行，点击 「保存」 & 「发布」 函数即发布上线！
:::

#### 用户登录云函数

> 同上，创建 `login` 云函数，编写以下代码：

```ts
import cloud from '@/cloud-sdk'
import { createHash } from 'crypto'

exports.main = async function (ctx: FunctionContext) {
  const username = ctx.body?.username || ''
  const password = ctx.body?.password || ''

  // check user login
  const db = cloud.database()
  const res = await db.collection('users')
    .where({
      username: username,
      password: createHash('sha256').update(password).digest('hex')
    })
    .getOne()

  if (!res.data)
    return { error: 'invalid username or password' }
  
  // generate jwt token
  const user_id = res.data._id
  const payload = {
    uid: user_id,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
  }

  const access_token = cloud.getToken(payload)

  return {
    uid: res.data._id,
    access_token: access_token
  }
}
```

> 点击右上角的 「显示调试面板」(Ctrl/Cmd + B) 即可调试运行，点击 「保存」 & 「发布」 函数即发布上线！



### 使用 curl 调用云函数

你可以通过云函数列表页面，查看 & 复制云函数的调用地址，
或将以下 curl 命令中的 `APPID` 替换成你的 APPID 后执行：
```bash
# 注册用户
curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}' https://APPID.lafyun.com/register

# 用户登陆
curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}' https://APPID.lafyun.com/login


```

### 在前端项目中使用云函数

> 在你的前端项目中安装 laf client sdk:

```bash
npm install laf-client-sdk
```


```ts
// user.ts

import { Cloud } from 'laf-client-sdk'

const cloud = new Cloud({ 
  baseUrl: "https://APPID.lafyun.com",
  getAccessToken: () => localStorage.getItem('access_token')
})

// regiser function
export async function register(username: string, password: string) {
  const res = await cloud.invoke('register', {
    username: username,
    password: password
  })

  return res
}

// login function
export async function login(username: string, password: string) {
  const res = await cloud.invoke('login', {
    username: username,
    password: password
  })

  if(res.access_token) {
    // save token
    localStorage.setItem('access_token', res.access_token)
  }

  return res
}
```

> 最后，可以在你的 Vue/React/Angular/小程序 页面中调用这两个云函数完成具体的登录注册功能！


### 其他

  - 我们可以在开发控制台，查看云函数的调用日志，在线调试等
  - 如果调用返回 404，请检查函数名是否拼写错误，或者云函数是否已经发布
