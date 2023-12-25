package com.mobisys.building.api.importdata;

import com.mobisys.building.entity.AsdoInfo;
import com.mobisys.building.entity.OcpedidInfo;
import com.mobisys.building.entity.OcpehhccInfo;
import com.mobisys.building.entity.OcpnvdInfo;
import com.mobisys.building.service.AsdoService;
import com.mobisys.building.service.OcpedidService;
import com.mobisys.building.service.OcpnvdService;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.StringJoiner;

//上传室外参数（围护结构动态保温设计室外计算参数、自然通风设计室外计算参数、建筑遮阳设计室外计算参数）
@CrossOrigin(origins = {"http://localhost:8080", "http://127.0.0.1:5501", "null"})
@RestController
@RequestMapping("/importocpedidocpnvdasdo")
public class ImportOcpedidOcpnvdAsdo {
    @Autowired
//    围护结构动态保温设计室外计算参数
    private OcpedidService ocpedidService;
    @Autowired
//    自然通风设计室外计算参数
    private OcpnvdService ocpnvdService;
    @Autowired
//    建筑遮阳设计室外计算参数
    private AsdoService asdoService;
    private double flag=0;
    @ResponseBody
    @RequestMapping("/uploadocpedidocpnvdasdo")
    public JSONObject UploadOcpnvd(@RequestParam("file")MultipartFile file, String name, HttpServletRequest request, HttpServletResponse response) {
        String action = request.getParameter("action");
        int code=0,count=0;
        StringJoiner buffer=new StringJoiner("/n");
        JSONObject jsonObject =new JSONObject();
        try {
            if(name!=null) {
                InputStream inputStream=file.getInputStream();
                Workbook workbook=null;
                if(isExcel2003(name)) {
                    workbook= new HSSFWorkbook(inputStream);
                }else if(isExcel2007(name)) {
                    workbook=new XSSFWorkbook(inputStream);
                }
                int sheetNum=workbook.getNumberOfSheets();//获得工作薄（Workbook）中工作表（Sheet）的个数
                Sheet sheet=workbook.getSheetAt(0);//获得第0个工作薄
                int RowNum=sheet.getLastRowNum();//如果sheet中一行数据都没有则返回-1，只有第一行有数据则返回0，最后有数据的行是第n行则返回 n-1
//                判断导入的文件是否为空
                if(RowNum==0) {
                    flag=100;
                    buffer.add("导入文件数据为空！");
                }
                try {
//                    ocpnvd对应表中的sheet1（自然通风设计室外计算参数）
                    if (action.equals("ocpnvd")) {
//                        热工表2对应自然通风设计室外计算参数ocpnvd
                        sheet = workbook.getSheetAt(1);
                        RowNum = sheet.getLastRowNum();
                        if (RowNum == 0) {
                            flag = 100;
                            buffer.add("导入文件数据为空");
                        }
//                        从第二行开始读取数据
                        for (int i = 1; i <= RowNum; i++) {
                            if (flag < 100) {
                                double d = (double) 100 / RowNum;
                                flag += d;
                            } else {
                                flag = 100;
                            }

                            OcpnvdInfo ocpnvdInfo = new OcpnvdInfo();
                            Row row = sheet.getRow(i);//获取指定行
                            if (row != null) {
                                Cell[] cells = new Cell[17];
                                for (int k = 0; k < cells.length; k++) {
                                    cells[k] = row.getCell(k);//获取单元格
                                    if (cells[k]!=null&&k!=0){
                                        cells[k].setCellType(CellType.STRING);//设置单元格格式
                                    }
                                }
                                 int flag1 = 0;
                                //数据校验，判断第一个数据单元格是不是台站号
                                System.out.println(cells[0]);
                                if (cells[0] != null && cells[0].getCellType() == CellType.NUMERIC) {

                                   // System.out.println(i);
                                    OcpnvdInfo ocpnvdInfo1 = ocpnvdService.getOcpnvdById((int)cells[0].getNumericCellValue());
                                    if (ocpnvdInfo1!=null){
                                        ocpnvdInfo = ocpnvdInfo1;
                                        flag1 = 1;
                                    }
                                    ocpnvdInfo.setStationId((int) cells[0].getNumericCellValue());
                                } else {
                                    buffer.add("热工表2" + "的第" + i + "行出错，已忽略该行。");
                                    continue;
                                }
                                System.out.println("一行的单元格数：" + row.getLastCellNum());
//                                插入数据
                                if (isMergedRegion(sheet, i, 1) && cells[1].getStringCellValue().equals("无自然通风需求")) {
//                                    System.out.println("我是第" + i + "行");
//                                    System.out.println("我是合并单元格：无自然通风需求");
                                    ocpnvdInfo.setZvp(null);
                                    ocpnvdInfo.setZvd(null);
                                    ocpnvdInfo.setZvows(null);
                                    ocpnvdInfo.setZvorh(null);
                                    ocpnvdInfo.setZvot(null);
                                } else {
                                    ocpnvdInfo.setZvp(cells[1].getStringCellValue());
                                    ocpnvdInfo.setZvd( cells[2].getStringCellValue());
                                    ocpnvdInfo.setZvows(cells[3].getStringCellValue());
                                    ocpnvdInfo.setZvorh(cells[4].getStringCellValue());
                                    ocpnvdInfo.setZvot(cells[5].getStringCellValue());
                                }
                                if (cells[6]!=null){
                                    ocpnvdInfo.setCvp(cells[6].getStringCellValue());
                                }
                                if (cells[7]!=null){
                                    ocpnvdInfo.setCvd(cells[7].getStringCellValue());
                                }
                                if (cells[8]!=null){
                                    ocpnvdInfo.setCvows(cells[8].getStringCellValue());
                                }
                                if (cells[9]!=null){
                                    ocpnvdInfo.setCvorh(cells[9].getStringCellValue());
                                }
                                if (cells[10]!=null){
                                    ocpnvdInfo.setCvot(cells[10].getStringCellValue());
                                }
                                if (cells[11]!=null){
                                    ocpnvdInfo.setNvp(cells[11].getStringCellValue());

                                }
                                if (cells[12]!=null){
                                    ocpnvdInfo.setNvd(cells[12].getStringCellValue());
                                }
                                if (cells[13]!=null){
                                    ocpnvdInfo.setNvows(cells[13].getStringCellValue());
                                }
                                if (cells[14]!=null){
                                    ocpnvdInfo.setNvorh(cells[14].getStringCellValue());
                                }
                                if (cells[15]!=null){
                                    ocpnvdInfo.setNvot(cells[15].getStringCellValue());
                                }
                                if (cells[16]!=null){
                                    ocpnvdInfo.setWindDirect(cells[16].getStringCellValue());
                                }
                                System.out.println(cells[0]);
                                if (ocpnvdInfo!= null&& flag1==0) {
//                                    System.out.println(ocpnvdInfo.getStationId());
//                                    System.out.println(ocpnvdService);
                                    ocpnvdService.addOcpnvd(ocpnvdInfo);
                                    count++;
                                }else if (ocpnvdInfo!= null&& flag1==1){
                                    ocpnvdService.updateOcpnvd(ocpnvdInfo);
                                    count++;
                                }
                            }
                            if (count == RowNum) {
                                buffer.add("上传完成！");
                            }
//                            System.out.println(ocpnvdInfo.toString());
                            upLoadflag();
                        }

                        jsonObject.put("count", "共计" + RowNum + "条数据，导入成功" + count + "条数据，导入失败" + (RowNum - count) + "条");

                    }
//                    ocpedidi对应表中的sheet0（围护结构动态保温设计室外计算参数）
                    else if (action.equals("ocpedid")) {
                        sheet = workbook.getSheetAt(0);
                        RowNum = sheet.getLastRowNum();
                        if(RowNum==0)
                        {
                            flag = 100;
                            buffer.add("导入文件数据为空");
                        }
//                      从第二行开始读取数据
                        flag = (double)100/RowNum;
                        Row row1 = sheet.getRow(2);
                        Cell[] cells1 = new Cell[14];
                        cells1[0] = row1.getCell(0);
                        for(int i=2;i<=RowNum;i++) {
                            if(flag<100)
                            {
                                double d = (double)100/RowNum;
                                flag += d;
                                System.out.println(d);
                            }else {
                                flag = 100;
                            }
                            OcpedidInfo ocpedidInfo = new OcpedidInfo();
                            Row row = sheet.getRow(i);
                            if(row!=null) {

                                Cell[] cells = new Cell[14];
                                for (int k = 0; k < cells.length; k++) {
                                    cells[k] = row.getCell(k);
                                  /*  if(cells[k]!=null&&k!=0){
                                        //cells[k].setCellType(CellType.STRING);
                                    }*/
                                }
                                int flag1 = 0;
                                //数据校验，判断第一个数据单元是不是台站号
                                System.out.println(cells[0]);
                               /* if(cells[0]!=null)
                                {
                                    System.out.println("true");
                                }*/
                                if (cells[0] != null && cells[0].getCellType() == CellType.NUMERIC) {

                                    OcpedidInfo ocpedidInfo1 = ocpedidService.getOcpedidByIT((int) cells[0].getNumericCellValue(), (int) cells[1].getNumericCellValue());
                                    //System.out.println(ocpedidService.getOcpedidByIT((int)cells[0].getNumericCellValue(),(int)cells[1].getNumericCellValue()));
                                    if (ocpedidInfo1 != null) {
                                        ocpedidInfo = ocpedidInfo1;
                                        flag1 = 1;
                                    }
                                    ocpedidInfo.setStationId((int) cells[0].getNumericCellValue());
                                } else if (cells[0].getCellType() == CellType.BLANK) {
                                    OcpedidInfo ocpedidInfo1 = ocpedidService.getOcpedidByIT((int) cells1[0].getNumericCellValue(), (int) cells[1].getNumericCellValue());
                                    if (ocpedidInfo != null) {
                                        ocpedidInfo = ocpedidInfo1;
                                        flag1 = 1;
                                    }
                                    System.out.println(i);

                                } else {
                                    buffer.add("热工表3" + "的第" + i + "行出错，已忽略该行。");
                                    continue;
                                }
                                System.out.println("一行的单元格数:" + row.getLastCellNum());
                                //插入数据
                                if (isMergedRegion(sheet, i, 1) && cells[2].getStringCellValue().equals("无热动力需求")) {
                                    ocpedidInfo.setTime(null);
                                    ocpedidInfo.setlDhpcot(null);
                                    ocpedidInfo.setlDhpsriH(null);
                                    ocpedidInfo.setlDhpsriE(null);
                                    ocpedidInfo.setlDhpsriS(null);
                                    ocpedidInfo.setlDhpsriW(null);
                                    ocpedidInfo.setlDhpsriN(null);
                                    ocpedidInfo.setfDhpcot(null);
                                    ocpedidInfo.setfDhpsriH(null);
                                    ocpedidInfo.setfDhpsriE(null);
                                    ocpedidInfo.setfDhpsriS(null);
                                    ocpedidInfo.setfDhpsriW(null);
                                    ocpedidInfo.setfDhpsriN(null);
                                } else {
                                    ocpedidInfo.setTime((int) cells[1].getNumericCellValue());
                                    ocpedidInfo.setlDhpcot(cells[2].getNumericCellValue());
                                    ocpedidInfo.setlDhpsriH(cells[3].getNumericCellValue());
                                    ocpedidInfo.setlDhpsriE(cells[4].getNumericCellValue());
                                    ocpedidInfo.setlDhpsriS(cells[5].getNumericCellValue());
                                    ocpedidInfo.setlDhpsriW(cells[6].getNumericCellValue());
                                    ocpedidInfo.setlDhpsriN(cells[7].getNumericCellValue());
                                    ocpedidInfo.setfDhpcot(cells[8].getNumericCellValue());
                                    ocpedidInfo.setfDhpsriH(cells[9].getNumericCellValue());
                                    ocpedidInfo.setfDhpsriE(cells[10].getNumericCellValue());
                                    ocpedidInfo.setfDhpsriS(cells[11].getNumericCellValue());
                                    ocpedidInfo.setfDhpsriW(cells[12].getNumericCellValue());
                                    ocpedidInfo.setfDhpsriN(cells[13].getNumericCellValue());
                                }
                                if (ocpedidInfo != null && flag1 == 0) {
                                    ocpedidService.addOcpedid(ocpedidInfo);
                                    count++;
                                } else if (ocpedidInfo != null && flag1 == 1) {
                                    System.out.println(cells[0]);
                                    ocpedidService.updateOcpedid(ocpedidInfo);
                                    count++;
                                }
                            }
                            if (count == RowNum-1){
                                buffer.add("上传完成！");
                            }
                            upLoadflag();
                        }
                        jsonObject.put("count","共计"+RowNum+"条数据，导入成功"+count+"条数据，导入失败"+(RowNum-count)+"条");
                    }
//                    asdo对应表中的sheet2-5（热工表3的子表1到4）
                    else if (action.equals("asdo")) {
//                        sheet1表示热工表子表1，记录台站号的遮阳计算时段信息
                        Sheet sheet1=workbook.getSheetAt(0);
//                        sheet2表示热工表子表2，记录遮阳计算时段起始日设计计算参数
                        Sheet sheet2=workbook.getSheetAt(1);
//                        sheet3表示热工表子表3，记录遮阳计算时段终止日设计计算参数
                        Sheet sheet3=workbook.getSheetAt(2);
//                        sheet4表示热工表子表4，记录遮阳计算时段内的设计计算参数
                        Sheet sheet4=workbook.getSheetAt(3);
                        int RowNum1=sheet1.getLastRowNum();
                        int RowNum2=sheet2.getLastRowNum();
                        int RowNum3=sheet3.getLastRowNum();
                        int RowNum4=sheet4.getLastRowNum();
                        int RowNumAll=RowNum2+RowNum3+RowNum4;
                        int allDataLine=0;//全部数据的数目
                        Cell[] cells2=new Cell[15];//第二个子表的每行单元格的存储数组
                        Cell[] cells3=new Cell[15];//第三个子表的每行单元格的存储数组
                        Cell[] cells4=new Cell[13];//第四个子表的每行单元格的存储数组
                        Cell[] cells21 = new Cell[1];
                        Row row2=sheet2.getRow(2);
                        Row row3=sheet3.getRow(2);
                        Row row4=sheet4.getRow(2);
                        if(RowNum1==0||RowNum2==0||RowNum3==0||RowNum4==0) {
                            buffer.add("导入的文件数据不完整或者为空！");
                        }
                        AsdoInfo asdoInfo =new AsdoInfo();
                        HashMap<Integer, String> map = new HashMap<>();
                        //从第三行开始读子表一的数据
                        for(int q=2;q<=RowNum1;q++) {
                            Row row1=sheet1.getRow(q);
                            Row row21 = sheet1.getRow(q);
                            cells21[0] = row21.getCell(0);
                            map.put((int)row1.getCell(0).getNumericCellValue(),row1.getCell(1).getStringCellValue());
                        }
//                        System.out.println(map.toString());
//                        System.out.println("台站号"+map.get(50136));
                        String[] date=new String[2];
                        int asdoid2=0,asdoid3=0,asdoid4=0;
                        flag = (double)100/RowNumAll;


                        for(int j=2;j<=RowNum2;j++) {
                            int flag1 = 0;
                            if(flag<100) {
                                double d=(double)100/RowNumAll;
                                flag+=d;
//                                System.out.println("flag的值："+flag);
                            }else {
                                flag=100;
                            }
                            row2=sheet2.getRow(j);
                            /*Row row21 = sheet2.getRow(j);
                            cells21[0] = row21.getCell(0);
                            int h = (int)cells21[0].getNumericCellValue();
                            if(row21==null){
                                cells21[0] = row21.getCell(0);
                            }*/

                            if(row2!=null) {
//                                System.out.println(row2);
                                for(int k=0;k<cells2.length;k++) {
                                    cells2[k]=row2.getCell(k);


//                                    System.out.println(cells2[k]);
                                }
                               /* for(int q=2;q<=RowNum1;q++)
                                {
                                    if(cells2[0]==cells21[0]){
                                        int a= (int)cells21[0].getNumericCellValue();
                                    }
                                }*/
                                if ((cells2[0] != null && cells2[0].getCellType() == CellType.NUMERIC)||cells2[0].getCellType()==CellType.BLANK) {

                                    // System.out.println(i);
                                    if(asdoid2!=0){
                                        AsdoInfo asdoInfo1 = asdoService.getAsdoById(asdoid2).get(0);
                                        if(asdoInfo1!=null){
                                            asdoInfo = asdoInfo1;
                                            flag1 = 1;
                                        }
                                    } else if(asdoService.getAsdoById((int) cells2[0].getNumericCellValue()).size()!=0) {
                                        AsdoInfo asdoInfo1 = asdoService.getAsdoById((int) cells2[0].getNumericCellValue()).get(0);
                                        System.out.println(asdoService.getAsdoById((int) cells2[0].getNumericCellValue()).size());
                                        if (asdoInfo1!=null){
                                            asdoInfo = asdoInfo1;
                                            flag1 = 1;
                                        }
                                    }

                                    asdoInfo.setStationId((int) cells2[0].getNumericCellValue());
                                } else{
                                    //buffer.add("热工表2" + "的第" + i + "行出错，已忽略该行。");
                                    //continue;
                                }
                                //System.out.println("岁的法国岁的法国"+cells2[2].getCellType());
                                if(cells2[2]!=null){
                                    cells2[2].setCellType(CellType.STRING);
                                }
                                if(/*cells2[0]!=null&&cells2[0].getCellType()==CellType.NUMERIC&&*/cells2[2]!=null&&cells2[2].getStringCellValue().equals("无遮阳需求")) {
//                                    System.out.println("判断是否没有遮阳需求");

                                    asdoInfo.setSunshadePeriodStart(null);
                                    asdoInfo.setSunshadePeriodEnd(null);
                                    //asdoInfo.setStationId((int)cells2[0].getNumericCellValue());
                                    asdoInfo.setTime(0);
                                    asdoInfo.setTableType(1);
                                    asdoInfo.setSolarAltitudeAngle(null);
                                    asdoInfo.setSolarAzimuthAngle(null);
                                    asdoInfo.setOutdoorAirTep(null);
                                    asdoInfo.setHoriI(null);
                                    asdoInfo.setHoriId(null);
                                    asdoInfo.setEastI(null);
                                    asdoInfo.setEastId(null);
                                    asdoInfo.setSoutI(null);
                                    asdoInfo.setSoutId(null);
                                    asdoInfo.setWestI(null);
                                    asdoInfo.setWestId(null);
                                    asdoInfo.setNortI(null);
                                    asdoInfo.setNortId(null);

                                    if(asdoInfo!=null&& flag1==0) {
                                        asdoService.addAsdoFromTable_1(asdoInfo);
                                        count++;
                                    }else if (asdoInfo != null && flag1 == 1) {
                                        if(asdoInfo.getSunshadePeriodStart()==null&&asdoInfo.getSunshadePeriodEnd()==null){
                                            System.out.println("数据全空");
                                            continue;
                                        }
                                        asdoService.updateAsdoFromTable_1(asdoInfo);
                                        count++;
                                    }
                                    continue;
                                }
                                if(/*cells2[0]!=null&&cells2[0].getCellType()==CellType.NUMERIC&&*/cells2[1]==null&&cells2[3]==null) {
                                    System.out.println("判断是否这一行只有一个台站号数据");
                                    asdoid2=(int)cells2[0].getNumericCellValue();
                       //             System.out.println("无遮阳需求的台站号"+asdoid2);
                                    allDataLine++;
                                    continue;
                                }
                                if(map.get(asdoid2)!=null) {//获取子表sheet1有日期的开始结束日期
                                    date=map.get(asdoid2).split("-");
                                }
                                asdoInfo.setStationId(asdoid2);
                                Double date1 = Double.valueOf(date[0]);
                                Double date2 = Double.valueOf(date[1]);
                                asdoInfo.setSunshadePeriodStart(date1);
                                asdoInfo.setSunshadePeriodEnd(date2);
                                asdoInfo.setTime((int)cells2[1].getNumericCellValue());
                                asdoInfo.setTableType(1);
                                Double cell = Double.valueOf(cells2[2].getStringCellValue());
                                asdoInfo.setSolarAltitudeAngle(cell);
                                asdoInfo.setSolarAzimuthAngle(cells2[3].getNumericCellValue());
                                asdoInfo.setOutdoorAirTep(cells2[4].getNumericCellValue());
                                asdoInfo.setHoriI(cells2[5].getNumericCellValue());
                                asdoInfo.setHoriId(cells2[6].getNumericCellValue());
                                asdoInfo.setEastI(cells2[7].getNumericCellValue());
                                asdoInfo.setEastId(cells2[8].getNumericCellValue());
                                asdoInfo.setSoutI(cells2[9].getNumericCellValue());
                                asdoInfo.setSoutId(cells2[10].getNumericCellValue());
                                asdoInfo.setWestI(cells2[11].getNumericCellValue());
                                asdoInfo.setWestId(cells2[12].getNumericCellValue());
                                asdoInfo.setNortI(cells2[13].getNumericCellValue());
                                asdoInfo.setNortId(cells2[14].getNumericCellValue());
                                if(asdoInfo!=null&& flag1==0) {
                                    asdoService.addAsdoFromTable_1(asdoInfo);
                                    count++;
                                }else if (asdoInfo != null && flag1 == 1) {

                                    asdoService.updateAsdoFromTable_1(asdoInfo);
                                    count++;
                                }
                            }
                            upLoadflag();
                        }
                      flag += (double)100/RowNumAll;
                        for(int k=2;k<=RowNum3;k++) {
                            int flag1 = 0;
                            if(flag<100) {
                                double d=(double)100/RowNumAll;
                                flag+=d;
//                                System.out.println("flag的值："+flag);
                            }else {
                                flag=100;
                            }
                            row3=sheet3.getRow(k);
                            if(row3!=null) {
                                for(int j=0;j<cells3.length;j++) {
                                    cells3[j]=row3.getCell(j);
//                                    System.out.println(cells3[j]);
                                }

                                if((cells3[0]!=null&&cells3[0].getCellType()==CellType.NUMERIC)){
                                    if(cells3[1].getStringCellValue().equals("无遮阳需求")&&asdoService.getAsdoById((int)cells3[0].getNumericCellValue()).size()!=0){
                                        for(int i = 0;i<asdoService.getAsdoById((int)cells3[0].getNumericCellValue()).size();i++){
                                            AsdoInfo asdoInfo2 = asdoService.getAsdoById((int)cells3[0].getNumericCellValue()).get(i);
                                            if(asdoInfo2.getTableType()==2)
                                            {
                                                asdoInfo = asdoInfo2;
                                                flag1=1;
                                                break;
                                            }
                                        }
                                    }
                                }else if(cells3[0].getCellType()==CellType.BLANK){
                                    if(asdoService.getAsdoByIT(asdoid3,(int)cells3[1].getNumericCellValue(),2).size()!=0){
                                            AsdoInfo asdoInfo2 = asdoService.getAsdoByIT(asdoid3,(int)cells3[1].getNumericCellValue(),2).get(0);
                                            asdoInfo = asdoInfo2;
                                            flag1=1;
                                    }
                                    asdoInfo.setStationId(asdoid3);
                                }
                                asdoInfo.setStationId((int)cells3[0].getNumericCellValue());
                                if(cells3[1]!=null){
                                    cells3[1].setCellType(CellType.STRING);
                                }
                                if(/*cells3[0]!=null&&cells3[0].getCellType()==CellType.NUMERIC&&*/cells3[1]!=null&&cells3[1].getStringCellValue().equals("无遮阳需求")) {
                                   // asdoInfo.setStationId((int)cells3[0].getNumericCellValue());
                                    asdoInfo.setSunshadePeriodStart(null);
                                    asdoInfo.setSunshadePeriodEnd(null);

                                    asdoInfo.setTime(0);
                                    asdoInfo.setTableType(2);
                                    asdoInfo.setSolarAltitudeAngle(null);
                                    asdoInfo.setSolarAzimuthAngle(null);
                                    asdoInfo.setOutdoorAirTep(null);
                                    asdoInfo.setHoriI(null);
                                    asdoInfo.setHoriId(null);
                                    asdoInfo.setEastI(null);
                                    asdoInfo.setEastId(null);
                                    asdoInfo.setSoutI(null);
                                    asdoInfo.setSoutId(null);
                                    asdoInfo.setWestI(null);
                                    asdoInfo.setWestId(null);
                                    asdoInfo.setNortI(null);
                                    asdoInfo.setNortId(null);
                                    if(asdoInfo!=null&&flag1==0) {
                                        asdoService.addAsdoFromTable_2(asdoInfo);
                                        count++;
                                    }else if (asdoInfo!=null&&flag1==1){
                                        if(asdoInfo.getSunshadePeriodStart()==null&&asdoInfo.getSunshadePeriodEnd()==null){
                                            System.out.println("数据全空");
                                            count++;
                                            continue;
                                        }
                                        asdoService.updateAsdoFromTable_2(asdoInfo);
                                        count++;
                                    }
                                    continue;
                                }
                                /*if(cells3[1] !=null){
                                    cells3[1].setCellType(CellType.NUMERIC);
                                }*/
                                System.out.println(cells3[1]);
                                if(cells3[2].getCellType()==CellType.BLANK)
                                {
                                    System.out.println("对的了");
                                }
                                if(/*cells3[0]!=null&&cells3[0].getCellType()==CellType.NUMERIC && */cells3[2].getCellType()==CellType.BLANK) {
                                    asdoid3=(int)cells3[0].getNumericCellValue();
//                                    System.out.println("有遮阳需求的台站"+asdoid3);
                                    allDataLine++;
                                    continue;
                                }
                                asdoInfo.setStationId(asdoid3);
                                if(map.get(asdoid3)!=null) {
                                        date=map.get(asdoid3).split("-");
                                }
                                    Double date1 = Double.valueOf(date[0]);
                                    Double date2 = Double.valueOf(date[1]);
                                    asdoInfo.setSunshadePeriodStart(date1);
                                    asdoInfo.setSunshadePeriodEnd(date2);
                                    Integer cell31 = Integer.valueOf(cells3[1].getStringCellValue());
                                    asdoInfo.setTime(cell31);
                                    asdoInfo.setTableType(2);
                                    asdoInfo.setSolarAltitudeAngle(cells3[2].getNumericCellValue());
                                    asdoInfo.setSolarAzimuthAngle(cells3[3].getNumericCellValue());
                                    asdoInfo.setOutdoorAirTep(cells3[4].getNumericCellValue());
                                    asdoInfo.setHoriI(cells3[5].getNumericCellValue());
                                    asdoInfo.setHoriId(cells3[6].getNumericCellValue());
                                    asdoInfo.setEastI(cells3[7].getNumericCellValue());
                                    asdoInfo.setEastId(cells3[8].getNumericCellValue());
                                    asdoInfo.setSoutI(cells3[9].getNumericCellValue());
                                    asdoInfo.setSoutId(cells3[10].getNumericCellValue());
                                    asdoInfo.setWestI(cells3[11].getNumericCellValue());
                                    asdoInfo.setWestId(cells3[12].getNumericCellValue());
                                    asdoInfo.setNortI(cells3[13].getNumericCellValue());
                                    asdoInfo.setNortId(cells3[14].getNumericCellValue());
                                    if(asdoInfo!=null&&flag1 == 0) {
                                        asdoService.addAsdoFromTable_2(asdoInfo);
                                        count++;
                                    }else if (asdoInfo!=null&&flag1==1){
                                        asdoService.updateAsdoFromTable_2(asdoInfo);
                                        count++;
                                    }

                            }
                            upLoadflag();
                        }
                        flag += (double)100/RowNumAll;
                        for(int p=2;p<=RowNum4;p++) {
                            int flag1 = 0;
                            if(flag<100) {
                                double d=(double)100/RowNumAll;
                                flag+=d;
//                                System.out.println("flag的值："+flag);

                            }else {
                                flag=100;
                            }
                            row4=sheet4.getRow(p);
                            if(row4!=null) {
                                for(int j=0;j<cells4.length;j++) {
                                    cells4[j]=row4.getCell(j);
                                }
                                if((cells4[0]!=null&&cells4[0].getCellType()==CellType.NUMERIC)){
                                    if(cells4[1].getStringCellValue().equals("无遮阳需求")&&asdoService.getAsdoById((int)cells4[0].getNumericCellValue()).size()!=0){
                                        for(int i = 0;i<asdoService.getAsdoById((int)cells4[0].getNumericCellValue()).size();i++){
                                            AsdoInfo asdoInfo3 = asdoService.getAsdoById((int)cells4[0].getNumericCellValue()).get(i);
                                            if(asdoInfo3.getTableType()==3)
                                            {
                                                asdoInfo = asdoInfo3;
                                                flag1=1;
                                                break;
                                            }
                                        }
                                    }
                                    asdoInfo.setStationId((int)cells4[0].getNumericCellValue());
                                }else if(cells4[0].getCellType()==CellType.BLANK){
                                    if(asdoService.getAsdoByIT(asdoid4,(int)cells4[1].getNumericCellValue(),3).size()!=0){
                                        AsdoInfo asdoInfo3 = asdoService.getAsdoByIT(asdoid4,(int)cells4[1].getNumericCellValue(),3).get(0);
                                        asdoInfo = asdoInfo3;
                                        flag1=1;
                                    }
                                    asdoInfo.setStationId(asdoid4);
                                }
                                if(cells4[1]!=null){
                                    cells4[1].setCellType(CellType.STRING);
                                }
                                if(/*cells4[0]!=null&&cells4[0].getCellType()==CellType.NUMERIC&&cells4[1]!=null&&*/cells4[1].getStringCellValue().equals("无遮阳需求")) {
                                    //asdoInfo.setStationId((int)cells4[0].getNumericCellValue());
                                    asdoInfo.setSunshadePeriodStart(null);
                                    asdoInfo.setSunshadePeriodEnd(null);
                                    asdoInfo.setTime(0);
                                    asdoInfo.setTableType(3);
                                    asdoInfo.setAveValueOutairDayHour(null);
                                    asdoInfo.setHoriI(null);
                                    asdoInfo.setHoriId(null);
                                    asdoInfo.setEastI(null);
                                    asdoInfo.setEastId(null);
                                    asdoInfo.setSoutI(null);
                                    asdoInfo.setSoutId(null);
                                    asdoInfo.setWestI(null);
                                    asdoInfo.setWestId(null);
                                    asdoInfo.setNortI(null);
                                    asdoInfo.setNortId(null);
                                    if(asdoInfo!=null&&flag1==0) {
                                        asdoService.addAsdoFromTable_3(asdoInfo);
                                        count++;
                                    }else if (asdoInfo!=null&&flag1==1){
                                        if(asdoInfo.getSunshadePeriodStart()==null&&asdoInfo.getSunshadePeriodEnd()==null){
                                            System.out.println("数据全空");
                                            count++;
                                            continue;
                                        }
                                        asdoService.updateAsdoFromTable_3(asdoInfo);
                                        count++;
                                    }
                                    continue;
                                }
                                    if(/*cells4[0]!=null&&cells4[0].getCellType()==CellType.NUMERIC&&(cells4[1]==null||cells4[2]==null)*/cells4[2].getCellType()==CellType.BLANK) {
                                    asdoid4=(int)cells4[0].getNumericCellValue();
                                    allDataLine++;
                                    continue;
                                }
                                asdoInfo.setStationId(asdoid4);
                                if(map.get(asdoid4)!=null) {
                                    date=map.get(asdoid4).split("-");
                                }
                                //asdoInfo.setSunshadePeriodStart(date[0]);
                                //asdoInfo.setSunshadePeriodEnd(date[1]);
                                //asdoInfo.setStationId(asdoid4);
                                Double date1 = Double.valueOf(date[0]);
                                Double date2 = Double.valueOf(date[1]);
                                asdoInfo.setSunshadePeriodStart(date1);
                                asdoInfo.setSunshadePeriodEnd(date2);
                                Integer cell41 = Integer.valueOf(cells4[1].getStringCellValue());
                                asdoInfo.setTime(cell41);
                                //asdoInfo.setTime((int)cells4[1].getNumericCellValue());
                                asdoInfo.setTableType(3);
                                asdoInfo.setAveValueOutairDayHour(cells4[2].getNumericCellValue());
                                asdoInfo.setHoriI(cells4[3].getNumericCellValue());
                                asdoInfo.setHoriId(cells4[4].getNumericCellValue());
                                asdoInfo.setEastI(cells4[5].getNumericCellValue());
                                asdoInfo.setEastId(cells4[6].getNumericCellValue());
                                asdoInfo.setSoutI(cells4[7].getNumericCellValue());
                                asdoInfo.setSoutId(cells4[8].getNumericCellValue());
                                asdoInfo.setWestI(cells4[9].getNumericCellValue());
                                asdoInfo.setWestId(cells4[10].getNumericCellValue());
                                asdoInfo.setNortI(cells4[11].getNumericCellValue());
                                asdoInfo.setNortId(cells4[12].getNumericCellValue());
                                if(asdoInfo!=null&&flag1 == 0) {
                                    asdoService.addAsdoFromTable_3(asdoInfo);
                                    count++;
                                }else if (asdoInfo!=null&&flag1==1){
                                    asdoService.updateAsdoFromTable_3(asdoInfo);
                                    count++;
                                }
                            }
                            upLoadflag();
                        }
                        if(count==RowNumAll-7) {
                            buffer.add("上传完成！");
                        }
                        jsonObject.put("count", "共计" + RowNumAll + "条数据，导入成功" + count + "条数据，其中空行"+allDataLine+"行，导入失败" + (RowNumAll-allDataLine - count) + "条");
                    }
                }catch (Exception e) {
                    code=0;
                    flag=0;
                    jsonObject.put("code",code);
                    jsonObject.put("flag",flag);
                    jsonObject.put("message",e.getMessage());
                    e.printStackTrace();
                    return jsonObject;
                }
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        jsonObject.put("code",code);
        jsonObject.put("message",buffer.toString());
        return jsonObject;
    }

    //    传递上传文件的进度标志flag
    @ResponseBody
    @RequestMapping("/flag")
    public JSONObject upLoadflag() {
        JSONObject jsonObject=new JSONObject();
        if(Math.round(flag)==100) {
            jsonObject.put("code",1);
        }
        jsonObject.put("flag",Math.round(flag));
        return jsonObject;
    }


    /***
     * 判断文件类型是不是2003版本
     * @param
     * @return
     */
    private boolean isExcel2003(String fileName) {
        return fileName.matches("^.+\\.(?i)(xls)$");
    }
    /***
     * 判断文件类型是不是2007版本
     * @param
     * @return
     */
    private boolean isExcel2007(String fileName) {
        return fileName.matches("^.+\\.(?i)(xlsx)$");
    }

    /***
     * 判断单元格是否是合并单元格
     * @param
     * @return
     */
    private boolean isMergedRegion(Sheet sheet,int row,int column) {
        int sheetMergedCount = sheet.getNumMergedRegions();
        for(int i=0;i<sheetMergedCount;i++) {
            CellRangeAddress range=sheet.getMergedRegion(i);
            int firstColumn=range.getFirstColumn();
            int lastColumn=range.getLastColumn();
            int firstRow=range.getFirstRow();
            int lastRow=range.getLastRow();
            if(row>=firstRow&&row<=lastRow) {
                if(column>=firstColumn&&column<=lastColumn) {
                    return true;
                }
            }
        }
        return false;
    }

}
