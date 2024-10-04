//获取省份信息
getprovince();
//根据下拉列表选择的参数显示对应的模块，隐藏其他模块
showParamType();



//初始化
//根据传递过来的台站号获得省份、城市信息、经度、维度、海拔、气候区属信息
//默认站点的经度、维度、海拔和气候区
var stationId = $('#number').value
if(stationId){
    $.ajax({
    url:"http://localhost:8080/building/selectcity/getstationinfo?stationid="+theRequest['stationId'],
    type: "get",
    contentType: "application/json",
    dataType: "json",
    success: function(message) {
      
        $("#tabletitle").find("tr").eq(0).find("td").eq(0).text(message.stationinfo.cityName);
        $("#tabletitle").find("tr").eq(0).find("td").eq(1).text(message.stationinfo.province);
        $("#tabletitle").find("tr").eq(0).find("td").eq(2).text(message.stationinfo.climates);
        $("#tabletitle").find("tr").eq(0).find("td").eq(3).text(message.stationinfo.longitude);
        $("#tabletitle").find("tr").eq(0).find("td").eq(4).text(message.stationinfo.latitude);
 
       $("#province option:selected").text(message.stationinfo.province);
       citycontent(message.stationinfo.province);
       $("#city option:selected").text(message.stationinfo.cityName);
       $('#number').append('<option>'+message.stationinfo.stationId+'</option>');
       showParamType();
    },
    error: function() {
        
    }
    });
}
else{
  
    getStationId('合肥')
}


//获取站点编号
function getStationId(city){
    $.ajax({
        url:"http://localhost:8080/building/selectcity/getstations?city="+city,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            $('#number').empty();
      
           $('#number').val(message.stationList)
            //获取该站点的详细信息，表头获取站点的经度、维度、海拔和气候区
            getstationinfo();
            //获取当前站点所选参数的数据
            showParamType();
        },
        error: function() {
            
        }
    });
}
//通过输入查询获取数据
function getSearchInputResult(){
  var stationId =  document.getElementById('search').value
 if(isNaN(parseInt(stationId))){
    $.ajax({
        url:"http://localhost:8080/building/selectcity/getstation?city="+stationId,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            if(message.stationList.length == 0) alert("没有该站点信息")
           else{

            var numberId = message.stationList[0]
            $('#number').empty();
             $('#number').val(numberId)
           $.ajax({
            url:"http://localhost:8080/building/selectcity/getstationinfo?stationid="+numberId,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function(message) {    
                $("#tabletitle").find("tr").eq(0).find("td").eq(0).text(message.stationinfo.cityName);
                $("#tabletitle").find("tr").eq(0).find("td").eq(1).text(message.stationinfo.province);
                $("#tabletitle").find("tr").eq(0).find("td").eq(2).text(message.stationinfo.climates);
                $("#tabletitle").find("tr").eq(0).find("td").eq(3).text(message.stationinfo.longitude);
                $("#tabletitle").find("tr").eq(0).find("td").eq(4).text(message.stationinfo.latitude);
               $("#province option:selected").text(message.stationinfo.province);
               var province = message.stationinfo.province
                var city = message.stationinfo.cityName
              
               //根据所选省份确定站点下拉菜单
               $.ajax({
                url:"http://localhost:8080/building/selectcity/getcitys?province="+province,
                type: "get",
                contentType: "application/json",
                dataType: "json",
                success: function(data) {
                   
                    $('#city').empty();
                    if(data.cityList.length>0){
                        for(var i=0;i<data.cityList.length;i++){
                        $('#city').append('<option>'+data.cityList[i]+'</option>');
                       }                           
                    }   
                    $("#city option:selected").text(city);                    
                },
                error: function() {                       
                }
            
            });
               $("#city option:selected").text(city);
               showParamType();
            },
            error: function() {
                
            }
            });
        }},
        error: function() {
            
        }
    });
}
 else{
    $('#number').empty();
    $('#number').val(stationId)
  
    $.ajax({
        url:"http://localhost:8080/building/selectcity/getstationinfo?stationid="+stationId,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            if(message.stationList.length == 0) alert("没有该站点信息")
           else{
               $("#tabletitle").find("tr").eq(0).find("td").eq(0).text(message.stationinfo.cityName);
            $("#tabletitle").find("tr").eq(0).find("td").eq(1).text(message.stationinfo.province);
            $("#tabletitle").find("tr").eq(0).find("td").eq(2).text(message.stationinfo.climates);
            $("#tabletitle").find("tr").eq(0).find("td").eq(3).text(message.stationinfo.longitude);
            $("#tabletitle").find("tr").eq(0).find("td").eq(4).text(message.stationinfo.latitude);
     
           $("#province option:selected").text(message.stationinfo.province);
           var province = message.stationinfo.province
           var city = message.stationinfo.cityName
       
            //根据所选省份确定站点下拉菜单
            $.ajax({
                url:"http://localhost:8080/building/selectcity/getcitys?province="+province,
                type: "get",
                contentType: "application/json",
                dataType: "json",
                success: function(data) {
                    $('#city').empty();
                    if(data.cityList.length>0){
                        for(var i=0;i<data.cityList.length;i++){
                        $('#city').append('<option>'+data.cityList[i]+'</option>');
                       }                           
                    }  
                     
           $("#city option:selected").text(city);                    
                },
                error: function() {                       
                }
            });
           $("#city option:selected").text(message.stationinfo.cityName);
           $('#number').append('<option>'+message.stationinfo.stationId+'</option>');
           showParamType();
        }},
        error: function() {
            
        }
        });
 }
}

