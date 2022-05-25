import { defineConfig, DefaultTheme } from 'vitepress'


/**
 * @type {DefaultTheme.NavItem[]}
 */
const NavConfig = [
  { text: '主页', link: '/' },
  { text: '开发指南', link: '/guide/', activeMatch: '^/guide/' },
  { text: '预览图', link: '/screenshots', },
  { text: '在线 Demo', link: '/todo-list', },
  { text: 'lafyun.com', link: 'https://www.lafyun.com/' },
  {
    text: '更新记录',
    link: 'https://github.com/lafjs/laf/blob/main/CHANGELOG.md'
  },
  {
    text: 'GitHub',
    link: 'https://github.com/lafjs/laf'
  }
]

/**
 * @type {DefaultTheme.MultiSideBarConfig}
 */
const GuideSiderbarConfig = [
  {
    text: '概览',
    link: '/guide/',
  },
  {
    text: '快速开始',
    link: '/guide/quick-start/',
  },
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
      { text: '访问策略', link: '/guide/db/policy' },
      { text: '云数据库 API', link: '/guide/db/api' },
    ]
  },
  {
    text: '云存储',
    children: [
      { text: '云存储简介', link: '/guide/oss/' }
    ]
  },
  {
    text: '静态网站托管',
    children: [
      { text: '静态托管简介', link: '/guide/website-hosting/index' },
      { text: '快速开始', link: '/guide/website-hosting/quick-start' },
    ]
  },
  {
    text: '示例介绍',
    // link: '/guide/examples/',
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
        link: '/guide/architecture',
      },
    ]
  },
  {
    text: '使用案例',
    children: [
      {
        text: '志愿者服务小程序',
        // link: '/guide/cases/volunteer-service',
        link: '/guide/cases/'
      },
      {
        text: 'BytePay 区块链支付平台',
        // link: '/guide/cases/bytepay',
        link: '/guide/cases/'
      },
      {
        text: '国牧私家牧场公众号',
        // link: '/guide/cases/guomu-pig',
        link: '/guide/cases/'
      },
      {
        text: '微草轻课交互式课程',
        // link: '/guide/cases/withdot',
        link: '/guide/cases/'
      },
      {
        text: '灼灼众包平台',
        // link: '/guide/cases/zhuo-zhuo-zhongbao',
        link: '/guide/cases/'
      },
      {
        text: '蜗牛学习APP',
        // link: '/guide/cases/xiqin-woniu',
        link: '/guide/cases/'
      },
      {
        text: '律协App',
        // link: '/guide/cases/feiteng-law',
        link: '/guide/cases/'
      }
    ]
  }

]


export default defineConfig({
  lang: 'zh-CN',
  title: 'laf 云开发文档',
  description: 'laf 云开发开发者使用文档',

  themeConfig: {
    logo: '/logo.png',
    // repo: 'lafjs/laf',
    // docsRepo: 'lafjs/laf-docs',
    docsBranch: 'main',
    docsDir: '',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '更新于',
    nav: NavConfig,

    sidebar: {
      '/guide/': GuideSiderbarConfig
    }
  }
})
