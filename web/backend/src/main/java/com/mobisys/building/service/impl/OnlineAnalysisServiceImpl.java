package com.mobisys.building.service.impl;

import com.mobisys.building.dao.OnlineAnalysisDao;
import com.mobisys.building.entity.StationInfo;
import com.mobisys.building.service.OnlineAnalysisService;
import com.mobisys.building.util.AnalysisUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;

/**
 * @Author blankjee
 * @Date 2020/9/2 15:59
 */
@Service
public class OnlineAnalysisServiceImpl implements OnlineAnalysisService {
    //误差参数
    private double parameter = 5.0;
   // private int xLength=1000;  //X轴像素长度
   private int xLength=1100;  //X轴像素长度
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
    //相对含湿量为90%的x坐标集合
    private ArrayList<Double> fai_x = new ArrayList<>();
    //相对含湿量为90%的y坐标集合
    private ArrayList<Double> fai_y = new ArrayList<>();

    private double absoluteZero=273.15;    //绝对零度
    private double f=0.62198;
    private double p=101325;             //公式中用到的参数

    private double slope;                   //k为湿球温度线的斜率

    private int flag4;

    private double tAvg;              // 室外月平均温度值，℃,用于计算人体中性温度tn

    private Polygon pg0 = new Polygon();
    private Polygon pg1 = new Polygon();
    private Polygon pg2 = new Polygon();
    private Polygon pg3 = new Polygon();
    private Polygon pg4 = new Polygon();
    private double percent[];
    private String on="on";
    private String choose="choose";    //判断是否选择月份
    private String fixed="fixed";      //判断是否固定月份
    private String all="all";

    //分析策略参数



    @Resource
    private OnlineAnalysisDao onlineAnalysisDao;

    private AnalysisUtil analysisUtil = new AnalysisUtil();

    //绘制在线建筑分析图片的入口方法
    @Override
    public BufferedImage createOnlineAnalysisPic(String draft, String thermal_storage_draft, String evaporative, String passive, String dataTime, String beginTime, String toTime, String dataMonth, String beginMonth, String toMonth, String fixedMonth, String city) throws IOException {
        return this.createPictureAction( draft,  thermal_storage_draft,  evaporative,  passive,  dataTime,  beginTime,  toTime,  dataMonth,  beginMonth,  toMonth,  fixedMonth,  city);
    }

