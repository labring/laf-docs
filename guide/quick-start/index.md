---
title: 快速开始
---

## 快速开始

> 我们将在 [lafyun.com](https://www.lafyun.com) 上，通过开发一个简单的「用户登录/注册」的功能，快速体验 `laf` 云开发。

### 准备工作
  
  1. 你需要在 [lafyun.com](https://www.lafyun.com) 上注册一个账户
  2. 登录到 [lafyun.com](https://www.lafyun.com) 控制台 ，点击左上角的 `新建` 按钮，创建一个空应用
  3. 待应用成功启动后，点击右侧 「开发」 按钮，进入应用的「开发控制台」，接下来，我们将在「开发控制台」 进行第一个 `laf` 应用的功能开发

### 编写云函数

本教程会编写两个云函数:`register` 处理注册请求，`login` 处理登录请求

#### 用户注册云函数
  
> 在「云函数」管理页面，点击 「新建函数」，创建注册云函数 `register`，

> 点击 `register` 函数右侧的 「开发」按钮，进入 WebIDE，编写以下代码：

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

> 点击右上角的 「显示调试面板」(Ctrl/Cmd + B) 即可调试运行，点击 「保存」 & 「发布」 函数即发布上线！


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


#### 发送验证码云函数

> 同上，创建 `sendsms` 云函数，编写以下代码：

```ts

import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';

exports.main = async function (ctx: FunctionContext) {
  const { body } = ctx
  const { phone, code } = body
  class Client {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
    static createClient(accessKeyId: string, accessKeySecret: string): Dysmsapi20170525 {
      let config = new $OpenApi.Config({
      accessKeyId: accessKeyId,  // 您的AccessKey ID
      accessKeySecret: accessKeySecret,// 您的AccessKey Secret
      });
    // 访问的域名
    config.endpoint = `dysmsapi.aliyuncs.com`;
    return new Dysmsapi20170525(config);
    }
  }
  const accessKeyId = '你的key'
    const accessKeySecret = '你的secrect';
    let client = Client.createClient(accessKeyId, accessKeySecret);
    let sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      phoneNumbers: phone,
      signName: "灼灼信息",
      templateCode: "模版id",
      templateParam: `{"code":${code}}`,
    });
    let runtime = new $Util.RuntimeOptions({ });
    const res =await client.sendSmsWithOptions(sendSmsRequest, runtime);
  return res.body;
}
```


#### 支付宝支付云函数

> 同上，创建 `aliPay` 云函数，编写以下代码：

```ts

import cloud from '@/cloud-sdk'
const alipay=require('alipay-sdk').default;
const db = cloud.database();
const AlipayFormData = require('alipay-sdk/lib/form').default
exports.main = async function (ctx) {
  const { body } = ctx;
  const { totalFee,goodsName,goodsDetail } = body;
    //生成订单号
  const payOrderId = Date.now().toString();
  // 构造订单数据
  await db.collection('pay_trade_order').add({
    orderId: payOrderId,
    amount: totalFee,
    subject: goodsName,
    body:goodsDetail
  })
   // 其实前端只需要传 orderid
  const {data: orderRecord }= await db.collection('pay_trade_order')
    .where({
      orderId: payOrderId
    }).getOne()
  // 业务逻辑处理 判断 订单状态 订单金额
  // 创建sdk
  const ali = new alipay({
    appId:"appid",
    signType: "RSA2",
    privateKey: "应用私钥",
    alipayPublicKey:"支付私钥",
    gateway: "https://openapi.alipay.com/gateway.do",//
    });
 const formData = new AlipayFormData()
  formData.setMethod("get")
  formData.addField('notifyUrl', 'https://www.baidu.com')
  formData.addField("bizContent", {
      subject: orderRecord.subject,
      body: orderRecord.body,
      outTradeNo: payOrderId,
      totalAmount: orderRecord.amount,
  })
  let resultpay: any;
  //app支付
  resultpay = await ali.exec(
      'alipay.trade.app.pay',
      {},
      { formData: formData },
    )
  return result(0, resultpay, null);
}
function result(error_code: any, data:any, error_msg: any) {
    return {
        "error_code": error_code,
        "error_msg": error_msg,
        "data":data
    }
}

```


#### 微信支付云函数

> 同上，创建 `wxPay` 云函数，编写以下代码：

```ts

import cloud from '@/cloud-sdk'
const Payment = require('wxpay-v3')

exports.main = async function (ctx: any) {
  const { body } = ctx
  const { goodsName, totalFee, tradeType } = body
  const db = cloud.database()
  const payOrderId = Date.now().toString()
  // 构造订单数据
  await db.collection('pay_trade_order').add({
    orderId: payOrderId,
    amount: totalFee,
    subject: goodsName,
    body: goodsName,
  })
   // 其实前端只需要传 orderid 然后查询订单
  const {data: orderRecord }= await db.collection('pay_trade_order')
    .where({
      orderId: payOrderId
    }).getOne()
  // 实例话 payment  
  const payment = new Payment({
    appid: "公众号ID",
    mchid: "商户id",
    private_key: getPrivateKey(), //require('fs').readFileSync('*_key.pem证书文件路径').toString()
    serial_no: "序列号",
    apiv3_private_key: "api v3密钥",
    notify_url: "付退款结果通知的回调地址",
  })
  // 下单
  let result = await payment.native({
    description: orderRecord.subject,
    out_trade_no: payOrderId,
    amount: {
      total: orderRecord.amount
    }
  })
  return result;
}

function getPrivateKey() {
  const key = `-----BEGIN PRIVATE KEY-----
y83PS9Swz+yTNvN2qnX3pPafMvNSqGpx9JnUADc0MA2WlBH8CFwRsb8OHIekrD9P
IAsNAdWNF8hWlymRSxwR7CLLQfMnwhT6v4Kb+bGO7pjQXWA5cgLfAq/Qk5CcxZ6l
ct4ETebc86XTimHGu3aGpJLoR3pjDuUF5CtqlbAn85Z3QuGK6QDiW4WYaIAkVhIg
HOBHEk+4cdiPcvhowhC8ii7838DP4qC+18ibL/KAySWyZjUC/keOr4MxhxQ1T+OV
GLBil3lhECQUD3kbPgAoXD5HD7iPijvQK8ZkytqPXXER5A7qcB+JASh7jpz3My5f
4XDaVJZtAgMBAAECggEAF+CqQTANU4XdpTNdeMS6M2NQbNevJ62jjXK/0D2RKaAw
+1MswPzpZ5Ss7iPlVT8Okkn36sVo+6uqhRobzXzJ4tW/MC++84E0Fes3ODxB0PfL
gCHPGQq4AeolLfOyIdTO+k4QV+HOnCjSLyx3Ax6WPj3ElRNwMRgiKINEM7ubM38f
wZpQuCqiKXzT1LG1kiRwMbVU++Xw1Qf/yQysKNI9ls1SoLmrhfXGuj/e3iWSN6ST
sJLenuJpecjP0QF5UBQPPlpHVDwfJSw52opEofYLIPgm28Yrl9dJgQ0u9wjFBbHE
pI4yOgCQ1eAEzr07hJbhaLU759BnyK4s6TQAp5AK7QKBgQDyumlmsnsMd9zoh2XF
D056HCTsU6cMJERxPbhI33kRa+JD6tXBi1gjgNojCuyByQ+7LXty8j84SQk6hmTI
j/E1L9rrQzeNNC2TEmn/LL4RayPY2r05HTpAKCf6OEfqfKxROWkcBJDAxaR+YFYV
v8n7QesR4og4RLUauu5NVxbqawKBgQDZef64oGC5vsNH19x+wI269E7/gXGmXVit
KVoPRnWS3cjYRrD5NqCm92RP4gNs/2Axdkm1GVZ0P7NzbP/T0pIJWYzr6Kl7BO7w
LUQoUF/URugVQOkGNQmKWpXjgaaCMUR0EudF8im+5XS3gBEeYVEZzPN1Hbhh5P4B
lZqpaerohwKBgHjkUVS99j06gcMqlIx2WC7HT7iI3X1VnuULyXo6G3GK2xHap4YT
Id3k8kBb03m8q2IdgAu7DbO55KfKge3Gi2tjH1TnkIZ6g2xp0nMuVKgWRa9fGrmU
jgugNHESkPcAC08VGf3DZFku1wO+dYG1mSLULQEmY5Qq3Eyo58GLa7VrAoGANDio
IrtYHqIhEEpURxeDsQXjRlVV7gXyOjp4xrw7lVWuWci3zFACybUUIF58RhsYhSgL
UPJRoT5+n9Pnpnyk1pvrS+alc8XefkvQVwHd0QJpzli02+m2bcOMxIGocxDTiC/V
2yToQ0+j9EBLXAkwSUq+lzvYv6EWIVlENzQY1VcCgYAeL0jsyVQIM6iQzTN2lrVj
zfDCVrf8KsaWhr6K4pSGGETvsd+BpvTMrX2tK0vbs/L0odVRFeGX5+XJjCCkEosc
475J8ALCRltkgTSxicoXS7SpjLqvIH2FPpv2BI+qQ3nOmAugsRkeH9lZdC/nSC0m
uI205SwTsTaT70/vF90AwQ==
-----END PRIVATE KEY-----
`
  return key
}

```


### 使用 curl 调用云函数

你可以通过云函数列表页面，查看 & 复制云函数的调用地址，
或将以下 curl 命令中的 `APPID` 替换成你的 APPID 后执行：
```bash
# 注册用户
curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}' https://APPID.lafyun.com/register

# 用户登陆
curl -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "admin"}' https://APPID.lafyun.com/login

# 发送验证码
curl -X POST -H "Content-Type: application/json" -d '{"phone": "188****2577", "code": "123456"}' https://APPID.lafyun.com/sendsms


# 支付宝支付
curl -X POST -H "Content-Type: application/json" -d '{"goodsName": "laf", "goodsDetail": "让开发更简单","totalFee":10}' https://APPID.lafyun.com/aliPay


# 微信支付
curl -X POST -H "Content-Type: application/json" -d '{"goodsName": "laf", "goodsDetail": "让开发更简单","totalFee":10}' https://APPID.lafyun.com/wxPay

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
