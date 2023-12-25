package com.mobisys.building.api.outdoorparm;


import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.SCPClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * @author: yq
 * @create time:2021-07-04 15:19
 */
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
public class downLoad {

        @Value("${remote.local.filepath}")
        private String localPath;

        @Value("${remote.url}")
        private String hostName;

        @Value("${remote.password}")
        private  String password;

        @Value("${remote.username}")
        private  String username;

        @Value("${remote.port}")
        private int port;

        @Value("${remote.filepath}")
        private String remoteFile;

        @GetMapping("/downloadfile")
        public boolean downloadFile(String fileName) throws IOException {
            System.out.println(localPath);
            Connection connection  = getConnect(hostName,port,username,password);
            String remote = remoteFile+fileName;

            if(connection==null) return false;
            else {
                SCPClient scpClient=connection.createSCPClient();
                scpClient.get(remote,localPath);
                return true;
            }
        }



        public static Connection getConnect(String hostName,int port,String username,String password) {
            Connection conn = new Connection(hostName, port);
            try {
                // 连接到主机
                conn.connect();
                // 使用用户名和密码校验
                boolean isconn = conn.authenticateWithPassword(username, password);
                if (!isconn) {
                    System.out.println("用户名称或者是密码不正确");
                    return null;
                } else {
                    System.out.println("服务器连接成功.");
                    return conn;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return null;
        }


}
