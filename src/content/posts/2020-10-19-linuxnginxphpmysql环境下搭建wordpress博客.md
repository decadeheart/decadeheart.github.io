---
title: "linux、nginx、php、mysql环境下搭建wordpress博客"
date: 2020-10-19
category: "建站"
tags: ["腾讯云"]
slug: "linux、nginx、php、mysql环境下搭建wordpress博客"
---

> 之前写过一篇，[腾讯云+wordpress搭建个人博客](http://www.jianshu.com/p/2957ab783e03)，但是是使用amh面板，简单粗暴构建的，其实amh面板也是集成了nginx，mysql，php，所以这次使用了原始的方法，构建了一下个人博客

## 1.数据库的安装及配置

安装方式

1  

yum -y install mysql mysql-server  

数据库启动命令

1  

/etc/init.d/mysqld start  

数据库登录命令

1  

mysql -u root –p  

会出现如下反馈

![mysql.png](http://upload-images.jianshu.io/upload_images/4958474-fec1ba303b21e8e8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

没有设置密码的话就可以直接进入到mysql命令行

接下来设置密码就在mysql命令行

1  
2  
3  
4  
5  
6  
7  

use mysql;  
update user set password=password('yourpassword') where user='root';  
flush privileges;  
exit  
//在原命令行  
/etc/init.d/mysqld restart  
//重启数据库  

> 设置密码如果出现问题，还可以选择这个方法
> 
> 1  
> 
> mysql\_secure\_installation  
> 
> 回车，根据提示输入Y  
> 输入2次密码，回车  
> 根据提示一路输入Y

开启mysql数据库远程访问权限

1  
2  
3  
4  
5  

use mysql;  
  
update user set host='%' where user='root';  
  
flush privileges;  

有可能会显示

1  

ERROR 1062 (23000): Duplicate entry '%-root' for key 'PRIMARY'  

这说明host已经有了%这个值，所以可以直接运行命令

1  

flush privileges;  

然后在试图远程连接服务器数据库，再自己的电脑主机安装navicat for mysql

安装好之后

创建新的mysql连接，一定不要选择ssh连接，就选择常规连接，主机名填自己的服务器ip，用户名和密码就是自己设置的服务器用户名和密码

然后就可以来创建wordpress使用的数据库表了

1  
2  

CREATE DATABASE wordpress;  
Query OK, 1 row affected (0.00 sec)  

然后创建新用户及密码

1  
2  

CREATE USER wordpressuser@localhost;  
Query OK, 0 rows affected (0.00 sec)  

1  
2  

SET PASSWORD FOR wordpressuser@localhost= PASSWORD("password");  
Query OK, 0 rows affected (0.00 sec)  

创建wordpress数据库和用户联系

1  
2  

GRANT ALL PRIVILEGES ON wordpress.\* TO wordpressuser@localhost IDENTIFIED BY 'password';  
Query OK, 0 rows affected (0.00 sec)  

## 2.安装php和其他的组件

1.1安装php5

1  

yum install php  

1.2安装php其他组件

1  

yum install php-mysql php-fpm php-gd libjpeg\* php-imap php-ldap php-odbc php-pear php-xml php-xmlrpc php-mbstring php-mcrypt php-bcmath php-mhash libmcrypt  

1.3启动php-fpm，查看是否监听端口以及地址

1  
2  
3  
4  
5  
6  

/etc/init.d/php-fpm start  
chkconfig php-fpm on  
  
netstat -tunlp |grep 9000  
  
ps aux |grep php-fpm  

## 3.nginx安装和配置

首先得安装一些必要的库,pcre、zlib等软件包

1  

yum -y install pcre\* zlib\*  

PCRE(Perl Compatible Regular Expressions) 是一个Perl库，包括 perl 兼容的正则表达式库。nginx 的 http 模块使用 pcre 来解析正则表达式，所以需要在 linux 上安装 pcre 库，pcre-devel 是使用 pcre 开发的一个二次开发库。nginx也需要此库。命令：

zlib 库提供了很多种压缩和解压缩的方式， nginx 使用 zlib 对 http 包的内容进行 gzip ，所以需要在 Centos 上安装 zlib 库。

1  

yum install gcc-c++  

安装 nginx 需要先将官网下载的源码进行编译，编译依赖 gcc 环境，如果没有 gcc 环境，则需要安装：

1  

yum install -y openssl openssl-devel  

OpenSSL 是一个强大的安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及 SSL 协议，并提供丰富的应用程序供测试或其它目的使用。  
nginx 不仅支持 http 协议，还支持 https（即在ssl协议上传输http），所以需要在 Centos 安装 OpenSSL 库。

然后就是安装nginx

1  
2  
3  
4  
5  
6  
7  

$ cd /usr/local/  
$ wget http://nginx.org/download/nginx-1.8.0.tar.gz  
$ tar -zxvf nginx-1.8.0.tar.gz  
$ cd nginx-1.8.0    
$ ./configure --prefix=/usr/local/nginx   
$ make  
$ make install  

启动命令

1  

$ /usr/local/nginx/sbin/nginx  

检验一下是否成功

打开浏览器访问此机器的 IP，如果浏览器出现 Welcome to nginx! 则表示 Nginx 已经安装并运行成功

一些其他的命令

1  
2  
3  
4  
5  
6  
7  
8  
9  
10  
11  

重启：  
$ /usr/local/nginx/sbin/nginx –s reload  
  
停止：  
$ /usr/local/nginx/sbin/nginx –s stop  
  
测试配置文件是否正常：  
$ /usr/local/nginx/sbin/nginx –t  
  
强制关闭：  
$ pkill nginx  

可以想办法将nginx设定为系统服务，这样可以不用输入长串的命令来启动和重启

1.1新建文件：`vim /etc/init.d/nginx`

1.2在该文件添加如下的内容

1  
2  
3  
4  
5  
6  
7  
8  
9  
10  
11  
12  
13  
14  
15  
16  
17  
18  
19  
20  
21  
22  
23  
24  
25  
26  
27  
28  
29  
30  
31  
32  
33  
34  
35  
36  
37  
38  
39  
40  
41  
42  
43  
44  
45  
46  
47  
48  
49  
50  
51  
52  
53  
54  
55  
56  
57  
58  
59  
60  
61  
62  
63  
64  
65  
66  
67  
68  
69  
70  
71  
72  
73  
74  
75  
76  
77  
78  
79  
80  
81  
82  
83  
84  
85  
86  
87  
88  
89  
90  
91  
92  
93  
94  
95  
96  
97  
98  
99  
100  
101  
102  
103  
104  
105  
106  
107  
108  
109  
110  
111  
112  
113  

#!/bin/sh   
\#   
\# nginx - this script starts and stops the nginx daemon   
\#   
\# chkconfig:   - 85 15   
\# description: Nginx is an HTTP(S) server, HTTP(S) reverse    
\#               proxy and IMAP/POP3 proxy server   
\# processname: nginx   
\# config:      /etc/nginx/nginx.conf   
\# config:      /etc/sysconfig/nginx   
\# pidfile:     /var/run/nginx.pid   
   
\# Source function library.   
. /etc/rc.d/init.d/functions   
   
\# Source networking configuration.   
. /etc/sysconfig/network   
   
\# Check that networking is up.   
\[ "$NETWORKING" = "no" \] && exit 0   
   
\# 这里要根据实际情况修改  
nginx="/usr/local/nginx/sbin/nginx"   
prog=$(basename $nginx)   
   
\# 这里要根据实际情况修改  
NGINX\_CONF\_FILE="/usr/local/nginx/conf/nginx.conf"   
   
\[ -f /etc/sysconfig/nginx \] && . /etc/sysconfig/nginx   
   
lockfile=/var/lock/subsys/nginx   
   
start() {   
    \[ -x $nginx \] || exit 5   
    \[ -f $NGINX\_CONF\_FILE \] || exit 6   
    echo -n $"Starting $prog: "   
    daemon $nginx -c $NGINX\_CONF\_FILE   
    retval=$?   
    echo   
    \[ $retval -eq 0 \] && touch $lockfile   
    return $retval   
}   
   
stop() {   
    echo -n $"Stopping $prog: "   
    killproc $prog -QUIT   
    retval=$?   
    echo   
    \[ $retval -eq 0 \] && rm -f $lockfile   
    return $retval   
    killall -9 nginx   
}   
   
restart() {   
    configtest || return $?   
    stop   
    sleep 1   
    start   
}   
   
reload() {   
    configtest || return $?   
    echo -n $"Reloading $prog: "   
    killproc $nginx -HUP   
    RETVAL=$?   
    echo   
}   
   
force\_reload() {   
    restart   
}   
   
configtest() {   
    $nginx -t -c $NGINX\_CONF\_FILE   
}   
   
rh\_status() {   
    status $prog   
}   
   
rh\_status\_q() {   
    rh\_status >/dev/null 2>&1   
}   
   
case "$1" in   
    start)   
        rh\_status\_q && exit 0   
        $1   
        ;;   
    stop)   
        rh\_status\_q || exit 0   
        $1   
        ;;   
    restart|configtest)   
        $1   
        ;;   
    reload)   
        rh\_status\_q || exit 7   
        $1   
        ;;   
    force-reload)   
        force\_reload   
        ;;   
    status)   
        rh\_status   
        ;;   
    condrestart|try-restart)   
        rh\_status\_q || exit 0   
        ;;   
    \*)      
      echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|reload|force-reload|configtest}"   
        exit 2   
