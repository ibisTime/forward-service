
#!/usr/bin/expect

set tomcat_path "/mnt/www/sjzc/tomcat_forward_service"
set war_name "forward-service"
set host_ip "47.254.69.142"
set host_pwd "cdkjqwertyQ01"

######## 1.传输文件至服务器根目录 ########
spawn scp ./${war_name}.war root@${host_ip}:~/
expect "*password:"
send "${host_pwd}\r"
set timeout 300
send "exit\r"
expect eof

######## 2.登录服务器 ########
spawn ssh root@${host_ip}
expect "*password:"
send "${host_pwd}\r"

######## 4.杀掉这个tomcat相关进程 ########
expect "*#"
send "ps -efww|grep -w ${tomcat_path}|grep -v grep|cut -c 9-15|xargs kill -9\r"

######## 5.删除原来的部署包 ########
expect "*#"
send "rm -rf ${tomcat_path}/webapps/${war_name}\r"

expect "*#"
send "rm -rf ${tomcat_path}/webapps/${war_name}.war\r"

######## 5.移动新包至tomcat ########
expect "*#"
send "mv ~/${war_name}.war ${tomcat_path}/webapps/\r"

######## 6.重启tomcat ########
expect "*#"
send "${tomcat_path}/bin/startup.sh\r"

expect "*#"
send "exit\r"







