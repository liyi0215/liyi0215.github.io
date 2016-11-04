---
title: hexo添加不被hexo编译的静态网页
categories: Hexo
updated: 2016-10-21 12:40
---
## 如果你是不想hexo g时被模板改变你的html的话，可在在文件头加 **`layout: false`**
例如新建一个404页面
``` html
---
layout: false
title: "404"
date: 2015-02-05 20:03:48
---
<html>
<head>
    <meta charset="UTF-8" />
    <title>公益404</title>
</head>
<body>
<h1>404 Page Not Found</h1>
<br>
<script type="text/javascript" src="http://www.qq.com/404/search_children.js" charset="utf-8">
</script>
<br>
</body>
</html>
```