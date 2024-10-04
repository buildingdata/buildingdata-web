function tableToExcel() {
    if ($("#selectparam option:selected").text() == "空调负荷极端年") {
        //要导出的json数据
        $.ajax({
            url: "/apis/building/meteorological/getExtrmeAirById?stationid=" + 53463,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (message) {
                console.log(message);
                //列标题，逗号隔开，每一个逗号就是隔开一个单元格
                let str = `台站号,日期,时刻,经度,维度,海拔,温度,大气压,相对湿度,风向,风速,干球温度,湿球温度,水平面太阳总辐射（W/㎡）,水平面散射（W/㎡）,法向直射（W/㎡）\n`;
                //增加\t为了不让表格显示科学计数法或者其他格式
                for (let i = 0; i < 8760; i++) {
                    for (let item in message.extremList[i]) {
                        str += `${message.extremList[i][item] + '\t'},`;
                    }
                    str += '\n';
                }
                //encodeURIComponent解决中文乱码
                let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
                //通过创建a标签实现
                let link = document.createElement("a");
                link.href = uri;
                //对下载的文件命名
                link.download = "空调负荷极端气象年表格数据.csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            error: function () {

            }
        });
    } else if ($("#selectparam option:selected").text() == "室内过热极端年") {
        //要导出的json数据
        $.ajax({
            url: "/apis/building/meteorological/getExtremInnerById?stationid=" + 53463,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            success: function (message) {
                console.log(message);
                //列标题，逗号隔开，每一个逗号就是隔开一个单元格
                let str = `台站号,日期,时刻,经度,维度,海拔,温度,大气压,相对湿度,风向,风速,干球温度,湿球温度,水平面太阳总辐射（W/㎡）,水平面散射（W/㎡）,法向直射（W/㎡）\n`;
                //增加\t为了不让表格显示科学计数法或者其他格式
                for (let i = 0; i < 8760; i++) {
                    for (let item in message.extremList[i]) {
                        str += `${message.extremList[i][item] + '\t'},`;
                    }
                    str += '\n';
                }
                //encodeURIComponent解决中文乱码
                let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
                //通过创建a标签实现
                let link = document.createElement("a");
                link.href = uri;
                //对下载的文件命名
                link.download = "室内过热极端年表格数据.csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            error: function () {

            }
        });
    }
    

}


//初始化
$.ajax({
    url: "/apis/building/selectcity/getstationinfo?stationid=" + 58321,
    type: "get",
    contentType: "application/json",
    dataType: "json",
    success: function(datainfo) {
        console.log(datainfo);
        $("#titletable").find("table").eq(0).find("tr").eq(0).find("td").eq(0).text(datainfo.stationinfo.longitude.toFixed(2));
        $("#titletable").find("table").eq(0).find("tr").eq(0).find("td").eq(1).text(datainfo.stationinfo.latitude.toFixed(2));
        $("#titletable").find("table").eq(0).find("tr").eq(0).find("td").eq(2).text(datainfo.stationinfo.altitude.toFixed(2));
    },
    error: function() {}
});

function alertData(){
    //alert(11111);
    $('#datainfo').attr('data-target', '#station-info');
}
//省份切换
function provinceSelected() {
    //获取切换省份后的城市信息
    $.ajax({
        url: "/apis/building/selectcity/getcitys?province=" + $("#province option:checked").text(),
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $('#city').empty();
            if (message.cityList.length > 0) {
                for (var i = 0; i < message.cityList.length; i++) {
                    $('#city').append('<option>' + message.cityList[i] + '</option>');
                }
                //获取当前城市的站点信息
                $.ajax({
                    url: "/apis/building/selectcity/getstations?city=" + $("#city option:checked").text(),
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    success: function(message) {
                        console.log(message);
                        $('#number').empty();
                        if (message.stationList.length > 0) {

                            $('#number').val(message.stationList[0]);

                        }
                        //站点的经度、维度、海拔和气候区
                        $.ajax({
                            url: "/apis/building/selectcity/getstationinfo?stationid=" + document.getElementById('number').value,
                            type: "get",
                            contentType: "application/json",
                            dataType: "json",
                            success: function(message) {
                                $('#longitude').val(message.stationinfo.longitude.toFixed(2));
                                $('#latitude').val(message.stationinfo.latitude.toFixed(2));
                                $('#altitude').val(message.stationinfo.altitude.toFixed(2));
                                $('#climates').val(message.stationinfo.climates)
                                $("#titletable").find("table").eq(0).find("tr").eq(0).find("td").eq(0).text(message.stationinfo.longitude.toFixed(2));
                                $("#titletable").find("table").eq(0).find("tr").eq(0).find("td").eq(1).text(message.stationinfo.latitude.toFixed(2));
                                $("#titletable").find("table").eq(0).find("tr").eq(0).find("td").eq(2).text(message.stationinfo.altitude.toFixed(2));
                            },
                            error: function() {

                            }
                        });
                    },
                    error: function() {

                    }
                });
            }

        },
        error: function() {

        }
    });
}

