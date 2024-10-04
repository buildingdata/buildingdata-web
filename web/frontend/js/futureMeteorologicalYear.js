function tableToExcel(){
    let type =   $("#selectparam option:selected").text();
    var month = $("#selectmonthAir option:selected").text();
    var daySelect = $("#selectdayAir option:selected").text();
      //要导出的json数据
      $.ajax({
        url:"/apis/building/meteorological/getFutureById?id=" + document.getElementById('number').value+"&type="+type+"&month="+month+"&day="+daySelect,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
           if(message.futureList.length==0) alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。')
           else{
                //列标题，逗号隔开，每一个逗号就是隔开一个单元格
                let str = `类型,台站号,月,日,时刻,大气压,干球温度,露点温度,相对湿度,水平面太阳总辐射,法向直射辐射,水平面散射辐射,风向,风速,云量\n`;
                //增加\t为了不让表格显示科学计数法或者其他格式
                for(let i = 0 ; i < message.futureList.length ; i++ ){
                    str+= `${type+'\t'},`
                for(let item in message.futureList[i]){
                    str+=`${message.futureList[i][item] + '\t'},`;     
                }
                str+='\n';
                }
                //encodeURIComponent解决中文乱码
                let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
                //通过创建a标签实现
                let link = document.createElement("a");
                link.href = uri;
                //对下载的文件命名
                link.download =  "未来气象年表格数据.csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
           }
            
        },
        error: function() {
            
        }
    });    
    }
  function alertData(){
    //alert(11111);
    $('#datainfo').attr('data-target', '#station-info');
}
function initialdata(type,id) {
    let tableareaAir = $("#tableareaAir"); 
    let day = $("#selectdayAir"); 
    for (let i = 2; i <= 31; i++) {
        day.append("<option value='" + i + "'>" + i + "日" + "</option>");
    }
    $("#selectdayAir option:selected").text("1日");
    var month = $("#selectmonthAir option:selected").text();
    var daySelect = $("#selectdayAir option:selected").text();
  $.ajax({
      url: "/apis/building/meteorological/getFutureById?id=" + id+"&type="+type+"&month="+month+"&day="+daySelect,
      type: "get",
      contentType: "application/json",
      dataType: "json",
      success: function(datalist) {
          if(datalist.futureList.length ==0 ){
              alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。')
              $("#tableareaAir").hide()

          } else{

              $("#tableareaAir").show()
              for(let i=0;i<24;i++){
                tableareaAir.append("<tr><td>"+datalist.futureList[i].month+"月"+"</td><td>"+datalist.futureList[i].day+"日"+"</td><td>" + datalist.futureList[i].time + "点" + "</td><td>" + datalist.futureList[i].pressure + "</td><td>" + datalist.futureList[i].relativeSolid + "</td><td>" + datalist.futureList[i].windDirection + "</td><td>" + datalist.futureList[i].windSpeed + "</td><td>" + datalist.futureList[i].dryTemper + "</td><td>" + datalist.futureList[i].pointTemper + "</td><td>" + datalist.futureList[i].sunSumRadiation + "</td><td>" + datalist.futureList[i].scatterRadiation + "</td><td>" + datalist.futureList[i].directRadiation + "</td><td>" + datalist.futureList[i].cloudiness + "</td></tr>");

              }
          }
          
      },
      error: function() {
          alert("请求失败");
      }
  });
}


// 选择参数（空调负荷极端年、室内过热极端年）
function chooseParams() {
 type = $("#selectparam option:selected").text() 
 let day = $("#selectdayAir"); 
    for (let i = 2; i <= 31; i++) {
        day.append("<option value='" + i + "'>" + i + "日" + "</option>");
    }
    $("#selectdayAir option:selected").text("1日");
    var month = $("#selectmonthAir option:selected").text();
    var daySelect = $("#selectdayAir option:selected").text();
    let stationId = document.getElementById('number').value;
    getTableInfo(type,month,daySelect,stationId);
}


//包括根据月份确定每个月的天数
function ChooseDateAir() {
    let day = $("#selectdayAir");
    let monthtext = $("#selectmonthAir option:selected").text()
    let typeText = $("#selectparam option:selected").text();
    let dayselected = "1日"
    $('#selectdayAir').empty(); 
   if (monthtext == "1月" || monthtext == "3月" || monthtext == "5月" || monthtext == "7月" || monthtext == "8月" || monthtext == "10月" || monthtext == "12月") {      
    for (let i = 1; i <= 31; i++) {       
            day.append("<option value='" + i + "'>" + i + "日" + "</option>");
        }
    }
    else if(monthtext == "4月" || monthtext == "6月" || monthtext == "9月" || monthtext == "11月") {    
       
        for (let i = 1; i <= 30; i++) {      
            day.append("<option value='" + i + "'>" + i + "日" + "</option>");
        }
    }
    else if(monthtext=="2月"){  
      
        for (let i = 1; i <= 28; i++) {       
            day.append("<option value='" + i + "'>" + i + "日" + "</option>");
        }
    }
    $("#selectdayAir option:selected").text("1日");
    let stationId = document.getElementById('number').value;
    getTableInfo(typeText,monthtext,dayselected,stationId);
}

