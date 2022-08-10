
# 猜词(CaiCi)

身为[ 汉兜(handle) ](https://handle.antfu.me)老粉丝,天天猜成语厌腻之, 

于是... [猜词(CāiCí)](https://caici.forkway.cn/)诞生了..

<br/>

猜词(CāiCí) 的 UI风格完全继承 [汉兜(handle) ](https://handle.antfu.me),一天一个答案的浪漫也永不改变,

但有亿丢丢小的变化:

### 内容层面
- [x] 🧑‍💻 添加古诗词主题:五言
- [x] 👩‍💻 添加古诗词主题:七言
- [ ] 🤞 调整负面词语出现频率, 传播正能量
- [ ] 🙇 增加成语和古诗词注释, 释怀动物猜词后的悲伤
  
### 机制层面
- [ ] 💕 支持多人游戏,照顾异地恋选手
- [ ] 🦴 额外增加信息:偏旁部首
- [ ] ❤️ 增加简图示意,优化色弱用户体验
- [ ] 🦴 重构韵母 u/v 显示逻辑
- [ ] 🙌 增加成就系统: 每日玩家
- [ ] 🙌 为愿意和猜词(CāiCí)继续交朋友的玩家提供登录通道,方便服务端保存信息
- [x] 🔨 默认开启严格模式, 要求必须输入成语



### 交互层面
- [x] 🚀 重构移动端的设置界面, 避免新用户一脸懵逼
- [x] ❤️ 拉开提醒按钮和速查表之间的距离, 手残党点错
- [x] ❤️ 针对获取提示的操作增加二次确认, 继续爱护手残党
- [ ] ✍ 开启遮罩分享时, 声母和韵母长度可选择隐藏,谁让长度也是信息量
- [x] ✍ 重构速查表布局, 使其与成语同时显示
- [x] 📱 调整弹窗方向从下至上,贴合移动端用户体验
- [ ] 📱 速查表支持自定义布局
- [x] 🔥 分享时内嵌二维码,方便朋友圈比武
- [ ] 📱 移动端兼容夸克浏览器
- [x] 📱 IOS 添加到主屏幕时,重做图标样式,兼容PWA模式



请勿剧透！PLEASE DO NOT SPOIL




## Project Status

项目正在🏗 WIP 中, 欢迎 PR.

dev版:https://caici.vercel.app/

uat版: https://caici.forkway.cn/


## Development Setup

- Insall [Node.js](https://nodejs.org/en/) >=v16 and [pnpm](https://pnpm.io/)
- Run `pnpm install`
- Run `pnpm dev` and visit `http://localhost:4444`


## Tech Stack

- [Vue 3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [VueUse](https://vueuse.org/)
- [UnoCSS](https://github.com/antfu/unocss)
- [Vitesse Lite](https://github.com/antfu/vitesse-lite)

## License

[MIT](./LICENSE) License © 2021-PRESENT [LeiZhenpeng](https://github.com/leizhenpeng)