//城市切换
function citySelected() {
    //获取当前城市的站点信息
    $.ajax({
        url: "/apis/building/selectcity/getstations?city=" + $("#city option:checked").text(),
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(message) {
            console.log(message);
            $('#number').empty();
            if (message.stationList.length > 0) {

                $('#number').val(message.stationList[0]);

            }
            //站点的经度、维度、海拔和气候区
            $.ajax({
                url: "/apis/building/selectcity/getstationinfo?stationid=" + document.getElementById('number').value,
                type: "get",
                contentType: "application/json",
                dataType: "json",
                success: function(message) {
                    $('#longitude').val(message.stationinfo.longitude.toFixed(2));
                    $('#latitude').val(message.stationinfo.latitude.toFixed(2));
                    $('#altitude').val(message.stationinfo.altitude.toFixed(2));
                    $('#climates').val(message.stationinfo.climates)
                    $("#titletable").find("table").eq(0).find("tr").eq(0).find("td").eq(0).text(message.stationinfo.longitude.toFixed(2));
                    $("#titletable").find("table").eq(0).find("tr").eq(0).find("td").eq(1).text(message.stationinfo.latitude.toFixed(2));
                    $("#titletable").find("table").eq(0).find("tr").eq(0).find("td").eq(2).text(message.stationinfo.altitude.toFixed(2));
                },
                error: function() {

                }
            });
        },
        error: function() {

        }
    });
}

// 初始化页面，显示空调负荷极端年一月一号的数据
function initialdata() {
    let tableareaAir = $("#tableareaAir");

    $.ajax({
        url: "/apis/building/meteorological/getExtrmeAirById?stationid=" + 53463,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(datalist) {
            for (let i = 0; i < 24; i++) {
                tableareaAir.append("<tr><td>1999年</td><td>1月</td><td>1号</td><td>" + i + "点" + "</td><td>" + datalist.extremList[i].temperature + "</td><td>" + datalist.extremList[i].pressure + "</td><td>" + datalist.extremList[i].relHumidity + "</td><td>" + datalist.extremList[i].winDirection + "</td><td>" + datalist.extremList[i].winSpeed + "</td><td>" + datalist.extremList[i].dewTemperature + "</td><td>" + datalist.extremList[i].wetTemperature + "</td><td>" + datalist.extremList[i].th + "</td><td>" + datalist.extremList[i].df + "</td><td>" + datalist.extremList[i].nr + "</td></tr>");
            }
             // 获取数据中有哪些年有数据
             let years = new Array();
             let k = 0;
             let yeartext = "";
             for (let i = 1; i < datalist.extremList.length; i++) {
                 years[k] = datalist.extremList[i].date.substring(0, 4);
                 if (datalist.extremList[i].date.substring(0, 4) != datalist.extremList[i-1].date.substring(0, 4)) {
                     k++;
                     years[k] = datalist.extremList[i].date.substring(0, 4);
                 }
             }
             for (let j = 0; j < years.length; j++) {
                 yeartext += "<option>" + years[j] + "</option>"
                 // console.log(years[j]);
             }
             $("#selectyearAir").append(yeartext);

        },
        error: function() {
            alert("请求失败");
        }
    });
}
initialdata();