esac  

1.3修改权限并开机启动

修改权限:`chmod 755 /etc/init.d/nginx`

开机启动:`chkconfig nginx on`

1.4这个时候的启动命令

1  
2  
3  

启动服务：service nginx start  
停止服务：service nginx stop  
重启服务：service nginx reload  

这个时候修改nginx的nginx.conf配置文件

1  
2  
3  
4  
5  
6  
7  
8  
9  
10  
11  
12  
13  
14  
15  
16  
17  
18  
19  
20  
21  
22  
23  
24  

vim /usr/local/nginx/conf/nginx.conf  
location ~ \\.php$ {  
  
root html;  
  
fastcgi\_pass 127.0.0.1:9000;  
  
fastcgi\_index index.php;  
  
fastcgi\_param SCRIPT\_FILENAME $document\_root$fastcgi\_script\_name;  
  
include fastcgi\_params;  
  
}  
一定要注意将此处的scripts改成$document\_root  
然后在上方  
location / {  
  
root html;  
  
index index.php index.html index.htm;  
  
}  
加入index.php选项  

现在我们来测试下，nginx有关php的配置是否正确。编辑index.php文件，加入<?php phpinfo();?>，如下：

./html/index.php\`\`\`

1  
2  
3  
4  

  
并删除index.html  
  
\`\`\`rm -f ./hrml/index.html  

nginx reload\`\`\`生效

1  
2  
3  
4  
5  
6  
7  
8  
9  
10  

  
再次打开自己的ip地址  
  
如果出现phpinfo（）界面则成功  
  
  
  
\## 4.wordpress安装和配置  
  
1.1安装  

wget [http://wordpress.org/latest.tar.gz](http://wordpress.org/latest.tar.gz)  
tar-xzvf latest.tar.gz  

1  
2  

  
1.2配置  

  
cp ~/wordpress/wp-config-sample.php ~/wordpress/wp-config.php  
sudo nano ~/wordpress/wp-config.php

然后修改数据库名，用户名和密码  
// **MySQL settings - You can get this info from your web host** //  
/*\* The name of the database for WordPress* /  
define(‘DB\_NAME’, ‘wordpress’);

/*\* MySQL database username* /  
define(‘DB\_USER’, ‘wordpressuser’);

/*\* MySQL database password* /  
define(‘DB\_PASSWORD’, ‘password’);  
\`\`\`

这个时候你重启nginx，重启数据库你就会发现，你可以进入到wordpress安装界面，开始你的安装吧
