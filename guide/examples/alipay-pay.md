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