// 初始化室内过热极端年页面，显示室内过热极端年一月一号的数据
function initialdataexheat() {
    let tableareaInner = $("#tableareaInner");

    $.ajax({
        url: "/apis/building/meteorological/getExtremInnerById?stationid=" + 53463,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (datalist) {
            for (let i = 0; i < 24; i++) {
                tableareaInner.append("<tr><td>1999年</td><td>1月</td><td>1号</td><td>" + i + "点" + "</td><td>" + datalist.extremList[i].temperature + "</td><td>" + datalist.extremList[i].pressure + "</td><td>" + datalist.extremList[i].relHumidity + "</td><td>" + datalist.extremList[i].winDirection + "</td><td>" + datalist.extremList[i].winSpeed + "</td><td>" + datalist.extremList[i].dewTemperature + "</td><td>" + datalist.extremList[i].wetTemperature + "</td><td>" + datalist.extremList[i].th + "</td><td>" + datalist.extremList[i].df + "</td><td>" + datalist.extremList[i].nr + "</td></tr>");
            }
             // 获取数据中有哪些年有数据
             let years = new Array();
             let k = 0;
             let yeartext = "";
            for (let i = 1; i < datalist.extremList.length; i++) {
                years[k] = datalist.extremList[i].date.substring(0, 4);
                if (datalist.extremList[i].date.substring(0, 4) != datalist.extremList[i - 1].date.substring(0, 4)) {
                    k++;
                    years[k] = datalist.extremList[i].date.substring(0, 4);
                }
             }
             for (let j = 0; j < years.length; j++) {
                 yeartext += "<option>" + years[j] + "</option>"
                 // console.log(years[j]);
             }
             $("#selectyearInner").append(yeartext);

        },
        error: function () {
            alert("请求失败");
        }
    });
}

// 选择参数（空调负荷极端年、室内过热极端年）
function chooseParams() {
    if ($("#selectparam option:selected").text() == "空调负荷极端年") {
        $("#tableareaAir").show();
        $("#tableareaInner").hide();
    } else if ($("#selectparam option:selected").text() == "室内过热极端年") {
        $("#tableareaAir").hide();
        initialdataexheat();
        $("#tableareaInner").show();
    }

}

// 不知道到底有哪些年份有数据啊
// 选择年（根据选择的年份确定是不是偶数年，确定每个月的天数）
function chooseYear() {
    let yeartext = $("#selectyearAir option:selected").text();
}




// 空调负荷极端年选择日月(包括根据月份确定每个月的天数)
function ChooseDateAir() {
    let monthtext = $("#selectmonthAir option:selected").text();
    let month = $("#selectmonthAir option:selected");
    let daytext = $("#selectdayAir option:selected").text();
    let dayselected = $("#selectdayAir option:selected");
    let day = $("#selectdayAir");
    let tableareaAir = $("#tableareaAir");
    let dateval = "";
    let sourceDate = "";
    let times = new Array();
    let j = 0;
    if (parseInt(month.val()) < 10 && parseInt(dayselected.val()) < 10) {
        dateval = 1999 + "-0" + month.val() + "-0" + dayselected.val();
    } else if (parseInt(month.val()) < 10) {
        dateval = 1999 + "-0" + month.val() + "-" + dayselected.val();
    } else if (parseInt(dayselected.val()) < 10) {
        dateval = 1999 + "-" + month.val() + "-0" + dayselected.val();
    } else {
        dateval = 1999 + "-" + month.val() + "-" + dayselected.val();
    }
    console.log(dateval);
    if (monthtext == "2月") {
        console.log(monthtext);
        // day.empty();
        for (let i = 1; i <= 28; i++) {
            day.append("<option value='" + i + "'>" + i + "号" + "</option>");
        }
    } else if (monthtext == "1月" || monthtext == "3月" || monthtext == "5月" || monthtext == "7月" || monthtext == "8月" || monthtext == "10月" || monthtext == "12月") {
        // day.empty();
        console.log(monthtext);
        for (let i = 1; i <= 31; i++) {
            day.append("<option value='" + i + "'>" + i + "号" + "</option>");
        }
    } else if (monthtext == "4月" || monthtext == "6月" || monthtext == "9月" || monthtext == "11月") {
        // day.empty();
        console.log(monthtext);
        for (let i = 1; i <= 30; i++) {
            day.append("<option value='" + i + "'>" + i + "号" + "</option>");
        }
    }
    $.ajax({
        url: "/apis/building/meteorological/getExtrmeAirById?stationid=" + 53463,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(datalist) {
            console.log(datalist.extremList);

            console.log(daytext);

            for (let i = 0; i < datalist.extremList.length; i++) {
                sourceDate = datalist.extremList[i].date.substring(0, 10);
                // sourceDate = sourceDate.substring(0, 10);
                if (dateval === sourceDate) {
                    times[j] = datalist.extremList[i];
                    // console.log(times[j]);
                    j++;
                }
                // console.log(sourceDate);
            }
            for (let i = 0; i < 24; i++) {
                console.log(times[i]);
            }
            tableareaAir.find("tr").eq(0).nextAll().remove();
            for (let i = 0; i < 24; i++) {
                tableareaAir.append("<tr><td>1999年</td><td>" + monthtext + "</td><td>" + daytext + "</td><td>" + i + "点" + "</td><td>" + times[i].temperature + "</td><td>" + times[i].pressure + "</td><td>" + times[i].relHumidity + "</td><td>" + times[i].winDirection + "</td><td>" + times[i].winSpeed + "</td><td>" + times[i].dewTemperature + "</td><td>" + times[i].wetTemperature + "</td><td>" + times[i].th + "</td><td>" + times[i].df + "</td><td>" + times[i].nr + "</td></tr>");
            }

        },
        error: function() {
            alert("请求失败");
        }
    });
}

