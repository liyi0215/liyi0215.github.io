---
title: Git与ssh-key多账户配置
tags:
  - Git
  - ssh
abbrlink: 52220
date: 2016-11-01 17:36:48
categories:
---


# Git与ssh-key多账户配置
## 生成key
终端下 cd 到 ~/.ssh/ 目录下，执行
``` bash
ssh-keygen -t rsa -C 'ileeyi@163.com' -f id_rsa_github
```
其中 **`ileeyi@163.com`** 替换为你的邮箱， **`id_rsa_github`** 为生成文件文件名，执行后会问你是否需要 enter a passphrase， 默认一路确认就行。

## 添加到 ssh-agent
将新生成的key 添加到 **ssh-agent**
``` bash
ssh-agent -s
ssh-add ~/.ssh/id_rsa_github
```
同时也可以通过命令 `ssh-add -l` 查看之前已添加的key。

## 添加公匙到账户
``` bash
clip < ~/.ssh/id_rsa_github.pub
```
重复执行以上步骤
``` bash
ssh-keygen -t rsa -C 'biao166@qq.com' -f id_rsa_oschina
```
## 配置
``` bash
cd ~/.ssh/
touch config
vim config
```
配置如下
```
Host *.github.com
    HostName github.com
    IdentityFile ~/.ssh/id_rsa_github
    User biao166
Host *.git.oschina.net
    HostName git.oschina.net
    IdentityFile ~/.ssh/id_rsa_oschina
    User biao166
```
## 测试
``` bash
ssh -vT git@github.com
ssh -vT git@git.oschina.com
```
## 有可能碰到的问题
> Could not open a connection to your authentication agent?
应该是 `ssh-agent` 没有启动，执行以下命令启动
``` bash
eval ssh-agent -s
ssh-add
```