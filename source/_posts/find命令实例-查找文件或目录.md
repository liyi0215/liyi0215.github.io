---
title: 'find命令实例:查找文件或目录'
tags:
  - Shell
abbrlink: 47084
date: 2016-11-24 00:07:25
categories:
description: ""
---
# find命令实例

> find命令是Linux系统中最重要也是最常用的命令之一。find命令勇于根据你指定的参数搜索和定位文件和目录的列表。find命令可以在多数情况下使用,比如你可以通过权限、用户、用户组、文件类型、日期、大小、和其他可能的条件来查找文件。

## 简单的使用find命令查找制定目录下的某个文件的方法如下:
``` bash
# find /etc -name inittab
/etc/inittab
```
_**此处命令行提示符是`#`号,表示当前用户是root**_
_**-type d(directory目录) -type f(file文件)**_
<!-- more -->
## 找出当前目录下,文件名不区分大小写是 example 的所有文件
``` bash
$ find . -iname example
./example
./Example
```

## 找出当前目录下,目录名是tmp的目录:
``` bash
$ find . -type d -name tmp
./tmp
```

## 找出当前目录下所有 php 文件
``` bash
$ find . -type f -name "*.php"
```

## 找出当前目录下,文件权限是777的文件
``` bash
$ find . -type f -perm 0777
```

## 找出当前目录下,文件权限不是是777的文件
``` bash
$ find . -type f ! -perm 777
```

## 找出 `/etc/` 目录下所有只读文件
``` bash
# find /etc -type f ! -perm /a+w
```

## 找出你账号的主目录下的所有可执行文件
``` bash
$ find ~ -type f -perm /a+x
```

## 找出当前目录下的所有空文件
``` bash
$ find . -type -f -empty
```

## 找出当前目录下的所有空文目录
``` bash
$ find . -type -d -empty
```

## 找出 `/tmp` 目录下所有隐藏文件
``` bash
$ find /tmp -type f -name ".*"
```

## 找出 `/tmp` 下,所有者是 `root` 的文件和目录
``` bash
$ find /tmp -user root
```

## 找出 `/tmp` 下,用户组是 `developer` 的文件和目录
``` bash
$ find /tmp -group developer
```

## 找出你账号的主目录下,三天前修改的文件
``` bash
$ find ~ -type f -mtime 3
```

## 找出你账号的主目录下,三十天前修改的 **所有** 文件
``` bash
$ find ~ -type f -mtime +30
```

## 找出你账号的主目录下,30天以前60天以内修改的所有文件
``` bash
$ find ~ -type f -mtime +30 -mtime -60
```

## 找出 `/etc` 目录下,一小时以内变更过的文件
``` bash
# find /etc -type f -cmin -60
```

## 找出 `/etc` 目录下,一小时以内访问过的文件
``` bash
# find /etc -type f -amin -60
```

## 找出你主目录下,大小是 **50MB** 的所有文件
``` bash
$ find ~ -type f -size 50MB
```

## 找出你主目录下,大于50MB小于100MB的所有文件
``` bash
$ find ~ -type f -size +50MB -size -100MB
```
