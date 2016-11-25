---
title: Ubuntu安装JDK
tags:
  - Ubuntu
  - JDK
abbrlink: 16716
date: 2016-10-22 16:16:14
categories:
---
# Ubuntu安装JDK

## 第一步，下载Linux版JDK

可以通过访问Oracle官网下载，或者直接通过命令行下载。
``` bash
wget -c http://download.oracle.com/otn-pub/java/jdk/8u11-b12/jdk-8u11-linux-i586.tar.gz
```
<!-- more -->
## 第二步，解压安装

``` bash
mkdir -p /usr/lib/jvm
sudo mv jdk-8u11-linux-i586.tar.gz /usr/lib/jvm
cd /usr/lib/jvm
sudo tar xzvf jdk-8u11-linux-i586.tar.gz
sudo ln -s jdk1.8.0_11 java-8
```
## 第三步，设置环境变量

在系统中添加环境变量，主要是PATH、CLASSPATH和JAVA_HOME。
``` bash
vi ~/.bashrc
```
在文件最后加入
``` bash
export JAVA_HOME=/usr/lib/jvm/java-8
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
```
保存退出，并通过命令使脚本生效：
``` bash
source ~/.bashrc
```

## 第四步，配置默认JDK版本

在有的系统中会预装OpenJDK，系统默认使用的是这个，而不是刚才装的。所以这一步是通知系统使用Oracle的JDK，非OpenJDK。
``` bash
sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/java-8/bin/java 300
sudo update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/java-8/bin/javac 300
sudo update-alternatives --config java
```

## 第五步，测试验证

``` bash
java -version
java version "1.8.0_11"
Java(TM) SE Runtime Environment (build 1.8.0_11-b12)
Java HotSpot(TM) Client VM (build 25.11-b03, mixed mode)
```