# 第三方授权记录

项目源码和说明以 MIT 分发。版权持有人 ZZM112451 已经用户确认。

无再分发第三方 UI 截图、品牌素材、商业组件、字体或图片。演示用系统字体、文字与原创 CSS；截图来自本项目自有演示和非生产测试样例。任务书与个人文件不进入仓库。

开发依赖（源码不打入 Release，依 package-lock 在本地获取）：

| 包 | 版本 | 许可证 | 用途 |
|---|---|---|---|
| @playwright/test / playwright / playwright-core | 1.58.2 | Apache-2.0 | 浏览器自动化 |
| @axe-core/playwright | 4.11.1 | MPL-2.0 | 无障碍测试桥接 |
| axe-core | 以 lockfile 固定 | MPL-2.0 | 无障碍规则 |
| fflate | 0.8.3 | MIT | 开发阶段 ZIP 打包 |

没有把 MPL/Apache 依赖源码重许可为 MIT。各依赖保留其 LICENSE/NOTICE，npm 分发包分别携带授权文件；Release 排除 node_modules 和浏览器二进制。Chromium 仅供本地测试，不再分发。
