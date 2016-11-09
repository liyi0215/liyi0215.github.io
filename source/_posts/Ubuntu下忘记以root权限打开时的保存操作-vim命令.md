---
title: Ubuntu下忘记以root权限打开是的保存操作-vim命令
tags:
  - Ubuntu
  - Vim
abbrlink: 7606
date: 2016-11-02 16:39:48
categories:
---
# 在你忘记用 root 方式打开文件时的文件保存

每当你打开一个你没有写入权限的文件（比如系统配置文件）并做了一些修改，Vim 无法通过普通的 **`:w`** 命令来保存。你不需要重新以 root 方式打开文件再进行修改，只需要运行：
``` bash
:w !sudo tee %
```
这会直接以 root 方式保存。

> Mac 和 Ubuntu 亲测通过