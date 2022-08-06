![](./public/og.png)

# 猜词(CaiCi)

[ 汉兜 - handle ](https://handle.antfu.me)改进版本


内容层面
- [x] 添加古诗主题:五言律诗
- [x] 添加古诗主题:七言绝句
- [ ] 调整负面词语出现频率
- [ ] 增加成语注释
  
机制层面
- [ ] 支持多人游戏
- [ ] 额外增加信息:偏旁部首
- [ ] 增加简图示意,优化色弱用户体验
- [ ] ~~移动端支持语音输入,贴合用户习惯~~
- [ ] 重构韵母 u/v 显示逻辑
- [ ] 增加成就系统: 每日玩家
- [ ] 为深度用户提供注册绑定通道
- [ ] 增加爱心模式:志愿活动换取游戏机会(最多换取一次)
- [x] 默认开启严格模式, 必须输入成语



交互层面
- [ ] 重构设置界面, 依照层级分布
- [x] 拉开提醒按钮和速查表之间的距离, 避免误触
- [x] 针对获取提示的操作增加二次确认, 避免误触
- [ ] 开启遮罩分享时, 声母和韵母长度可选择隐藏
- [ ] 重构速查表布局, 使其与成语同时显示
- [x] 调整弹窗方向从下至上,贴合移动端用户体验
- [ ] 速查表支持自定义布局
- [ ] 分享时内嵌二维码,方便微信用户
- [ ] 移动端兼容夸克浏览器



请勿剧透！PLEASE DO NOT SPOIL

## Development Setup

- Insall [Node.js](https://nodejs.org/en/) >=v16 and [pnpm](https://pnpm.io/)
- Run `pnpm install`
- Run `pnpm dev` and visit `http://localhost:4444`

## 成语勘误

成语数据库储存于

- [./src/data/idioms.txt](./src/data/idioms.txt) - 已知的成语列表
- [./src/data/polyphones.json](./src/data/polyphones.json) - 特殊发音的成语列表

二者互不包含。

如遇到成语缺失或发音错误，请编辑 [./src/data/new.txt](./src/data/new.txt) 文件，一行一词，完成后执行 `pnpm run update` 命令，脚本会自动抓取 [汉典](https://www.zdic.net/) 的数据更新成语数据库。如遇汉典中也缺失的成语，其会留存在 new.txt 中，需要手动判断与添加。

## Tech Stack

- [Vue 3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [VueUse](https://vueuse.org/)
- [UnoCSS](https://github.com/antfu/unocss)
- [Vitesse Lite](https://github.com/antfu/vitesse-lite)

## License

[MIT](./LICENSE) License © 2021-PRESENT [Anthony Fu](https://github.com/antfu)
