---
title: 快速切换npm源的开源工具--nrm
tags:
  - JavaScript
  - Node
  - Npm
categories: Node
abbrlink: 57882
date: 2016-10-22 13:18:08
---

# nrm 是一个 NPM 源管理器，允许你快速地在如下 NPM 源间切换：
## 安装
``` bash
npm install -g nrm
```

## 使用
### 列出可选的源
``` bash
nrm ls
```
> * npm ---- https://registry.npmjs.org/
    cnpm --- http://r.cnpmjs.org/
    taobao - http://registry.npm.taobao.org/
    eu ----- http://registry.npmjs.eu/
    au ----- http://registry.npmjs.org.au/
    sl ----- http://npm.strongloop.com/
    nj ----- https://registry.nodejitsu.com/　　
带 * 的是当前使用的源，上面的输出表明当前源是官方源。

## 切换
### 切换到taobao
``` bash
nrm use taobao
```
> Registry has been set to: http://registry.npm.taobao.org/

## 增加源
你可以增加定制的源，特别适用于添加企业内部的私有源。私有源可以使用cnpmjs架设。
``` bash
nrm add <registry> <url> [home]
```
## 删除源
``` bash
nrm del <registry>
```
## 测试速度
你还可以通过 nrm test 测试相应源的响应时间。
例如，测试官方源的响应时间：
``` bash
nrm test npm
```
测试所有源的响应时间：
``` bash
nrm test
```
注意，为了取得较准确的结果，可以考虑多次测试取平均值。
nrm 为开源软件，使用 MIT 许可。
## [<i class="fa fa-github"></i>nrm项目主页](https://github.com/Pana/nrm)
