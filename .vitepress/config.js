module.exports = {
  lang: 'zh-CN',
  title: 'laf.js 云开发文档',
  description: 'laf.js 云开发开发者使用文档',

  themeConfig: {
    repo: 'lafjs/laf-docs',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '更新于',

    nav: [
      { text: '主页', link: '/' },
      { text: '开发指南', link: '/guide/', activeMatch: '^/guide/' },
      { text: '预览图', link: '/screenshots', },
      { text: '在线 Demo', link: '/todo-list', },
      { text: 'lafyun.com', link: 'https://www.lafyun.com/' },
      {
        text: '更新记录',
        link: 'https://github.com/lafjs/laf/blob/main/CHANGELOG.md'
      }
    ],

    sidebar: {
      '/guide/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: '概览',
      link: '/guide/',
    },
    {
      text: '快速开始',
      link: '/guide/quick-start/',
    },
    {
      text: '使用教程',
      link: '/guide/tutorial/',
      children: [
        {
          text: '云函数',
          children: [
            { text: '云函数简介', link: '/guide/function/' },
            { text: '云函数 Cloud SDK', link: '/guide/function/cloud-sdk' },
            { text: '使用 Node.js 包', link: '/guide/function/import-npm' },
            {
              text: '触发器',
              link: '/guide/function/trigger',
            },
            {
              text: 'WebSocket 连接',
              link: '/guide/function/websocket',
            },
          ]
        },
        {
          text: '云数据库',
          children: [
            { text: '云数据库简介', link: '/guide/db/' },
            { text: '数据操作 API', link: '/guide/db/api' },
            { text: '访问策略', link: '/guide/db/policy' },
          ]
        },
        {
          text: '云存储',
          children: [
            { text: '使用说明', link: '/guide/storage/' },
            { text: '文件令牌', link: '/guide/storage/token' },
          ]
        },
        {
          text: '静态网站托管',
          children: [
            { text: '使用说明', link: '/guide/storage/' },
            { text: '文件令牌', link: '/guide/storage/token' },
          ]
        },
      ]
    },
    {
      text: '示例介绍',
      link: '/guide/examples/',
      children: [
        {
          text: '开发注册/登录功能',
          link: '/guide/examples/3min-login',
        },
        {
          text: '开发一个短信通知服务',
          link: '/guide/examples/sms-notify',
        },
        {
          text: '开发一个企业微信群通知服务',
          link: '/guide/examples/wechat-notify',
        },
        {
          text: '实现网站健康状态拨测服务',
          link: '/guide/examples/health-check'
        },
        {
          text: '实现微信支付功能',
          link: '/guide/examples/wechat-pay'
        },
        {
          text: '实现支付宝支付功能',
          link: '/guide/examples/alipay-pay'
        },
        {
          text: '使用 WebSocket 长连接',
          link: '/guide/examples/websocket'
        },
        {
          text: '区块链：调用 Polkadot 交易接口',
          link: '/guide/examples/polkadot-transaction'
        },
        {
          text: '使用 GitHub Actions 部署个人博客',
          link: '/guide/examples/github-actions-blog'
        }
      ]
    },
    {
      text: '原理介绍',
      children: [
        {
          text: '架构介绍',
          link: '/guide/architecture/',
        },
      ]
    },
    {
      text: '使用案例',
      children: [
        {
          text: '安徽志愿者：志愿者服务平台小程序',
          link: '/guide/cases/volunteer-service',
        },
        {
          text: 'BytePay: 基于区块链的开源激励平台',
          link: '/guide/cases/bytepay',
        },
        {
          text: '国牧私家牧场：国牧黑猪公众号',
          link: '/guide/cases/guomu-pig',
        },
        {
          text: '微草轻课：交互式视频课程在线店铺',
          link: '/guide/cases/withdot',
        },
        {
          text: '灼灼众包：以云团队为核心的众包平台',
          link: '/guide/cases/zhuo-zhuo-zhongbao',
        },
        {
          text: '西秦蜗牛：学习就业管理APP',
          link: '/guide/cases/xiqin-woniu',
        },
        {
          text: '飞腾律协：律师在线协作服务App',
          link: '/guide/cases/feiteng-law',
        }
      ]
    }

  ]
}