// 空调负荷极端年选择日
function chooseDayAir() {
    let monthtext = $("#selectmonthAir option:selected").text();
    let month = $("#selectmonthAir option:selected");
    let daytext = $("#selectdayAir option:selected").text();
    let dayselected = $("#selectdayAir option:selected");
    let tableareaAir = $("#tableareaAir");
    let dateval = "";
    let times = new Array();
    let j = 0;
    if (parseInt(month.val()) < 10 && parseInt(dayselected.val()) < 10) {
        dateval = 1999 + "-0" + month.val() + "-0" + dayselected.val();
    } else if (parseInt(month.val()) < 10) {
        dateval = 1999 + "-0" + month.val() + "-" + dayselected.val();
    } else if (parseInt(dayselected.val()) < 10) {
        dateval = 1999 + "-" + month.val() + "-0" + dayselected.val();
    } else {
        dateval = 1999 + "-" + month.val() + "-" + dayselected.val();
    }
    console.log(dateval);
    $.ajax({
        url: "/apis/building/meteorological/getExtrmeAirById?stationid=" + 53463,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(datalist) {
            for (let i = 0; i < datalist.extremList.length; i++) {
                sourceDate = datalist.extremList[i].date.substring(0, 10);
                // sourceDate = sourceDate.substring(0, 10);
                if (dateval === sourceDate) {
                    times[j] = datalist.extremList[i];
                    // console.log(times[j]);
                    j++;
                }
                // console.log(sourceDate);
            }
            tableareaAir.find("tr").eq(0).nextAll().remove();
            for (let i = 0; i < 24; i++) {
                tableareaAir.append("<tr><td>1999年</td><td>" + monthtext + "</td><td>" + daytext + "</td><td>" + i + "点" + "</td><td>" + times[i].temperature + "</td><td>" + times[i].pressure + "</td><td>" + times[i].relHumidity + "</td><td>" + times[i].winDirection + "</td><td>" + times[i].winSpeed + "</td><td>" + times[i].dewTemperature + "</td><td>" + times[i].wetTemperature + "</td><td>" + times[i].th + "</td><td>" + times[i].df + "</td><td>" + times[i].nr + "</td></tr>");
            }
        },
        error: function() {
            alert("请求失败");
        }
    });
}

