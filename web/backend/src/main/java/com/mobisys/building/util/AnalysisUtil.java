package com.mobisys.building.util;

import java.awt.*;

/**
 * @Author blankjee
 * @Date 2020/9/2 10:10
 */
public class AnalysisUtil {
    private int xLength=1000;  //X轴像素长度
    private int yLength=560;   //Y轴像素长度
    private int sLength=6;    //标记长度
    private int bLength=100;   //留出的空白像素长度
    private double a1=0.1255001965E-4;
    private double b1=-0.1923595289E-1;
    private double c1=0.2705101899E2;
    private double d1=-0.6344011577E4;

    private double a2=-0.7297593707E-5;
    private double b2=0.5397420727E-2;
    private double c2=0.2069880620E2;
    private double d2=-0.6042275128E4;

    private double absoluteZero=273.15;
    private double f=0.62198;
    private double p=101325;             //公式中用到的参数


    private class point{
        double x;
        double y;
        public point(double x,double y){
            this.x=x;
            this.y=y;
        }
    }
    public Font getFont() {
        // TODO Auto-generated method stub
        return null;
    }

    //计算饱和水蒸气分压力，参数是干球温度等
    public double calcuPws(double t, double absoluteZero, double a1, double b1, double c1, double d1, double a2, double b2, double c2, double d2) {
        double alpha=0;
        if(t>=absoluteZero)
        {

            alpha=a1*t*t+b1*t+c1+d1/t;
        }
        if(t<absoluteZero)
        {
            alpha=a2*t*t+b2*t+c2+d2/t;
        }
        double pws=1000*Math.exp(alpha);  //pws 饱和水蒸气分压力
        return pws;
    }

    //求解对应的相对湿度fai和干球温度t下的含湿量w的值
    public double calcuY(int fai, double t, double f, double p, double yLength) {
        double pws=calcuPws(t, absoluteZero, a1, b1, c1, d1, a2, b2, c2, d2);
        double w=f/(1-(0.01*fai*pws/p))-f;
        double y= yLength-w*20000;  //y为对应的相对湿度fai和干球温度t下的含湿量w的值
        //  这里讲坐标扩大了20000倍，因为java画图原点在面板左上方，所以需要进行坐标变换，先关于x轴
        //  做对称变换，再向java规定的y轴正向（面板下方）平移yLength距离
        return y;
    }
    private double calcuW(int fai,double t){
        double pws=calcuPws(t, absoluteZero, a1, b1, c1, d1, a2, b2, c2, d2);
        double w=f/(1-(0.01*fai*pws/p))-f;
        return w;
    }



}
