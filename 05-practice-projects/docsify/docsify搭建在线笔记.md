## docsify搭建在线笔记

### 文档

- [Docsify](https://docsify.js.org/#/zh-cn/)
- [GitHub Page](https://pages.github.com/)

### 目录

* [1. 初始化项目](#1-初始化项目)
* [2. 基本使用](#2-基本使用)

#### 1. 初始化项目

```
1 全局安装docsify-cli工具：npm i docsify-cli -g
2 初始化项目：docsify init ./docs
3 启动项目：docsify serve
```

#### 2.基本使用

```
1 参考文档：https://docsify.js.org/#/zh-cn/
```

#### 3.实现侧边栏搜索框

```

```

#### 3. 部署到GitHub Page

```
1 参考文档：https://pages.github.com/
```



## 实现侧边栏搜索框

要在 docsify 中实现侧边栏搜索框，可借助 docsify 的搜索插件，以下是具体步骤：

### 1. 启用搜索插件

docsify 本身内置了搜索功能，在 `index.html` 的 `window.$docsify` 配置里添加如下内容来启用：

```html
<script>
  window.$docsify = {
    // 启用搜索功能，设置为 auto 会自动从侧边栏（_sidebar.md）中查找要建立搜索索引的文件
    search: 'auto', 
    // 可选，设置搜索结果的标题最大显示层级，比如设为 6 会显示到六级标题
    // search: {
    //   maxAge: 86400000, // 搜索索引缓存的时长（毫秒），这里是 1 天
    //   paths: 'auto', // 自动从侧边栏获取要搜索的文件路径，也可手动指定数组，如 ['/', '/guide', '/get-started']
    //   placeholder: '搜索...', // 搜索框的占位提示文字
    //   noData: '未找到结果', // 没有搜索到内容时显示的提示
    //   depth: 6, // 搜索的标题层级深度，即会对 markdown 文件中几级标题建立索引用于搜索
    }
  };
</script>
```

当设置 `search: 'auto'` 后，docsify 会去读取侧边栏文件（`_sidebar.md`）里的链接对应的 markdown 文件，在本地 `localStorage` 中建立搜索索引，这样就能实现基于这些文件内容的搜索 。

### 2. 确保侧边栏配置正确

需要有正确的 `_sidebar.md` 文件来定义侧边栏结构，示例 `_sidebar.md` 内容如下：

```markdown
- [首页](README.md)
- [HTML 基础](html/basic.md)
- [CSS 进阶](css/advanced.md)
```

这样搜索插件才能知道要对哪些 markdown 文件建立搜索索引，让搜索功能覆盖到相关页面内容 。

### 3. 添加搜索插件

在 `index.html` 中要引入 docsify 的脚本，一般放在页面底部，示例：

```html
<script src="//cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.js"></script>
```

确保 docsify 能正常加载运行，搜索功能依赖其核心逻辑 。

### 4. （可选）自定义搜索样式

如果对默认的搜索框样式不满意，可通过自定义 CSS 来修改。比如在 `index.html` 的 `<head>` 里添加 `<style>` 标签，写入如下样式示例（可根据实际需求调整）：

```html
<style>
  .search-input {
    /* 搜索框宽度 */
    width: 200px; 
    /* 内边距 */
    padding: 8px; 
    /* 边框样式 */
    border: 1px solid #ccc; 
    /* 边框圆角 */
    border-radius: 4px; 
    /* 字体大小 */
    font-size: 14px; 
  }
  .search-result {
    /* 搜索结果列表边距 */
    margin-top: 8px; 
  }
  .search-result-item {
    /* 搜索结果项的内边距 */
    padding: 6px; 
  }
</style>
```





## 实现代码复制

在Docsify中添加代码复制功能可以提升用户体验，让访客更容易复制代码片段。以下是几种实现方法：

### 方法一：使用docsify-copy-code插件（推荐）

这是最简单、最常用的方法：

1. 在`index.html`中添加插件：

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 其他head内容 -->
  <!-- 引入docsify-copy-code CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/docsify-copy-code/dist/style.min.css">
</head>
<body>
  <!-- 其他body内容 -->
  
  <!-- 引入docsify和插件 -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
  <!-- 引入docsify-copy-code插件 -->
  <script src="//cdn.jsdelivr.net/npm/docsify-copy-code/dist/docsify-copy-code.min.js"></script>
</body>
</html>
```

1. 配置选项（可选）：

```
window.$docsify = {
  copyCode: {
    buttonText: '复制',  // 按钮文字
    errorText: '复制失败',  // 复制失败提示
    successText: '复制成功'  // 复制成功提示
  }
}
```

1. **样式自定义**（可选）：

   ```
   /* 自定义docsify-copy-code样式 */
   .docsify-copy-code-button {
     background: #42b983 !important;
     color: white !important;
   }
   .docsify-copy-code-button::after {
     content: '📋';
     margin-left: 5px;
   }
   ```



## 定制侧边栏

### 1. 创建侧边栏配置文件

在 docsify 项目的根目录（一般是存放 `index.html` 和文档的目录，比如 `docs` 目录 ）下，新建一个名为 `_sidebar.md` 的文件，这个文件用于定义侧边栏的内容和结构。

你可以用 Markdown 语法编写侧边栏的链接、标题等，示例如下（假设文档是 Markdown 格式）：

```markdown
- [首页](README.md)
- HTML
  - [基础](html/basic.md)
  - [进阶](html/advanced.md)
- CSS
  - [样式基础](css/basic-style.md)
  - [布局](css/layout.md)
```

- 一级列表项一般是大的分类或直接的页面链接，二级及以上列表项可用于展示层级关系（对应文档里的小标题等，结合 `subMaxLevel` 配置可控制自动提取的标题层级 ）。
- 链接路径使用相对路径，`README.md` 是很多 docsify 项目默认的首页文档，也可根据实际情况替换。

### 2. 修改 `index.html` 开启侧边栏加载

找到项目里的 `index.html` 文件，在 `window.$docsify = { ... }` 配置中，添加或修改以下关键配置：

```html
<script>
  window.$docsify = {
    // 开启加载侧边栏功能，会去加载 _sidebar.md 文件
    loadSidebar: true,  
    // 可选，设置侧边栏自动提取 Markdown 标题的最大层级，比如设为 2 会提取到二级标题
    subMaxLevel: 2,    
    // 可选，用于处理不同路径下侧边栏文件的映射，若侧边栏文件不在根目录可配置
    alias: {
      '/.*/_sidebar.md': '/_sidebar.md' 
    }
  };
</script>
```

- `loadSidebar: true` 是核心，告诉 docsify 要加载侧边栏配置文件（即 `_sidebar.md` ）。
- `subMaxLevel` 能让 docsify 自动从 Markdown 内容里提取对应层级的标题到侧边栏，和 `_sidebar.md` 里手动写的内容配合，构建更丰富的侧边栏结构。

### 3. （可选）处理多级目录与侧边栏细节

- **多级目录结构**：如果文档分散在不同文件夹（比如 `html`、`css` 等文件夹分类存放 ），`_sidebar.md` 里的链接路径要和实际文件路径对应，保证能正确跳转。
- **侧边栏折叠 / 展开**：若想实现侧边栏目录折叠效果，可引入 `docsify-sidebar-collapse` 插件。先在 `index.html` 里通过 `<script>` 引入插件（可使用 CDN 方式 ），示例：

```html
<script src="//cdn.jsdelivr.net/npm/docsify-sidebar-collapse/dist/docsify-sidebar-collapse.min.js"></script>
```

然后在 `window.$docsify` 配置里添加相关设置（具体参数可根据需求调整 ）：

```js
window.$docsify = {
  loadSidebar: true,
  // 侧边栏折叠插件相关配置，控制默认展开层级等
  sidebarDisplayLevel: 1, 
  // ...其他配置
};
```

### 4. 验证效果

启动 docsify 本地服务（比如执行 `docsify serve docs` ，`docs` 是你的文档目录 ），打开浏览器访问本地预览地址，就能看到左侧出现配置好的侧边栏，点击链接可跳转对应文档，侧边栏也会根据 `subMaxLevel` 等配置，展示自动提取的标题或手动定义的层级结构。

这样，就能借助 `_sidebar.md` 和 `index.html` 的配置，在 docsify 中实现左侧侧边栏效果，让文档导航更清晰，方便读者浏览啦 。

## 统计数量

在 **docsify** 中，侧边栏右侧显示的 “文件数 / 文章数”（比如你截图里左侧列表每个分类后面的数字，像 `HTML 30` 、`CSS 25` ），是通过 **自动统计分类下的文档数量** 实现的，核心依赖 `count` 插件。以下是完整配置流程：

------

### 1. 原理说明

docsify 本身不默认统计侧边栏数量，需通过 **`docsify-count` 插件** 实现。该插件会遍历侧边栏配置（`_sidebar.md`），统计每个分类下的 Markdown 文件数量，动态渲染到侧边栏标题后。

------

### 2. 配置步骤

#### （1）引入 `docsify-count` 插件

在 `index.html` 的 `<head>` 或 `<body>` 中，通过 CDN 引入插件（推荐 jsDelivr）：

```html
<!-- docsify-count 统计插件 -->
<script src="//cdn.jsdelivr.net/npm/docsify-count@latest/dist/count.min.js"></script>
```

#### （2）开启计数配置

在 `window.$docsify = { ... }` 中添加 `count` 相关配置：

```js
window.$docsify = {
  // 其他基础配置（如 loadSidebar、subMaxLevel 等）
  
  // 统计插件配置
  count: {
    // 开启计数（必填）
    enable: true,  
    // 统计的文件类型（默认 .md，可自定义）
    countable: ['md'],  
    // 排除统计的文件（正则，可选）
    uncountable: ['README.md'], 
    // 自定义计数显示格式（可选，默认: "  {count} "）
    dirCountable: true, // 是否统计目录下的文件（包含子目录）
    countDir: '  ({count})', // 目录数量的显示格式
    countFile: '  {count}', // 文件数量的显示格式
  }
};
```

**关键参数说明**：

- `enable: true`：开启统计功能（必须设置）。
- `countable: ['md']`：指定统计的文件类型（仅 Markdown 文件）。
- `uncountable`：排除某些文件（如首页 `README.md` 不想统计时配置）。
- `dirCountable`：是否递归统计子目录的文件（需开启才能统计多级目录）。

#### （3）确保侧边栏结构正确

`_sidebar.md` 需要是**层级化的列表结构**，插件会根据列表层级统计对应目录 / 分类下的文件数。示例：

```markdown
- [HTML](html/)  <!-- 目录 -->
  - [基础](html/basic.md)
  - [进阶](html/advanced.md)
- [CSS](css/)    <!-- 目录 -->
  - [样式](css/style.md)
```

- 一级列表（如 `HTML` `CSS` ）对应**目录**，插件会统计该目录下所有 `.md` 文件（含子目录）。
- 二级列表（如 `基础` `进阶` ）对应**单个文件**，会被计入父级目录的统计。

#### （4）验证效果

启动 docsify 服务（`docsify serve docs` ），访问页面后：

- 侧边栏分类后会自动显示统计的文件数量（如 `HTML 30` 表示 `html/` 目录下有 30 个 `.md` 文件 ）。
- 若未显示，检查：
  - 插件是否正确引入（网络是否可访问 CDN）。
  - `count.enable` 是否为 `true`。
  - 侧边栏目录是否存在对应文件（路径是否正确）。

------

### 3. 进阶：自定义显示样式

如果想修改 “数量” 的显示样式（比如去掉空格、改成括号等），通过 `countFile` 和 `countDir` 配置：

```js
count: {
  enable: true,
  // 目录数量显示为: HTML (30)
  countDir: '  ({count})',  
  // 文件数量显示为: 基础 1
  countFile: '  {count}',  
}
```

也可以通过 CSS 直接覆盖样式（在 `index.html` 中添加 `<style>` ）：

```css
/* 调整侧边栏数量的字体、颜色 */
.sidebar-nav .count {
  color: #999;
  font-size: 12px;
  margin-left: 5px;
}
```

------

### 4. 常见问题

- 数量统计不准确？
  - 检查 `uncountable` 是否排除了不必要的文件。
  - 确保 `dirCountable: true`（需要递归统计子目录时）。
- **想统计非 Markdown 文件？**
  修改 `countable: ['md', 'txt']`（添加需要统计的扩展名）。
- **侧边栏是自动生成的（未用 `_sidebar.md`）？**
  `docsify-count` 仅支持基于 `_sidebar.md` 或 `loadSidebar` 配置的侧边栏统计，自动生成的侧边栏（如 `subMaxLevel` 提取标题）无法直接统计数量。

通过以上配置，就能在 docsify 侧边栏右侧显示文件数量啦，让文档结构更清晰、读者更直观了解分类下的内容规模 🔥





## 在docsify中添加评论功能

a7059451848c61187a781e519f5417ff1784bce5

要在docsify博客中实现类似图片中的评论功能，你有几种选择。下面我会介绍几种常见的方法：

以下是使用 Gitalk 的详细步骤，从准备工作到集成到页面，帮你完整用上这个评论插件：

### 一、准备工作（在 GitHub 上操作）

#### 1. 创建存储评论的仓库

- 登录 GitHub 后，点击右上角 “+” → “New repository” 。
- 填写仓库名（比如 `blog-comments` ）、描述，选择公开仓库（私有仓库无法用 Gitalk ，因为要让评论系统访问），创建仓库。这个仓库用来存所有页面的评论（以 Issue 形式）。

#### 2. 申请 GitHub OAuth Application（获取 clientID、clientSecret ）

- 进入 GitHub 个人设置（右上角头像 → Settings ）→ Developer settings → OAuth Apps 。
- 点击 “New OAuth App” ，填写信息：
  - **Application name**：填个名字（比如 `Gitalk-Comments` ，用户能识别的）。
  - **Homepage URL**：填你网站的主页地址（比如 `https://lining-lo.github.io` ，就是部署 docsify 等页面的域名 ）。
  - **Authorization callback URL**：填授权成功后跳转的地址，必须和主页地址一致（比如 `https://lining-lo.github.io` ），保证 OAuth 流程能闭环。
- 填完点 “Register application” ，注册成功后，就能看到 **Client ID** 和 **Client Secret** ，后面代码里要用到。

### 二、在页面中集成 Gitalk（以 HTML 项目为例，比如 docsify ）

#### 1. 引入 Gitalk 资源

在页面的 `<head>` 里引入 Gitalk 的 CSS 和 JS （也可以下载到本地，避免 CDN 问题 ）：

```html
<!-- Gitalk 的 CSS ，美化评论区样式 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk/dist/gitalk.css"> 
<!-- Gitalk 的 JS ，实现评论功能逻辑 -->
<script src="https://cdn.jsdelivr.net/npm/docsify/lib/plugins/gitalk.min.js"></script> 
<!-- Gitalk 的 JS ，实现评论功能逻辑 -->
<script src="https://cdn.jsdelivr.net/npm/gitalk/dist/gitalk.min.js"></script> 
```

#### 2. 添加评论容器

在页面的 `<body>` 里，找个想放评论区的位置（比如文档内容底部），加个空的 `div` ：

```html
<div id="gitalk-container"></div> 
```

Gitalk 会把评论区渲染到这个容器里。

#### 3. 初始化 Gitalk（写 JavaScript 配置 ）

在页面的 `<script>` 里，写 Gitalk 的初始化代码，把前面准备的信息填进去：

```javascript
<script>
const gitalk = new Gitalk({
  // 第一步申请的 OAuth App 的 Client ID
  clientID: '你的Client ID',  
  // 第一步申请的 OAuth App 的 Client Secret（注意保密，别暴露在前端代码里！生产环境建议后端处理）
  clientSecret: '你的Client Secret',  
  // 第一步创建的、用来存评论的仓库名（比如 blog-comments ）
  repo: 'blog-comments',  
  // 仓库的所有者（GitHub 用户名或组织名，比如 lining-lo ）
  owner: 'lining-lo',  
  // 仓库的管理员（能管理评论的用户，数组形式，填自己用户名就行，比如 ['lining-lo'] ）
  admin: ['lining-lo'],  
  // 标记当前页面的唯一 ID ，一般用页面路径（保证每个页面评论独立），比如 location.pathname 
  id: location.pathname,  
  // 评论区语言，比如 'zh-CN' 是简体中文
  language: 'zh-CN',  
  // 是否开启无干扰模式（全屏遮罩那种，false 就是普通模式 ）
  distractionFreeMode: false,  
  // 自动创建 Issue ，如果没找到对应页面的 Issue ，true 会自动创建（建议先手动创建试试，再开自动 ）
  createIssueManually: true,  
  // Issue 的标签，方便在 GitHub 筛选，比如 ['Gitalk', '评论'] 
  labels: ['Gitalk', '评论'],  
});
// 渲染评论区到容器里
gitalk.render('gitalk-container');  
</script>
```

### 三、首次使用与验证

- **首次加载页面**：打开集成了 Gitalk 的页面，评论区会提示 “未找到相关的 Issues 进行评论，请联系 @xxx 初始化创建” 。

- 初始化评论

  ：这时候需要用 GitHub 账号登录（点击评论区的 “使用 GitHub 登录” ），然后：

  - 要么手动去仓库的 Issues 里，创建一个和页面 `id` （也就是路径）对应的 Issue ，标签填配置里的 `labels` （比如 `Gitalk` 、`评论` ）。
  - 要么把 `createIssueManually` 改成 `false` ，让 Gitalk 自动创建 Issue （但要确保 GitHub 账号有权限创建，且仓库是公开的 ）。

- **评论测试**：登录后，刷新页面，就能在评论区输入内容，用 `cmd|ctrl + enter` 提交评论，评论会同步到 GitHub 仓库的对应 Issue 里。

### 四、常见问题 & 注意事项

1. **clientSecret 暴露风险**：前端代码里直接写 `clientSecret` 不安全！如果是生产环境，建议后端做中间层，或者改用更安全的评论系统（比如 utterances ，不需要 `clientSecret` ）。
2. **页面路径带中文**：如果 `id` （页面路径）有中文，转成 URL 编码后可能超长（GitHub Issue 标签有限制），可以用 MD5 等方式哈希路径，再作为 `id` 。
3. **评论不显示 / 404**：检查仓库名、`clientID` 、`clientSecret` 、`owner` 、`admin` 是否填对，以及 GitHub 账号是否有权限操作仓库 Issues 。
4. **自动创建 Issue 失败**：确认 `createIssueManually` 配置、仓库是否公开、GitHub 账号是否是仓库管理员，或者手动创建 Issue 试试。



按照这些步骤，就能把 Gitalk 完整集成到页面，实现用 GitHub 登录、评论同步到仓库 Issue 的功能啦，遇到问题多检查配置和 GitHub 权限就行～





## 侧边栏

要实现类似图片中的侧边栏效果（分类标题+计数+子项），可以通过自定义 `_sidebar.md` 文件结合 CSS 样式来实现。以下是具体步骤：

------

### 1. 基本配置（`index.html`）

```
<script>
  window.$docsify = {
    loadSidebar: true,
    subMaxLevel: 2, // 允许二级嵌套
    alias: {
      '/.*/_sidebar.md': '/_sidebar.md'
    }
  }
</script>
```

------

### 2. 创建自定义 `_sidebar.md` 文件

用 Markdown 模拟图中的分组+计数效果：

```
- **Linux (66)**
  - [系统配置]()
  - [网络管理]() 
  - ...（其他子项）

- **MiniProgram (5)**
  - [山科小站小程序]()
  - [QQ小程序支付]()
  - [支付宝小程序user_id]()
  - [微信小程序校历组件]()
  - [uniapp小程序迁移到TS]()

- **App (1)**
  - [Android 开发]()

- **PHP (2)**
  - [Laravel 教程]()
  - [Composer 使用]()
```

------

### 3. 添加 CSS 样式（自定义计数和分组）

在 `index.html` 中插入以下样式：

```
<style>
  /* 分组标题样式 */
  .sidebar strong {
    display: block;
    padding: 0.5rem 1rem;
    color: #555;
    font-size: 1.1em;
    border-left: 3px solid #42b983;
    background-color: #f8f8f8;
  }

  /* 计数数字样式 */
  .sidebar strong::after {
    content: attr(data-count);
    float: right;
    color: #999;
    font-weight: normal;
    font-size: 0.9em;
  }
</style>
```

------

### 4. 动态生成计数（可选）

如果需要自动统计子项数量，可以通过插件实现。在 `index.html` 中添加：

```
<script>
  window.$docsify = {
    plugins: [
      function(hook) {
        hook.doneEach(function() {
          document.querySelectorAll('.sidebar strong').forEach(title => {
            const count = title.nextElementSibling.querySelectorAll('li').length;
            title.setAttribute('data-count', count);
          });
        });
      }
    ]
  }
</script>
```

------

### 5. 最终效果

- 分组标题显示为灰色背景+左侧绿条
- 计数数字显示在标题右侧（如 `Linux (66)`）
- 子项正常缩进显示

------

### 补充说明

1. 如果目录结构是动态生成的，可以通过编写脚本自动生成 `_sidebar.md` 并统计文件数量。

2. 使用 `docsify-sidebar-collapse` 插件可以增加折叠功能：

   ```
   <script src="//cdn.jsdelivr.net/npm/docsify-sidebar-collapse/dist/docsify-sidebar-collapse.min.js"></script>
   ```





## 2. 使用 Valine插件实现评论

**配置步骤**：

1. 添加 Valine 引用：

```
<script src="//cdn.jsdelivr.net/npm/valine@1.4/dist/Valine.min.js"></script>
```

1. 配置 Docsify 插件：

```
window.$docsify = {
  plugins: [
    function(hook, vm) {
      hook.doneEach(function() {
        if (typeof Valine !== 'undefined') {
          new Valine({
            el: '#valine-comments',
            appId: '你的LeanCloud App ID',
            appKey: '你的LeanCloud App Key',
            path: window.location.pathname,
            placeholder: '留下你的评论...'
          })
        }
      })
    }
  ]
}
```

1. 添加评论容器：

```
<div id="valine-comments"></div>
```