function chooseDayAir(){
    let monthtext = $("#selectmonthAir option:selected").text()
    let typeText = $("#selectparam option:selected").text();
    let day =  $("#selectdayAir option:selected").text();
    let stationId = document.getElementById('number').value;
    getTableInfo(typeText,monthtext,day,stationId);
}
function getTableInfo(type,monthselect,daySelect,id){
    let tableareaAir = $("#tableareaAir"); 
  $.ajax({
      url: "/apis/building/meteorological/getFutureById?id=" + id+"&type="+type+"&month="+monthselect+"&day="+daySelect,
      type: "get",
      contentType: "application/json",
      dataType: "json",
      success: function(datalist) {
 	      console.log(id,datalist)
          let i=2;
 	      if(datalist.futureList.length==0){

              $("#tableareaAir").hide()
          }else {
              $("#tableareaAir").show()
              console.log(datalist.futureList)

              for(let j=0;j<24;j++){
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(0).text(datalist.futureList[j].month+"月");
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(1).text(datalist.futureList[j].day+"日");
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(2).text(datalist.futureList[j].time+ "点");
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(3).text(datalist.futureList[j].pressure);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(4).text(datalist.futureList[j].relativeSolid);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(5).text(datalist.futureList[j].windDirection);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(6).text(datalist.futureList[j].windSpeed);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(7).text(datalist.futureList[j].dryTemper);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(8).text(datalist.futureList[j].pointTemper);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(9).text(datalist.futureList[j].sunSumRadiation);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(10).text(datalist.futureList[j].scatterRadiation);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(11).text(datalist.futureList[j].directRadiation);
                  $("#tableareaAir").find("tr").eq(i).find("td").eq(12).text(datalist.futureList[j].cloudiness);
                  i++;
              }
          }



          
      },
      error: function() {
          alert("请求失败");
      }
  }); 
}

function getData(province,city,station_id){
    var id  = document.getElementById('number').value
    var type =  $("#selectparam option:selected").text();
    $('#selectdayAir').empty(); 
    let day = $("#selectdayAir"); 
    for (let i = 2; i <= 31; i++) {
        day.append("<option value='" + i + "'>" + i + "日" + "</option>");
    }
    $("#selectdayAir option:selected").text("1日");
    var month = $("#selectmonthAir option:selected").text();
    var daySelect = $("#selectdayAir option:selected").text();
  $.ajax({
      url: "/apis/building/meteorological/getFutureById?id=" + id+"&type="+type+"&month="+month+"&day="+daySelect,
      type: "get",
      contentType: "application/json",
      dataType: "json",
      success: function(datalist) {
          if(datalist.futureList.length ==0 ){
              alert('该站点目前无该参数数据，各参数已包含的站点列表请查看功能页面右侧的数据说明文档。')

              $("#tableareaAir").hide()

          }
          else{
              $("#tableareaAir").show()
              Global_province =  $("#province option:selected").text()
              Global_city = $("#city option:selected").text()
              Global_station_id=id
              getAlititude()
              let i=2;
              for(let j=0;j<24;j++){
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(0).text(datalist.futureList[j].month+"月");
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(1).text(datalist.futureList[j].day+"日");
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(2).text(datalist.futureList[j].time+ "点");
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(3).text(datalist.futureList[j].pressure);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(4).text(datalist.futureList[j].relativeSolid);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(5).text(datalist.futureList[j].windDirection);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(6).text(datalist.futureList[j].windSpeed);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(7).text(datalist.futureList[j].dryTemper);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(8).text(datalist.futureList[j].pointTemper);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(9).text(datalist.futureList[j].sunSumRadiation);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(10).text(datalist.futureList[j].scatterRadiation);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(11).text(datalist.futureList[j].directRadiation);
                    $("#tableareaAir").find("tr").eq(i).find("td").eq(12).text(datalist.futureList[j].cloudiness);
                    i++;     
               }
          }
          
      },
      error: function() {
          alert("请求失败");
      }
  }); 
}