//获取省份信息
function getprovince(){
    
   $.ajax({
        url:"http://localhost:8080/building/selectcity/getprovince",
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
     
            
            $('#province').empty();
           for(var i=0;i<message.provinceList.length;i++){
            $('#province').append('<option>'+message.provinceList[i]+'</option>');
           }
           //获取所选省份的城市信息
           citycontent($("#province option:checked").text());
        },
        error: function() {
            
        }
    }); 
}

//根据所选省份确定城市下拉菜单的内容
function citycontent(province){
  
    
     $.ajax({
            url:"http://localhost:8080/building/selectcity/getcitys?province="+province,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function(message) {
                $('#city').empty();
                if(message.cityList.length>0){
                    for(var i=0;i<message.cityList.length;i++){
                    $('#city').append('<option>'+message.cityList[i]+'</option>');
                   }                           
                     //所选城市的站点信息                           
                   numbercontent($("#city option:checked").text());                            
                }                       
            },
            error: function() {                       
            }
        });
}
//根据城市信息确定站点
function numbercontent(city){
    $.ajax({
            url:"http://localhost:8080/building/selectcity/getstations?city="+city,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function(message) {
                $('#number').empty();
                $('#number').val(message.stationList)
                if(message.stationList.length>0){
                    for(var i=0;i<message.stationList.length;i++){
                    $('#number').append('<option>'+message.stationList[i]+'</option>');
                   }
                }
                //获取该站点的详细信息，表头获取站点的经度、维度、海拔和气候区
                getstationinfo();
                //获取当前站点所选参数的数据
                showParamType();
            },
            error: function() {
                
            }
        });
}
//省份切换
function provinceSelected(){
    //获取切换省份后的城市信息
    citycontent($("#province option:checked").text());
}
//城市切换
function citySelected(){
    //获取当前城市的站点信息
    //所选城市的站点信息                           
 numbercontent($("#city option:checked").text());
 var city = $("#city option:checked").text(); 
  getStationId(city)
  getstationinfo();
  showParamType();
}
//站点切换
function numberSelected(){

}
//表头获取站点的经度、维度、海拔和气候区
function getstationinfo(){
    var number = document.getElementById("number").value
  
    $.ajax({
    url:"http://localhost:8080/building/selectcity/getstationinfo?stationid="+number,
    type: "get",
    contentType: "application/json",
    dataType: "json",
    success: function(message) {
        $("#tabletitle").find("tr").eq(0).find("td").eq(0).text(message.stationinfo.cityName);
        $("#tabletitle").find("tr").eq(0).find("td").eq(1).text(message.stationinfo.province);
        $("#tabletitle").find("tr").eq(0).find("td").eq(2).text(message.stationinfo.climates);
        $("#tabletitle").find("tr").eq(0).find("td").eq(3).text(message.stationinfo.longitude);
        $("#tabletitle").find("tr").eq(0).find("td").eq(4).text(message.stationinfo.latitude);
    },
    error: function() {
        
    }
    });
}
//根据下拉列表选择的参数显示对应的模块，隐藏其他模块
function showParamType(){
    var val=$("#paramtype option:checked").text();
    if(val=='自然通风设计室外计算参数'){
     
        $('#wind').show();
        $('#tabletitle').show();
        $('#typename').text('自然通风设计室外计算参数');
        $('#datainfo').attr('data-target','#wind-info');
        getwind();
        $('#standard').hide();
        $('#buildSun').hide();
        $('#hotSolidcontainer').hide();
        $('#nowarm').hide();
        $('#norm-head').hide();
        $('#left-nowarm').hide();
       
        $('#page').hide();
    }
    else if(val=='建筑遮阳设计室外计算参数'){
        $('#wind').hide();
        $('#buildSun').show();
        $('#norm-head').hide();
         $('#standard').hide();
         $('#hotSolidcontainer').hide();
        $('#typename').text('建筑遮阳设计室外计算参数');
        $('#datainfo').attr('data-target','#buildSun-info'); 
        getnosun();
        $('#nowarm').hide();
        $('#left-nowarm').hide();
        $('#page').hide();
    }
    else if(val=='围护结构隔热设计室外计算参数'){
        $('#wind').hide();
        $('#buildSun').hide();
        $('#standard').hide();
        $('#page').hide();
        $('#hotSolidcontainer').hide();
        $('#tabletitle').show();
        $('#nowarm').show();
        $('#left-nowarm').show();
        $('#norm-head').show();
        $('#typename').text('围护结构隔热设计室外计算参数');
        $('#datainfo').attr('data-target','#nowarm-info');
        gethot();
    }
    else if(val=='民用建筑热工设计规范附表参数'){
        $('#wind').hide();
        $('#buildSun').hide();
         $('#tabletitle').hide();
        $('#nowarm').hide();
        $('#left-nowarm').hide();
        $('#page').hide();
        $('#hotSolidcontainer').hide();
        $('#standard').show();
        $('#norm-head').hide();
        $('#typename').text('民用建筑热工设计规范附表参数');
        $('#datainfo').attr('data-target','#standard-info'); 
        getstandar();
    }
    else if(val=='围护结构热湿耦合计算室外计算参数'){
        $('#wind').hide();
        $('#buildSun').hide();
         $('#tabletitle').hide();
        $('#nowarm').hide();
        $('#left-nowarm').hide();
        $('#standard').hide();
        $('#norm-head').hide();
        $('#hotSolidcontainer').show();
        $('#page').show();
        $('#typename').text('围护结构热湿耦合计算室外计算参数');
        $('#datainfo').attr('data-target','#hotSolid-info'); 
        gethotsolid(1);
         
    }
}
//参数下拉列表改变时
function selChange(){
    showParamType();
}
//根据当前选择参数请求对应模块的数据
/*function getParamData(){
    console.log("getParamData11111");
    var value=$("#paramtype option:checked").text();
      if(value=='自然通风设计室外计算参数'){
        $('#datainfo').attr('data-target','#wind-info');
        getwind();
      }
      else if(value=='围护结构隔热设计室外计算参数'){
        $('#datainfo').attr('data-target','#nowarm-info');
        gethot();
      }
      else if(value=="民用建筑热工设计规范附表参数"){
        $('#datainfo').attr('data-target','#standard-info'); 
        getstandar();
      }
      else if(value=='建筑遮阳设计室外计算参数'){
        $('#datainfo').attr('data-target','#buildSun-info'); 
        getnosun();
      }
      else if(value=="围护结构热湿耦合计算室外计算参数"){
       $('#datainfo').attr('data-target','#hotSolid-info'); 
        gethotsolid(1);
         
      }
}*/
//自然通风设计室外参数
function getwind(){
    console.log($("#number option:checked").text());
    $.ajax({
        url:"http://localhost:8080/building/outdoorparm/getocpnvdById?id="+57036,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            if(message.ocpnvdinfo){
            $("#wind").find("tr").eq(0).find("td").eq(0).text(message.ocpnvdinfo.cvp);
            $("#wind").find("tr").eq(1).find("td").eq(0).text(message.ocpnvdinfo.cvd);
            $("#wind").find("tr").eq(2).find("td").eq(0).text(message.ocpnvdinfo.cvows);
            $("#wind").find("tr").eq(3).find("td").eq(0).text(message.ocpnvdinfo.cvorh);
            $("#wind").find("tr").eq(4).find("td").eq(0).text(message.ocpnvdinfo.cvot);
            $("#wind").find("tr").eq(5).find("td").eq(0).text(message.ocpnvdinfo.nvp);
            $("#wind").find("tr").eq(6).find("td").eq(0).text(message.ocpnvdinfo.nvd);
            $("#wind").find("tr").eq(7).find("td").eq(0).text(message.ocpnvdinfo.nvows);
            $("#wind").find("tr").eq(8).find("td").eq(0).text(message.ocpnvdinfo.nvorh);
            $("#wind").find("tr").eq(9).find("td").eq(0).text(message.ocpnvdinfo.nvot);
            }
        },
        error: function() {
            
        }
    });
}

