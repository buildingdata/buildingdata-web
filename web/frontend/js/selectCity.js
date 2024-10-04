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
