# 原生设置与可迁移存储

2026-10-26，交付 0.5.4，已实现；真实云账户与 Windows 未覆盖。

用户确认 S3 保存媒体、本机保存索引；ZIP 是完整迁移包。验收：原生设置可配置连接；本地库不受影响；S3 导入、预览、重试正常；本地和 S3 导出都能离线恢复收藏夹、标签和向量；中断可重试，损坏 ZIP 不产生半成品库。

接口依据：目标 DSH 0.2.0-rc.2 的 ui-settings/client/contract/slots.ts 提供 settings.section；宿主 SidebarRoot 通过 sidebar.settings 渲染原生设置入口；自定义侧栏不能重复声明其子槽。没有公开的跨插件 openSection 服务，使用 settings.launcher 的公开 openSettings 回调和原生设置导航，不访问宿主 DOM 或私有 store。

设计：contracts 维护共享 schema；storage.ts 保存库绑定；objects.ts 封装 AWS SDK 的私有对象读写；archive.ts 用流式 ZIP 与校验和提供便携快照；transfer.ts 管理独立于页面的持久传输队列；service.ts 是统一业务所有者。客户端使用原生 slot、控件和主题 token。每个库固定非敏感 S3 地址，凭据按连接身份保存在 DSH。上传成功才回收本地原件，失败保留暂存，可重试。活动素材索引与媒体目录不通过 S3 同步。

ZIP 导出以同步读取的目录快照为准，只包含关联媒体、用户元数据和向量，不包含锁、配置、密钥或本机路径。导入验证后创建独立库身份，使用新目录，不覆盖旧库。ZIP64 流式处理。导出/导入任务串行执行，显示进度、取消、重试；进程中断后暂停并提示恢复。S3 上传与索引复用原队列。

实施顺序：存储/契约→ZIP 与队列→原生设置/入口→业务测试→隔离宿主安装/界面验收。验证使用临时目录、本地 S3 协议测试服务与现有独立 DSH profile，不使用个人配置或真实云账户。真实 S3 供应商兼容性、Windows 保留为未验证，除非后续实际测试。

参考：[AWS SDK multipart](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-lib-storage/)、[yauzl](https://github.com/thejoshwolfe/yauzl)、[yazl](https://github.com/thejoshwolfe/yazl)。
