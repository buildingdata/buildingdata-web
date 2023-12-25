package com.mobisys.building.util;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import java.io.File;
import java.security.Key;
import java.security.SecureRandom;

public class DESUtils {

    private static Key key;
    private static String KEY_STR = "myKey";
    private static String CHARSETNAME = "UTF-8";
    private static String ALGORITHM = "DES";

    static {
        try {
            KeyGenerator generator = KeyGenerator.getInstance(ALGORITHM);
            SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
            secureRandom.setSeed(KEY_STR.getBytes());
            generator.init(secureRandom);
            key = generator.generateKey();
            generator = null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String getEncryptString(String str) {
        BASE64Encoder base64encoder = new BASE64Encoder();
        try {
            byte[] bytes = str.getBytes(CHARSETNAME);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] doFinal = cipher.doFinal(bytes);
            return base64encoder.encode(doFinal);
        } catch (Exception e) {
            // TODO: handle exception
            throw new RuntimeException(e);
        }
    }


    public static String getDecryptString(String str) {
        BASE64Decoder base64decoder = new BASE64Decoder();
        try {
            byte[] bytes = base64decoder.decodeBuffer(str);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] doFinal = cipher.doFinal(bytes);
            return new String(doFinal, CHARSETNAME);
        } catch (Exception e) {
            // TODO: handle exception
            throw new RuntimeException(e);
        }
    }

    public static void main(String agrs[]){

        System.out.println(getEncryptString("123456"));
        //获取文件名
        //路径   这里写一个路径进去

        //String path="/Users/tao/building_app_front/src";

//调用方法

        //getFiles(path);

    }


    /**

     * 递归获取某路径下的所有文件，文件夹，并输出

     */

    public static void getFiles(String path) {

        File file = new File(path);

    // 如果这个路径是文件夹

        if (file.isDirectory()) {

    // 获取路径下的所有文件

            File[] files = file.listFiles();

            for (int i = 0; i < files.length; i++) {

    // 如果还是文件夹 递归获取里面的文件 文件夹

                if (files[i].isDirectory()) {

                    //System.out.println("目录：" + files[i].getPath());

                    getFiles(files[i].getPath());

                } else {
                    String name = files[i].getName();
                    if (!name.startsWith(".")&&!name.endsWith("png")&&!name.endsWith("jpg")){
                        System.out.println(files[i].getName());
                    }


                }

            }

        } else {
            if (!file.getName().startsWith(".")&&!file.getName().endsWith("png")&&!file.getName().endsWith("jpg")){
                System.out.println(file.getName());
            }

        }


    }


}