    //生成图片文件，由入口方法调用
    @Override
    public BufferedImage createPictureAction(String draft, String thermal_storage_draft, String evaporative, String passive, String dataTime, String beginTime, String toTime, String dataMonth, String beginMonth, String toMonth, String fixedMonth, String city) throws IOException {
        BufferedImage image= new BufferedImage(xLength+bLength, yLength+bLength, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = image.createGraphics();
        //g.dispose();
        createPicture(g, draft, thermal_storage_draft, evaporative, passive,
                dataTime, beginTime, toTime, dataMonth, beginMonth, toMonth, fixedMonth, city);
        pg0.reset();
        pg1.reset();
        pg2.reset();
        pg3.reset();
        pg4.reset();
        String destPath = "./pic-" + System.currentTimeMillis() + ".png";
        File file = new File(destPath);

        ImageIO.write(image, "png", file);
        g.dispose();
        return ImageIO.read(file);
    }

    @Override
    public void createPicture(Graphics2D g, String draft, String thermal_storage_draft, String evaporative, String passive, String dataTime, String beginTime, String toTime, String dataMonth, String beginMonth, String toMonth, String fixedMonth, String city) {
        if(!choose.equals(dataTime)){
            beginTime="0";
            toTime="23";
        }
        if(!choose.equals(dataMonth)){
            if(fixed.equals(dataMonth)){
                beginMonth=fixedMonth;
                toMonth=fixedMonth;
            }else{
                beginMonth="1";
                toMonth="12";
            }
        }

        AffineTransform trans = new AffineTransform();
        trans.translate(20, 20);
        g.setColor(Color.WHITE);
        g.fillRect(0,0,xLength+bLength, yLength+bLength);
        //g.setBackground(Color.white);
        g.setColor(Color.black);
        g.setTransform(trans);
        g.drawLine(xLength,0,xLength,yLength);
        g.drawLine(xLength,yLength,0,yLength);
        try {
            calcuTout(dataTime,beginTime,toTime,dataMonth,beginMonth,toMonth,fixedMonth,city);                             //求室外月平均温度值
            drawSpiral(g,draft,thermal_storage_draft,evaporative,passive);                                                 //画背景图和各策略边界图
            drawPoint2(g,draft,thermal_storage_draft,evaporative,passive,beginTime,toTime,beginMonth,toMonth,city);        //点红点
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        DecimalFormat df=new DecimalFormat(".##");
        for (int i = 0; i < percent.length; i++){
            //System.out.println("---------"+df.format(percent[i]));
            percent[i] = Double.parseDouble(df.format(percent[i]));
        }
        int x=2,y=150;
        g.setColor(Color.BLACK);

        g.drawString("开始月份:"+beginMonth+"月  结束月份:"+toMonth+"月  起始时间"+beginTime+":00  结束时间:"+toTime+":00",x,100);

        g.setColor(Color.BLACK);
        g.drawString("热舒适区:"+Double.toString(percent[0]),x,y);
        g.setColor(Color.blue);
        g.fillRect(x-11,y-9,9,9);

        g.setColor(Color.BLACK);
        g.drawString("自然通风:"+Double.toString(percent[1]),x,y=y+50);
        g.setColor(Color.gray);
        g.fillRect(x-11,y-9,9,9);

        g.setColor(Color.BLACK);
        g.drawString("蓄热通风:"+Double.toString(percent[2]),x,y=y+50);
        g.setColor(Color.red);
        g.fillRect(x-11,y-9,9,9);

        g.setColor(Color.BLACK);
        g.drawString("直接蒸发降温:"+Double.toString(percent[3]),x,y=y+50);
        g.setColor(Color.pink);
        g.fillRect(x-11,y-9,9,9);

        g.setColor(Color.BLACK);
        g.drawString("被动式太阳能采暖:"+Double.toString(percent[4]),x,y=y+50);
        g.setColor(Color.orange);
        g.fillRect(x-11,y-9,9,9);

        g.dispose();
    }

    @Override
    public void calcuTout(String dataTime, String beginTime, String toTime, String dataMonth, String beginMonth, String toMonth, String fixedMonth, String city) {
        ArrayList<Double> list=new ArrayList<Double>();
        //	String sql3;
        double sum2=0;
//        System.out.println(beginTime + " " + toTime + " " + beginMonth + " " + toMonth + " " + city);


        int begin = Integer.parseInt(beginTime);
        int end = Integer.parseInt(toTime);
        for (int i = begin; i <= end; i++) {
            Double avg = onlineAnalysisDao.drawPoint3(i, beginTime, toTime, beginMonth, toMonth, city);
            if (avg != null) {
                list.add(avg);
            }
        }
        for(double t:list) {
            sum2+=t;
        }
        tAvg=sum2/list.size();
    }

    @Override
    public void drawSpiral(Graphics2D g, String draft, String thermal_storage_draft, String evaporative, String passive) {
        //  double scaleFactor=0.01;

        int flag=0;
        slope=0;
        String yTab="含湿量 g/kg";

        g.drawString("干球温度 ℃",xLength/2,yLength+sLength*4);

        for(int i=0;i<yTab.length();i++)                                               //y轴的含湿量几个字是竖着写，所以循环写每个字，变更y坐标
        {
            g.drawString(yTab.substring(i,i+1), xLength+sLength*3, 12*i+20);
        }
        for(int i=80;i<yLength;i+=80) {                                                       //含湿量的坐标显示，最大为24，每次-4
            g.drawString(Integer.toString(28-i/20),xLength+sLength,i+sLength);
        }
        for(int i=0;i<=xLength;i+=100) {
            g.drawString(Integer.toString(i/20-10),i-sLength,yLength+sLength*2);
        }
        for(int fai=100;fai>0;fai=fai-10)
        {
            Polygon pg=new Polygon();
            for(double x=0;x<xLength;x++)
            {
                double smallT=x/20-10;   //smallT为摄氏干球温度

                double t=smallT+absoluteZero;  //t为干球温度，单位为K


                double y = analysisUtil.calcuY(fai,t, f, p, yLength);
                if((int)y%80==0)
                {
                    //g.setColor(Color.BLACK);
                    //相对湿度线
                    g.drawLine((int)x,(int)y,xLength,(int)y);
                    //g.setColor(Color.BLACK);
                    //g.setColor(Color.WHITE);
                }
                if(fai==100&&((int)x)%100==0)
                {
                    int temp=(int)y;
                    if((int)y<0)
                    {
                        temp=0;
                    }
                   // g.setColor(Color.BLACK);
                    g.setColor(Color.BLACK);
                    g.drawLine((int)x,yLength,(int)x,temp);
                    //g.setColor(Color.GREEN);
                    if(flag==0)
                    {

                        for(double z=0;z<xLength;z++)
                        {

                            double smallZ=z/20-10;   //smallZ为摄氏干球温度

                            double tz=smallZ+absoluteZero;  //t为干球温度，单位为K
                            double alphaz=0;
                            if(tz>=absoluteZero)
                            {

                                alphaz=a1*tz*tz+b1*t+c1+d1/tz;
                            }
                            if(tz<absoluteZero)
                            {

                                alphaz=a2*tz*tz+b2*tz+c2+d2/tz;
                            }
                            double pwsz=1000*Math.exp(alphaz);
                            double wss=0.62198*(pwsz/(p-pwsz));
                            double ts=(2501*wss-tz)/(2.381*wss-1);
                            //JOptionPane.showMessageDialog(jp1, ts);
                            if((int)(ts*100)==(int)(t*100))
                            {
                                g.setColor(Color.BLACK);
                                //g.setColor(Color.RED);
                                g.drawLine((int)z,yLength,(int)x,(int)y);
                                //g.setColor(Color.RED);
                                slope=(y-yLength)/(x-z);     //slope为斜率
                                flag++;
                            }
                        }

                    }
                    else if(smallT<15)
                    {
                        g.setColor(Color.BLACK);
                        //g.setColor(Color.orange);
                        g.drawLine((int)(x-(y-yLength)/slope),yLength,(int)x,(int)y);  //如上所述，坐标变换
                        //g.setColor(Color.orange);
                    }
                    else
                    {
                        g.setColor(Color.BLACK);
                        //g.setColor(Color.pink);
                        g.drawLine(xLength,(int)((xLength-x)*slope+y),(int)x,(int)y);
                        //g.setColor(Color.pink);
                    }
                }
                if((int)y>=0)     //舍弃多余曲线
                {
                    pg.addPoint((int)x,(int)y);
                }

            }
            if (fai==90){
                g.setColor(Color.BLACK);
                for (int m=0;m<pg.xpoints.length;m++){
                    if (pg.xpoints[m]!=0&&pg.ypoints[m]!=0){
                        fai_x.add((double)pg.xpoints[m]);
                        fai_y.add((double)pg.ypoints[m]);
                    }
                    //System.out.println("90线中相对湿度坐标x:"+pg.xpoints[m]+"----y:"+pg.ypoints[m]);
                }

            }else {
                g.setColor(Color.BLACK);
            }
            g.drawPolyline(pg.xpoints,pg.ypoints,pg.npoints);
            g.setColor(Color.BLACK);

        }
        //System.out.println(draft);
        //System.out.println("被动式太阳能采暖:"+passive);
        //System.out.println("蒸发降温:"+evaporative);
        //System.out.println("蓄热通风:"+thermal_storage_draft);
        //System.out.println("自然通风:"+draft);
        if(on.equals(passive)){                                                       //判断后，调用边界绘制方法绘制“被动式太阳能采暖”策略的边界
            //System.out.println("passive");
            drawStrategy(g,Color.orange,4, tAvg, absoluteZero, f, p, pg0, yLength, pg1, pg2, pg3, pg4);
        }
        if(on.equals(evaporative)){                                               //判断后，判断后，调用边界绘制方法绘制“蒸发降温”策略的边界
            //System.out.println("evaporative");
            drawStrategy(g,Color.pink,3, tAvg, absoluteZero, f, p, pg0, yLength, pg1, pg2, pg3, pg4);
        }
        if(on.equals(thermal_storage_draft)){                                      //判断后，调用边界绘制方法绘制“蓄热通风”策略的边界
            //System.out.println("thermal_storage_draft");
            drawStrategy(g,Color.red,2, tAvg, absoluteZero, f, p, pg0, yLength, pg1, pg2, pg3, pg4);
        }
        if(on.equals(draft)){                                                     //判断后，调用边界绘制方法绘制“自然通风”策略的边界
            //System.out.println("draft");
            //System.out.println("draft");
            drawStrategy(g,Color.gray,1, tAvg, absoluteZero, f, p, pg0, yLength, pg1, pg2, pg3, pg4);
        }

        drawStrategy(g,Color.blue,0, tAvg, absoluteZero, f, p, pg0, yLength, pg1, pg2, pg3, pg4);                     //不判断，直接调用边界绘制方法绘制“热舒适区”策略的边界
    }

    @Override
    public void drawPoint2(Graphics2D g, String draft, String thermal_storage_draft, String evaporative, String passive, String beginTime, String toTime, String beginMonth, String toMonth, String city2) {
        Font font1=new Font("细明本",Font.PLAIN,20);
        Font font2=analysisUtil.getFont();
        g.setFont(font1);
        StationInfo city = onlineAnalysisDao.drawCity(city2);
//        System.out.println("!!!!!!!!!!!!!!!!!!"+city2);
//        System.out.println("？？？？？？？？？？？？？？？？？"+city.getCityName());
        g.drawString("城市："+city.getCityName()+"  纬度："+city.getLongitude()+"  经度："
                +city.getLatitude()+"  海拔："+city.getAltitude()+"  气候分析图",2,50);

//        g.setFont(font2);
        percent=new double[6];

        double x=0,y=0;

        double count[]=new double[6],sum=0;

        String sql1,sql2;
        //ResultSet rs=null;
        ArrayList<Double> dbtList=new ArrayList<Double>();

        double rhm,mc;              //dbt:干球温度 rhm：相对湿度 mc：含湿量   数据库中没有含湿量这一项 通过前两项算出含湿量后画图
        int begin=Integer.parseInt(beginTime);
        int end=Integer.parseInt(toTime)+1;
        for(int i=begin;i<end;i++)
        {
				/*sql1 = "SELECT h"+i+" FROM tb_city_data WHERE indx='dbt' && YEAR(date)='1971';";
				sql2 = "SELECT h"+i+" FROM tb_city_data WHERE indx='rhm' && YEAR(date)='1971';";
				*/
            dbtList.addAll(onlineAnalysisDao.drawPoint(i,beginMonth,toMonth,city2));
            int j=0;
            for(Double tmp: onlineAnalysisDao.drawPoint2(i,beginMonth,toMonth,city2)) {
                rhm=tmp/100.0;        //相对湿度是百分数
                mc=f/(p/(analysisUtil.calcuPws(dbtList.get(j)+absoluteZero, absoluteZero, a1, b1, c1, d1, a2, b2, c2, d2)*rhm)-1);
                //System.out.println("dbt:"+dbtList.get(j)+"   rhm:"+rhm+"   mc:"+mc);
                x=(dbtList.get(j++)+10)*20;
                y=yLength-mc*20*1000;        //算出后 mc单位为kg/kg，为化成g/kg需要乘1000  乘20是图的放大比例
                //System.out.println("x:"+x+"y:"+y);
//                System.out.println(pg0);
                if(pg0.contains(x, y))
                {
                    count[0]++;
                }

                if(on.equals(draft)){
                    if(pg1.contains(x,y))
                    {
                        count[1]++;
                    }
                }
                if(on.equals(thermal_storage_draft)){
                    if(pg2.contains(x,y))
                    {
                        count[2]++;
                    }
                }
                if(on.equals(evaporative)){
                    if(pg3.contains(x,y))
                    {
                        count[3]++;
                    }
                }
                if(on.equals(passive)){
                    if(pg4.contains(x,y))
                    {
                        count[4]++;
                    }
                }
                g.setColor(Color.red);
                g.fillRect((int)x,(int)y,2,2);
                sum++;
            }
            //	rs.close();

            g.setColor(Color.black);
            percent[0]=count[0]/sum*100;
            percent[1]=count[1]/sum*100;
            percent[2]=count[2]/sum*100;
            percent[3]=count[3]/sum*100;
            percent[4]=count[4]/sum*100;
        }

        //System.out.println(tAvg);
    }

    //绘制策略边界的方法
    public void drawStrategy(Graphics2D g,Color co,int i, double tAvg, double absoluteZero, double f, double p, Polygon pg0, int yLength, Polygon pg1, Polygon pg2, Polygon pg3, Polygon pg4)
    {
        int b=0,c=0;

        double c8=-5.8002206E+03;
        double c9=1.3914993E+00;
        double c10=-4.8640239E-02;
        double c11=4.1764768E-05;
        double c12=-1.4452093E-08;
        double c13=6.5459673E+00;

        g.setColor(co);
        BasicStroke bs=new BasicStroke(5);
        g.setStroke(bs);

        //计算室外年平均气温与人体中性温度
        double tn=17.8+0.31*tAvg;
        double bT=tn+absoluteZero;

        double pws=Math.exp(c8/(bT)+c9+c10*bT+c11*bT*bT+c12*bT*bT*bT+c13*Math.log(bT));

        double wn=f*0.5*pws/(p-0.5*pws)*1000;                          //确定tn点在 50%RH 时的含湿量𝑾n

        double k=0.023*(tn-12);                                        //确定方程的斜率

        //先计算出 a,b 点的坐标
        double ta=-k*12+tn+k*wn;
        double tb=-k*4+tn+k*wn;
        //根据 a,b 再计算出 1,2,3,4 点的坐标(即热舒适区的四个顶点)
        double t1=ta-2.5,t2=ta+2.0,t3=tb-2.5,t4=tb+2.0;
        double px0[]={t1,t2,t3,t4,t1};
        //System.out.println("1:"+t1+" 2:"+t2+" 3:"+t3+" 4:"+t4);
        double py0[]={12,12,4,4,12};								//热舒适区边界

        double px1[]={29,32,32,t4,t2,t1};
        double py1[]={22.96,15,4,4,12,12};

        double px2[]={34,39,t4,t2,34};
        double py2[]={12,4,4,12,12};                              //蓄热通风边界
        double h3=0.004*(2501+1.86*t3);
        double z=t3+h3/1.006;
        //g.drawString("z:"+Double.toString(z),100,350);
        double yp=((1.006*t2+0.012*(2501+1.86*t2))-41.95)/2578.56*1000;
        //g.drawString("y:"+Double.toString(yp),100,200);
        double px3[]={t2,t4,t3,z,41,41,t2};

        double py3[]={12,4,4,0,0,yp,12};                                          //直接蒸发降温边界

        double px4[]={t1,t1,t3,t3,6,6,t1};
        double wt1=analysisUtil.calcuY(100,t1+absoluteZero, f, p, yLength);
        double w6=analysisUtil.calcuY(100,6+absoluteZero, f, p, yLength);
        double py4[]={wt1,12,4,0,0,w6,wt1};            //太阳能边界

        switch(i)
        {
            case 0:                          //热舒适区
                g.setStroke(new BasicStroke(3));
                int temp_x_1 = (int)((px0[0]+10)*20);
                int temp_x_2 = (int)((px0[1]+10)*20);
                int temp_x_3 = (int)((px0[2]+10)*20);
                int temp_x_4 = (int)((px0[3]+10)*20);
                int temp_y_1 = (int)(yLength-py0[0]*20);
                int temp_y_2 = (int)(yLength-py0[1]*20);
                int temp_y_3 = (int)(yLength-py0[2]*20);
                int temp_y_4 = (int)(yLength-py0[3]*20);
                //System.out.println("点1："+temp_x_1+","+temp_y_1);
                //System.out.println("点2："+temp_x_2+","+temp_y_2);
                //System.out.println("点3："+temp_x_3+","+temp_y_3);
                //System.out.println("点4："+temp_x_4+","+temp_y_4);
                int j_x_1 = 0;
                int j_x_2 = 0;
                int j_y_1 = 0;
                int j_y_2 = 0;
                boolean flag_1 = false;
                boolean flag_2 = false;
                boolean flag_3 = false;
                boolean flag_4 = false;
                for (int h = 0; h < fai_y.size(); h++) {
                      if ((fai_x.get(h).intValue() >= temp_x_1) && (fai_x.get(h).intValue() <= temp_x_3)) {

                        //System.out.println("相对湿度x：" + fai_x.get(h) + "   相对湿度y：" + fai_y.get(h));
                        flag_1 = countFormula(px0, py0, fai_x.get(h), fai_y.get(h));
                        if (flag_1){
                            j_x_1 = fai_x.get(h).intValue();
                            j_y_1 = fai_y.get(h).intValue();
                            break;
                        }
                      }
                }
                for (int h = 0; h < fai_y.size(); h++) {
                    if (fai_x.get(h).intValue()>=temp_x_1&&fai_x.get(h).intValue()<=temp_x_2){
                        //System.out.println("flag3中90的相对湿度y坐标："+fai_y.get(h).intValue());
                    }

                    if ((fai_y.get(h).intValue() == temp_y_1)&&fai_x.get(h).intValue()>=temp_x_1&&fai_x.get(h).intValue()<=temp_x_2) {
                        //System.out.println("---------------------flag_3-----------------");
                        flag_3 = true;
                        j_x_2 = fai_x.get(h).intValue();
                        j_y_2 = fai_y.get(h).intValue();
                    }
                }
                for (int h = 0; h < fai_y.size(); h++) {
                      if ((fai_x.get(h).intValue() >= temp_x_2) && (fai_x.get(h).intValue() <= temp_x_4)) {
                        //System.out.println("热舒适区x：" + temp_x_2 + "   热舒适区y：" + temp_y_2);
                        //System.out.println("相对湿度x：" + fai_x.get(h) + "   相对湿度y：" + fai_y.get(h));
                         // System.out.println("---------------------flag_2-----------------");
                        flag_2 = countFormula(px0, py0, fai_x.get(h), fai_y.get(h));
                        if (flag_2){
                              j_x_2 = fai_x.get(h).intValue();
                              j_y_2 = fai_y.get(h).intValue();
                            break;
                        }
                      }
                }
                for (int h = 0; h < fai_y.size(); h++) {
                      if (fai_y.get(h).intValue() == temp_y_3&&fai_x.get(h).intValue()>=temp_x_3&&fai_x.get(h).intValue()<=temp_x_4) {
                          //System.out.println("---------------------flag_4-----------------");
                        flag_4 = true;
                        j_x_1 = fai_x.get(h).intValue();
                        j_y_1 = fai_y.get(h).intValue();
                      }
                }
                System.out.println("交点1  x："+j_x_1+"  y:"+j_y_1);
                System.out.println("交点2  x："+j_x_2+"  y:"+j_y_2);
                System.out.println(flag_1+" "+flag_2+" "+flag_3+" "+flag_4);
                if (flag_1&&flag_3){
                    System.out.println("------------1--------------");
                    for (int nn = 0;nn < fai_x.size();nn++){
                        if(fai_x.get(nn).intValue()>=j_x_1&&fai_x.get(nn).intValue()<=j_x_2){
                            //System.out.println("x:"+fai_x.get(nn).intValue()+"    y:"+fai_y.get(nn).intValue());
                            pg0.addPoint(fai_x.get(nn).intValue(),fai_y.get(nn).intValue());
                        }
                    }
                    pg0.addPoint(temp_x_2,temp_y_2);
                    pg0.addPoint(temp_x_4,temp_y_4);
                    pg0.addPoint(temp_x_3,temp_y_3);
                    pg0.addPoint(j_x_1,j_y_1);
                }else if (flag_1&&flag_2){
                    for (int nn = 0;nn < fai_x.size();nn++){
                        if(fai_x.get(nn).intValue()>=j_x_1&&fai_x.get(nn).intValue()<=j_x_2){
                            pg0.addPoint(fai_x.get(nn).intValue(),fai_y.get(nn).intValue());
                        }
                    }
                    System.out.println("------------2--------------");
                    pg0.addPoint(temp_x_4,temp_y_4);
                    pg0.addPoint(temp_x_3,temp_y_3);
                    pg0.addPoint(j_x_1,j_y_1);
                }else if (flag_2&&flag_4){
                    for (int nn = 0;nn < fai_x.size();nn++){
                        if(fai_x.get(nn).intValue()>=j_x_1&&fai_x.get(nn).intValue()<=j_x_2){
                            pg0.addPoint(fai_x.get(nn).intValue(),fai_y.get(nn).intValue());
                        }
                    }
                    System.out.println("------------3--------------");
                    pg0.addPoint(temp_x_4,temp_y_4);
                    pg0.addPoint(j_x_1,j_y_1);
                }else{
                    System.out.println("------------4--------------");
                    pg0.addPoint(temp_x_1,temp_y_1);
                    pg0.addPoint(temp_x_2,temp_y_2);
                    pg0.addPoint(temp_x_4,temp_y_4);
                    pg0.addPoint(temp_x_3,temp_y_3);
                    pg0.addPoint(temp_x_1,temp_y_1);
                }
                fai_x.clear();
                fai_y.clear();
                g.drawPolyline(pg0.xpoints,pg0.ypoints,pg0.npoints);
                break;
            case 1:
                g.setStroke(new BasicStroke(5));    //在JAVA 2D开发中,BasicStroke用于定义线条的特征,我们可以调用Graphics2D类中的setStroke方法来将新创建的BasicStroke对象设置进去

                //System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                for(int a=0;a<6;a++)
                {
                    b=(int)((px1[a]+10)*20);
                    c=(int)(yLength-py1[a]*20);
                    pg1.addPoint(b,c);
                }
                for(double x=(t1+10)*20;x<(29+10)*20;x++)
                {
                    double smallT=x/20-10;   //smallT为摄氏干球温度

                    double t=smallT+absoluteZero;  //t为干球温度，单位为K

                    double y=analysisUtil.calcuY(90,t, f, p, yLength);
                    pg1.addPoint((int)x,(int)y);
                }
                pg1.addPoint((29+10)*20,(int)(yLength-22.96*20));
                g.drawPolyline(pg1.xpoints,pg1.ypoints,pg1.npoints);
                break;
            case 2:                     // 蓄热通风边界

                for(int a=0;a<5;a++)
                {
                    b=(int)((px2[a]+10)*20);
                    c=(int)(yLength-py2[a]*20);
                    pg2.addPoint(b,c);
                }
                g.drawPolyline(pg2.xpoints,pg2.ypoints,pg2.npoints);
                break;
            case 3:                 //直接蒸发降温边界

                for(int a=0;a<7;a++)
                {
                    b=(int)((px3[a]+10)*20);
                    c=(int)(yLength-py3[a]*20);
                    pg3.addPoint(b,c);
                }
                g.drawPolyline(pg3.xpoints,pg3.ypoints,pg3.npoints);
                break;

            case 4:                       //太阳能边界
                if(1==1)
                {

                    for(int a=0;a<7;a++)
                    {
                        b=(int)((px4[a]+10)*20);
                        c=(int)(yLength-py4[a]*20);
                        pg4.addPoint(b,c);
                    }
                    g.drawLine((int)(6+10)*20,yLength,(int)(6+10)*20,(int)analysisUtil.calcuY(100,6+absoluteZero, f, p, yLength));
                }
                break;
        }

    }

    public boolean countFormula(double[] px0,double[] py0,double x,double y){
        //y=ax+b  通过1、3确定一条直线，通过2，4确定一条直线
        double x_1 = ((px0[0]+10)*20);
        double x_2 = ((px0[1]+10)*20);
        double x_3 = ((px0[2]+10)*20);
        double x_4 = ((px0[3]+10)*20);
        double y_1 = (yLength-py0[0]*20);
        double y_2 = (yLength-py0[1]*20);
        double y_3 = (yLength-py0[2]*20);
        double y_4 = (yLength-py0[3]*20);
        double a_1= (y_3-y_1)/(x_3-x_1);
        double b_1= y_1-(a_1*x_1);
        double a_2= (y_4-y_2)/(x_4-x_2);
        double b_2= y_4-(a_2*x_4);
        //判断输入的x、y是否符合公式
        double result1 = y-((a_1*x)+b_1);
        double result2 = y-((a_2*x)+b_2);
        //System.out.println("------------------------------------------------------------------------------------");
       // System.out.println("result1:"+result1);
        //System.out.println("result2:"+result2);
        if ((result1<=parameter&&result1>=-parameter)||(result2<=parameter)&&result2>=-parameter){
            //System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            return true;
        }
        return false;
    }
}