// 室内过热极端年选择日期
function ChooseDateInner() {
    let monthtext = $("#selectmonthInner option:selected").text();
    let month = $("#selectmonthInner option:selected");
    let daytext = $("#selectdayInner option:selected").text();
    let dayselected = $("#selectdayInner option:selected");
    let day = $("#selectdayInner");
    let tableareaInner = $("#tableareaInner");
    let dateval = "";
    let sourceDate = "";
    let times = new Array();
    let j = 0;
    if (parseInt(month.val()) < 10 && parseInt(dayselected.val()) < 10) {
        dateval = 1999 + "-0" + month.val() + "-0" + dayselected.val();
    } else if (parseInt(month.val()) < 10) {
        dateval = 1999 + "-0" + month.val() + "-" + dayselected.val();
    } else if (parseInt(dayselected.val()) < 10) {
        dateval = 1999 + "-" + month.val() + "-0" + dayselected.val();
    } else {
        dateval = 1999 + "-" + month.val() + "-" + dayselected.val();
    }
    console.log(dateval);
    if (monthtext == "2月") {
        console.log(monthtext);
        // day.empty();
        for (let i = 1; i <= 28; i++) {
            day.append("<option value='" + i + "'>" + i + "号" + "</option>");
        }
    } else if (monthtext == "1月" || monthtext == "3月" || monthtext == "5月" || monthtext == "7月" || monthtext == "8月" || monthtext == "10月" || monthtext == "12月") {
        // day.empty();
        console.log(monthtext);
        for (let i = 1; i <= 31; i++) {
            day.append("<option value='" + i + "'>" + i + "号" + "</option>");
        }
    } else if (monthtext == "4月" || monthtext == "6月" || monthtext == "9月" || monthtext == "11月") {
        // day.empty();
        console.log(monthtext);
        for (let i = 1; i <= 30; i++) {
            day.append("<option value='" + i + "'>" + i + "号" + "</option>");
        }
    }
    $.ajax({
        url: "/apis/building/meteorological/getExtremInnerById?stationid=" + 53463,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(datalist) {
            console.log(datalist.extremList);

            console.log(daytext);

            for (let i = 0; i < datalist.extremList.length; i++) {
                sourceDate = datalist.extremList[i].date.substring(0, 10);
                // sourceDate = sourceDate.substring(0, 10);
                if (dateval === sourceDate) {
                    times[j] = datalist.extremList[i];
                    // console.log(times[j]);
                    j++;
                }
                // console.log(sourceDate);
            }
            for (let i = 0; i < 24; i++) {
                console.log(times[i]);
            }
            tableareaInner.find("tr").eq(0).nextAll().remove();
            for (let i = 0; i < 24; i++) {
                tableareaInner.append("<tr><td>1999年</td><td>" + monthtext + "</td><td>" + daytext + "</td><td>" + i + "点" + "</td><td>" + times[i].temperature + "</td><td>" + times[i].pressure + "</td><td>" + times[i].relHumidity + "</td><td>" + times[i].winDirection + "</td><td>" + times[i].winSpeed + "</td><td>" + times[i].dewTemperature + "</td><td>" + times[i].wetTemperature + "</td><td>" + times[i].th + "</td><td>" + times[i].df + "</td><td>" + times[i].nr + "</td></tr>");
            }

        },
        error: function() {
            alert("请求失败");
        }
    });
}

function chooseDayInner() {
    let monthtext = $("#selectmonthInner option:selected").text();
    let month = $("#selectmonthInner option:selected");
    let daytext = $("#selectdayInner option:selected").text();
    let dayselected = $("#selectdayInner option:selected");
    let tableareaInner = $("#tableareaInner");
    let dateval = "";
    let times = new Array();
    let j = 0;
    if (parseInt(month.val()) < 10 && parseInt(dayselected.val()) < 10) {
        dateval = 1999 + "-0" + month.val() + "-0" + dayselected.val();
    } else if (parseInt(month.val()) < 10) {
        dateval = 1999 + "-0" + month.val() + "-" + dayselected.val();
    } else if (parseInt(dayselected.val()) < 10) {
        dateval = 1999 + "-" + month.val() + "-0" + dayselected.val();
    } else {
        dateval = 1999 + "-" + month.val() + "-" + dayselected.val();
    }
    console.log(dateval);
    $.ajax({
        url: "/apis/building/meteorological/getExtremInnerById?stationid=" + 53463,
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function(datalist) {
            for (let i = 0; i < datalist.extremList.length; i++) {
                sourceDate = datalist.extremList[i].date.substring(0, 10);
                // sourceDate = sourceDate.substring(0, 10);
                if (dateval === sourceDate) {
                    times[j] = datalist.extremList[i];
                    // console.log(times[j]);
                    j++;
                }
                // console.log(sourceDate);
            }
            tableareaInner.find("tr").eq(0).nextAll().remove();
            for (let i = 0; i < 24; i++) {
                tableareaInner.append("<tr><td>1999年</td><td>" + monthtext + "</td><td>" + daytext + "</td><td>" + i + "点" + "</td><td>" + times[i].temperature + "</td><td>" + times[i].pressure + "</td><td>" + times[i].relHumidity + "</td><td>" + times[i].winDirection + "</td><td>" + times[i].winSpeed + "</td><td>" + times[i].dewTemperature + "</td><td>" + times[i].wetTemperature + "</td><td>" + times[i].th + "</td><td>" + times[i].df + "</td><td>" + times[i].nr + "</td></tr>");
            }
        },
        error: function() {
            alert("请求失败");
        }
    });
}


// 日期选择器datepicker
// $("#").on("click", function() {
// $("#").datepicker({
//     format: 'yyyy-mm-dd',
//     language: 'zh-CN',
//     todayHighlight: true,
//     autoclose: true,
//     todayBtn: "linked",
//     showMeridian: 1
// });
// setInterval(function() {
//     let selectdate = $("#").datepicker("getDate");
//     console.log(selectdate);
// }, 5000)

// });