//维护结构隔热设计室外计算参数
function gethot(){
    $.ajax({
        url:"http://localhost:8080/building/outdoorparm/getotmccById?id="+51747,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            if(message.otmccinfo){
                if($("#nowarm tr").eq(1)){
                    $("#nowarm tr").eq(1).remove();
                    $("#nowarm tr").eq(1).remove();
                    $("#nowarm tr").eq(1).remove();
                    $("#nowarm tr").eq(1).remove();
                    $("#nowarm tr").eq(1).remove();
                    $("#nowarm tr").eq(1).remove();
                } 
               
                var text1 = '<tr>',
                text2= "<tr>",
               text3="<tr><",
               text4="<tr>",
               text5="<tr>",
               text6="<tr>";
                for(var i=0;i<message.otmccinfo.length;i++){
                    text1+="<td>"+message.otmccinfo[i].outdoorAirTep+"</>";
                    text2+="<td>"+message.otmccinfo[i].horizontal+"</td>";
                    text3+="<td>"+message.otmccinfo[i].east+"</td>";
                    text4+="<td>"+message.otmccinfo[i].south+"</td>";
                    text5+="<td>"+message.otmccinfo[i].west+"</td>";
                    text6+="<td>"+message.otmccinfo[i].north+"</td>";
                  }
                    text1+="</tr>"
                    text2+="</tr>"
                    text3+="</tr>"
                    text4+="</tr>"
                    text5+="</tr>"
                    text6+="</tr>"
             
            
               
              $("#nowarm").append(text1+text2+text3+text4+text5+text6);
            } 
                
        },
        error: function() {
            
        }
    });
}
//民用建筑热工设计规范附表参数
function getstandar(){
     $.ajax({
        url:"http://localhost:8080/building/outdoorparm/gettdocbById?id="+57034,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
         
            if(message.tdocbInfo){
            $("#standard").find("tr").eq(0).find("td").eq(0).text($("#city option:checked").text());
            $("#standard").find("tr").eq(1).find("td").eq(0).text($("#province option:checked").text());
            $("#standard").find("tr").eq(2).find("td").eq(0).text($("#tabletitle").find("tr").eq(0).find("td").eq(2).text());
            $("#standard").find("tr").eq(3).find("td").eq(0).text(message.tdocbInfo.tminMT);
            $("#standard").find("tr").eq(4).find("td").eq(0).text(message.tdocbInfo.tmaxMT);
            $("#standard").find("tr").eq(5).find("td").eq(0).text(message.tdocbInfo.hdd);
            $("#standard").find("tr").eq(6).find("td").eq(0).text(message.tdocbInfo.cdd);
            $("#standard").find("tr").eq(7).find("td").eq(0).text(message.tdocbInfo.tw);
            $("#standard").find("tr").eq(8).find("td").eq(0).text(message.tdocbInfo.temin);
            $("#standard").find("tr").eq(9).find("td").eq(0).text(message.tdocbInfo.zd);
            $("#standard").find("tr").eq(10).find("td").eq(0).text(message.tdocbInfo.teave);
            $("#standard").find("tr").eq(11).find("td").eq(0).text(message.tdocbInfo.weave);
            $("#standard").find("tr").eq(12).find("td").eq(0).text(message.tdocbInfo.cld);
            $("#standard").find("tr").eq(13).find("td").eq(0).text(message.tdocbInfo.rsdH);
            $("#standard").find("tr").eq(14).find("td").eq(0).text(message.tdocbInfo.rsdWinter);
            $("#standard").find("tr").eq(15).find("td").eq(0).text(message.tdocbInfo.ted);
            $("#standard").find("tr").eq(16).find("td").eq(0).text(message.tdocbInfo.tey);
            $("#standard").find("tr").eq(17).find("td").eq(0).text(message.tdocbInfo.pre);
            }
        },
        error: function() {
            
        }
    });
}
//建筑遮阳设计室外计算参数
function getnosun(){
    $.ajax({
        url:"http://localhost:8080/building/outdoorparm/getasdoById?id="+57036,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
        
            if($("#buildSun tr").eq(1)){
                $("#buildSun tr").html('');
            }
            var text1="<tr><td colspan='3'>遮阳计算时段</td><td colspan='13'>"+message.startDayList[0].sunshadePeriodStart+"-"+message.startDayList[0].sunshadePeriodEnd+"</td></tr>",
            text2="<tr><th style='color:#8cc63e;text-align: center;' colspan='16'>遮阳计算时段起始日设计计算参数</th></tr>",
            text3="<tr><td colspan='3'>时刻</td><td >6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td >14</td><td>15</td><td >16</td><td>17</td><td>18</td></tr>",            
            text4="<tr><td colspan='3'>太阳高度角（°）</td>",
            text5="<tr><td colspan='3' >太阳方位角（°）</td>",
            text6="<tr><td colspan='3' >室外空气温度te（°C）</td>",
            text7="<tr><td rowspan='2' >水平</td><td colspan='2'>太阳总辐射I（W/m2）</td>",
            text8=" <tr><td colspan='2' >散射辐射Id（W/m2）</td>",
            text9=" <tr><td rowspan='2' >东向</td><td colspan='2'>太阳总辐射I（W/m2）</td>",
            text10="<tr><td colspan='2'>散射辐射Id（W/m2）</td>",
            text11=" <tr><td rowspan='2'>南向</td><td colspan='2'>太阳总辐射I（W/m2）</td>",
            text12="<tr><td colspan='2'>散射辐射Id（W/m2）</td>",
            text13=" <tr><td rowspan='2'>西向</td><td colspan='2'>太阳总辐射I（W/m2）</td>",
            text14="<tr><td colspan='2'>散射辐射Id（W/m2）</td>",
            text15="<tr><td rowspan='2'>北向</td><td colspan='2'>太阳总辐射I（W/m2）</td>",
            text16="<tr><td colspan='2'>散射辐射Id（W/m2）</td>",

            text17="<tr><th style='color:#8cc63e;text-align: center;' colspan='16'>遮阳计算时段终止日设计计算参数</th></tr>",
            text18=text3,
            
            text19=text4,
            text20=text5,
            text21=text6,
            text22=text7,
            text23=text8,
            text24=text9,
            text25=text10,
            text26=text11,
            text27=text12,
            text28=text13,
            text29=text14,
            text30=text15,
            text31=text16,
            
            text32="<tr><th style='color:#8cc63e;text-align: center;' colspan='16'>遮阳计算时段内的设计计算参数</th></tr>",
            text33=text3,
            text34=" <tr><td colspan='3'>室外空气温度逐日逐时平均值（°C）</td>",
            text35="<tr><td rowspan='10'>太阳辐射逐日逐时刻平均值（W/m2）</td><td rowspan='2'>水平</td><td>总辐射</td>",
            text36="<tr><td>散射辐射</td>",
            text37="<tr><td rowspan='2'>东向</td><td>总辐射</td>",
            text38=text36,
            text39="<tr><td rowspan='2'>南向</td><td>总辐射</td>",
            text40=text36,
            text41="<tr><td rowspan='2'>西向</td><td>总辐射</td>",
            text42=text36,
            text43="<tr><td rowspan='2'>北向</td><td>总辐射</td>",
            text44=text36;
            for(var i=0;i<message.startDayList.length;i++){
                text4+="<td>"+message.startDayList[i].solarAltitudeAngle+"</td>";
                text5+="<td>"+message.startDayList[i].solarAzimuthAngle+"</td>";
                text6+="<td>"+message.startDayList[i].outdoorAirTep+"</td>";
                text7+="<td>"+message.startDayList[i].horiI+"</td>";
                text8+="<td>"+message.startDayList[i].horiId+"</td>";
                text9+="<td>"+message.startDayList[i].eastI+"</td>";
                text10+="<td>"+message.startDayList[i].eastId+"</td>";
                text11+="<td>"+message.startDayList[i].soutI+"</td>";
                text12+="<td>"+message.startDayList[i].soutId+"</td>";
                text13+="<td>"+message.startDayList[i].westI+"</td>";
                text14+="<td>"+message.startDayList[i].westId+"</td>";
                text15+="<td>"+message.startDayList[i].nortI+"</td>";
                text16+="<td>"+message.startDayList[i].nortId+"</td>";
            }
            for(var j=0;j<message.endDayList.length;j++){
                text19+="<td>"+message.endDayList[j].solarAltitudeAngle+"</td>";
                text20+="<td>"+message.endDayList[j].solarAzimuthAngle+"</td>";
                text21+="<td>"+message.endDayList[j].outdoorAirTep+"</td>";
                text22+="<td>"+message.endDayList[j].horiI+"</td>";
                text23+="<td>"+message.endDayList[j].horiId+"</td>";
                text24+="<td>"+message.endDayList[j].eastI+"</td>";
                text25+="<td>"+message.endDayList[j].eastId+"</td>";
                text26+="<td>"+message.endDayList[j].soutI+"</td>";
                text27+="<td>"+message.endDayList[j].soutId+"</td>";
                text28+="<td>"+message.endDayList[j].westI+"</td>";
                text29+="<td>"+message.endDayList[j].westId+"</td>";
                text30+="<td>"+message.endDayList[j].nortI+"</td>";
                text31+="<td>"+message.endDayList[j].nortId+"</td>";
            }
            for(var k=0;k<message.middleDayList.length;k++){
                text34+="<td>"+message.middleDayList[k].aveValueOutairDayHour+"</td>";
                text35+="<td>"+message.middleDayList[k].horiI+"</td>";
                text36+="<td>"+message.middleDayList[k].horiId+"</td>";
                text37+="<td>"+message.middleDayList[k].eastI+"</td>";
                text38+="<td>"+message.middleDayList[k].eastId+"</td>";
                text39+="<td>"+message.middleDayList[k].soutI+"</td>";
                text40+="<td>"+message.middleDayList[k].soutId+"</td>";
                text41+="<td>"+message.middleDayList[k].westI+"</td>";
                text42+="<td>"+message.middleDayList[k].westId+"</td>";
                text43+="<td>"+message.middleDayList[k].nortI+"</td>";
                text44+="<td>"+message.middleDayList[k].nortId+"</td>";
            }
            $("#buildSun").append(text1+text2+text3+text4+"/tr"+text5+"/tr"+text6+"/tr"+text7+"/tr"+text8+"/tr"+text9+"/tr"+text10+"/tr"+text11+"/tr"+text12+"/tr"+text13+"/tr"
                +text14+"/tr"+text15+"/tr"+text16+"/tr"+text17+text18+text19+"/tr"+text20+"/tr"+text21+"/tr"+text22+"/tr"+text23+"/tr"+text24+"/tr"+text25+"/tr"+text26+"/tr"
                +text27+"/tr"+text28+"/tr"+text29+"/tr"+text30+"/tr"+text31+"/tr"+text32+text33+text34+"/tr"+text35+"/tr"+text36+"/tr"+text37+"/tr"+text38+"/tr"+text39+"/tr"
                +text40+"/tr"+text41+"/tr"+text42+"/tr"+text43+"/tr"+text44+"/tr");
        },
        error: function() {
            
        }
    });
}

