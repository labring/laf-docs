
#### 发送验证码云函数

> 创建 `sendsms` 云函数，添加依赖 @alicloud/dysmsapi20170525，编写以下代码：

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
      signName: "短信签名",
      templateCode: "模版id",
      templateParam: `{"code":${code}}`,
    });
    let runtime = new $Util.RuntimeOptions({ });
    const res =await client.sendSmsWithOptions(sendSmsRequest, runtime);
  return res.body;
}
```