---
title: '使用homebrew搭建PHP,Nginx(LNMP开发环境)'
date: 2016-10-28 16:55:24
tags: [Php, Nginx]
categories:
---
## 安装PHP

### 添加brew的PHP扩展库：
``` bash
brew update
brew tap homebrew/dupes
brew tap josegonzalez/homebrew-php
```
可以使用brew options php55命令来查看安装php5.5的选项，这里我用下面的选项安装：
``` bash
brew install php55
```
### 由于Mac自带了php和php-fpm，因此需要添加系统环境变量PATH来替代自带PHP版本。
``` bash
echo 'export PATH="$(brew --prefix php55)/bin:$PATH"' >> ~/.bash_profile  #for php
echo 'export PATH="$(brew --prefix php55)/sbin:$PATH"' >> ~/.bash_profile  #for php-fpm
echo 'export PATH="/usr/local/bin:/usr/local/sbib:$PATH"' >> ~/.bash_profile #for other brew install soft
source ~/.bash_profile
```
### 测试一下效果：

#### Mac自带的PHP
``` bash
/usr/bin/php -v

PHP 5.4.24 (cli) (built: Jan 19 2014 21:32:15) 
Copyright (c) 1997-2013 The PHP Group
Zend Engine v2.4.0, Copyright (c) 1998-2013 Zend Technologies
```

#### Mac自带的php-fpm
``` bash
/usr/sbin/php-fpm -v

> PHP 5.4.24 (fpm-fcgi) (built: Jan 19 2014 21:32:57)
Copyright (c) 1997-2013 The PHP Group
Zend Engine v2.4.0, Copyright (c) 1998-2013 Zend Technologies
```

#### brew安装的php 他在/usr/local/opt/php55/bin/php
``` bash
php -v

PHP 5.5.14 (cli) (built: Jul 16 2014 15:43:06) (DEBUG)
Copyright (c) 1997-2014 The PHP Group
Zend Engine v2.5.0, Copyright (c) 1998-2014 Zend Technologies
    with Zend OPcache v7.0.3, Copyright (c) 1999-2014, by Zend Technologies
    with Xdebug v2.2.5, Copyright (c) 2002-2014, by Derick Rethans 
```

#### brew安装的php-fpm 他在/usr/local/opt/php55/sbin/php-fpm
``` bash
php-fpm -v

PHP 5.5.14 (fpm-fcgi) (built: Jul 16 2014 15:43:12) (DEBUG)
Copyright (c) 1997-2014 The PHP Group
Zend Engine v2.5.0, Copyright (c) 1998-2014 Zend Technologies
    with Zend OPcache v7.0.3, Copyright (c) 1999-2014, by Zend Technologies
    with Xdebug v2.2.5, Copyright (c) 2002-2014, by Derick Rethans
```
## 修改php-fpm配置文件
> **`vim /usr/local/etc/php/5.5/php-fpm.conf`**，找到pid相关大概在25行，去掉注释 **`pid = run/php-fpm.pid`**, 那么php-fpm的pid文件就会自动产生在**`/usr/local/var/run/php-fpm.pid`**，下面要安装的Nginx pid文件也放在这里。

### 测试配置
#### 测试php-fpm配置
``` bash
php-fpm -t
php-fpm -c /usr/local/etc/php/5.5/php.ini -y /usr/local/etc/php/5.5/php-fpm.conf -t
```
#### 启动php-fpm
``` bash
php-fpm -D
php-fpm -c /usr/local/etc/php/5.5/php.ini -y /usr/local/etc/php/5.5/php-fpm.conf -D
```
#### 关闭php-fpm
``` bash
kill -INT `cat /usr/local/var/run/php-fpm.pid`
```
#### 重启php-fpm
``` bash
kill -USR2 `cat /usr/local/var/run/php-fpm.pid`
```
#### 也可以用上文提到的brew命令来重启php-fpm，不过他官方不推荐用这个命令了
``` bash
brew services restart php55
```

## PHP-FPM开机启动：
``` bash
ln -sfv /usr/local/opt/php55/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.php55.plist
```

## 安装Nginx
``` bash
brew install nginx --with-http_geoip_module
```
## Nginx启动关闭命令：

### 测试配置是否有语法错误
``` bash
nginx -t
```
### 打开 nginx
``` bash
sudo nginx
```
### 重新加载配置|重启|停止|退出 nginx
``` bash
nginx -s reload|reopen|stop|quit
```
### 也可以使用Mac的launchctl来启动|停止
``` bash
launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist
```
### Nginx开机启动
``` bash
ln -sfv /usr/local/opt/nginx/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.nginx.plist
```
### Nginx监听80端口需要root权限执行，因此：
``` bash
sudo chown root:wheel /usr/local/Cellar/nginx/1.6.0_1/bin/nginx
sudo chmod u+s /usr/local/Cellar/nginx/1.6.0_1/bin/nginx
```

## 配置nginx.conf
### 创建需要用到的目录：
``` bash
mkdir -p /usr/local/var/logs/nginx
mkdir -p /usr/local/etc/nginx/sites-enabled
mkdir -p /usr/local/etc/nginx/conf.d
sudo mkdir -p /var/www
sudo chown :staff /var/www
sudo chmod 775 /var/www
```
### **`vim /usr/local/etc/nginx/nginx.conf`** 输入以下内容:
```
worker_processes  1;
error_log   /usr/local/var/logs/nginx/error.log debug;
pid        /usr/local/var/run/nginx.pid;

events {
    worker_connections  256;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /usr/local/var/logs/access.log  main;

    sendfile        on;
    keepalive_timeout  65;
    port_in_redirect off;

    include /usr/local/etc/nginx/sites-enabled/*.conf;
}
```

### nginx虚拟主机准备工作 - 创建 info.php index.html 404.html 403.html文件到 /var/www 下面
``` bash
vi /var/www/info.php
vi /var/www/index.html
vi /var/www/403.html
vi /var/www/404.html
```

### 创建默认虚拟主机default
**`vim /usr/local/etc/nginx/sites-available/default`**输入：
```
server {
    listen       80;
    server_name  localhost;
    root         /var/www/;

    access_log  /usr/local/var/logs/nginx/default.access.log  main;

    location / {
        index  index.html index.htm index.php;
        autoindex   on;
        if (!-f $request_filename){
            rewrite ^.*$ /index.php last;
        }

    }

    location ~ \.php$ {
        try_files                   $uri = 404;
        fastcgi_pass                127.0.0.1:9000;
        fastcgi_index               index.php;
        fastcgi_intercept_errors    on;
        include /usr/local/etc/nginx/fastcgi.conf;
    }
    
    location = /info {
        allow   127.0.0.1;
        deny    all;
        rewrite (.*) /.info.php;
    }

    error_page  404     /404.html;
    error_page  403     /403.html;
}
```