//围护结构热湿耦合计算室外参数
function gethotsolid(pagenum){
     $.ajax({
        url:"http://localhost:8080/building/outdoorparm/getocpehhccById?id="+57489+"&pagenum="+pagenum,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
         
            total_page=message.totalpage;
            if($("#hotSolid tr").eq(1)){
                $("#hotSolid tr").html('');
            }
        //     var titletext="<tr style='background-color:white' height='30'><th style='text-align: center;width:10%'>时刻</th><th style='text-align: center;width:15%'>室外空气温度te(°C)</th><th style='text-align: center;width:15%'>相对湿度（%）</th><th style='text-align: center;width:15%'>降雨量（mm）</th><th style='text-align: center;width:15%'>风向</th><th style='text-align: center;width:15%'>风速（m/s）</th><th style='text-align: center;width:20%'>大气压力（Pa）</th></tr>"
        //    $("#hotSolid").append(titletext);
            var text;
           for(var i=0;i<message.currentpageList.length;i++){
                text='';
                text='<tr><td style="width:10%">'+message.currentpageList[i].time+"</td><td style='width:15%'>"+message.currentpageList[i].outdoorAirTemperature+"</td><td style='width:15%'>"+
                message.currentpageList[i].relativeHumidity+"</td><td style='width:15%'>"+message.currentpageList[i].rainfall+"</td><td style='width:15%'>"+
                message.currentpageList[i].windDirection+"</td><td style='width:15%'>"+message.currentpageList[i].windSpeed+"</td><td style='width:20%'>"+
                message.currentpageList[i].atmosphericPressure+"</td></tr>";
                $("#hotSolid").append(text);
           }
           paging(pagenum);
           $('#total').text('总页数 '+total_page+' 页');
        },
        error: function() {
            
        }
    });
}

//分页
var total_page;
function paging(pagenum) {
    console.log(total_page);
    var element = $("#grid_paging");
    var options = {
        bootstrapMajorVersion: 3,
        currentPage: pagenum,
        numberOfPages: 10,
        totalPages: total_page,
        onPageChanged: function(event, oldPage, newPage) {
            // 页面变化时触发更新内容
            // cbOk & cbOk(newPage);
            gethotsolid(newPage);
        }
    }
    element.bootstrapPaginator(options);
}
