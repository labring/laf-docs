#### 微信支付云函数

> 创建 `wxPay` 云函数，添加依赖 wxpay-v3（github链接：https://github.com/yangfuhe/node-wxpay），编写以下代码：

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