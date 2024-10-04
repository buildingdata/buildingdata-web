//ScrollWheelZoom用于控制是否启用地图滚轮放大缩小；
//Keyboard用于控制启用键盘上下左右键移动地图；
function mapStart(centerCity, zoom, minZoomLevel, maxZoomLevel, showLevel, ScrollWheelZoom, Keyboard) {
    //创建和初始化地图函数：
    function initMap() {
        createMap(centerCity, zoom, minZoomLevel, maxZoomLevel, showLevel); //创建地图
        setMapEvent(ScrollWheelZoom, Keyboard); //设置地图事件
        addMapControl(); //向地图添加控件
        MarkerBuilding(1); //访问查询一级台站信息并保存
        zooming(); //添加地图级别监视展示台站信息事件

    }

    //创建地图函数：
    function createMap(centerCity, zoom, minZoomLevel, maxZoomLevel, showLevel) {
        var map = new BMap.Map("dituContent", {
            minZoom: minZoomLevel,
            maxZoom: maxZoomLevel
        }); //在百度地图容器中创建一个地图
        // var point = new BMap.Point(104.05997, 38.81127); //定义一个中心点坐标
        map.centerAndZoom(centerCity, zoom); //设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map; //将map变量存储在全局

        //城市搜索定位功能
        var searchBtn = document.getElementById('search-btn'),
            searchInfo = document.getElementById("suggestId");
        // console.log("searchBtn"+searchBtn+"searchInfo"+searchInfo);
        citySearch(searchBtn, searchInfo);


        //地图样式,例如不显示铁路等。
        var myStyleJson = [];
        switch (showLevel) {
            case 0: //0级：全部显示
                console.log("这是0级");
                break;
            case 1: //1级：不显示兴趣标注点
                console.log("这是1级");
                myStyleJson.push({
                    "featureType": "poilabel", //兴趣点——全部兴趣标注点显示
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "poilabel", //兴趣点——全部兴趣标注点图标显示
                    "elementType": "labels.icon",
                    "stylers": {
                        "visibility": "off"
                    }
                });
                break;
            case 2: //2级：不显示地铁和铁路
                console.log("这是2级");
                myStyleJson.push({
                    "featureType": "subway", //道路——地铁显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "railway", //道路——铁路显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                });
                break;
            case 3: //3级：不显示地铁、铁路以及城市及以下道路和标注点
                console.log("这是3级");
                myStyleJson.push({
                    "featureType": "tertiaryway", //道路——三级道路显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "fourlevelway", //道路——四级道路显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "local", //道路——内部道路显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "scenicspotsway", //道路——景区内部道路显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "universityway", //道路——高校内部道路显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "vacationway", //道路——度假地内部道路显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "highwaysign", //道路——高速公路标牌显示
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "subwaylabel", //道路——地铁标牌显示
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "tertiarywaysign", //道路——县道标牌显示
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "poilabel", //兴趣点——全部兴趣标注点显示
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "poilabel", //兴趣点——全部兴趣标注点图标显示
                    "elementType": "labels.icon",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "subway", //道路——地铁显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "railway", //道路——铁路显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "subwaystation", //地图背景——地铁设施显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                });
                break;
            case 4: //4级：不显示任何背景、道路和标注点
                console.log("这是4级");
                myStyleJson.push({
                    "featureType": "road", //道路——全部道路显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "background", //地图背景——所有背景面显示
                    "elementType": "geometry",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "poilabel", //兴趣点——全部兴趣标注点显示
                    "elementType": "labels",
                    "stylers": {
                        "visibility": "off"
                    }
                }, {
                    "featureType": "poilabel", //兴趣点——全部兴趣标注点图标显示
                    "elementType": "labels.icon",
                    "stylers": {
                        "visibility": "off"
                    }
                });
        }
        map.setMapStyle({
            styleJson: myStyleJson
        });
    }

    //城市搜索定位功能函数
    function citySearch(searchBtn, searchInfo) {
        // console.log("searchBtn"+searchBtn+"searchInfo"+searchInfo);
        var _searchBtn = searchBtn;
        var local = null;
        _searchBtn.addEventListener("click", function () { //点击搜索
            local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(searchInfo.value);
        });

        function myFun() {
            var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 9);
            console.log("ZooM是这个：" + map.getZoom());
        };
    }

    //地图事件设置函数：
    function setMapEvent(ScrollWheelZoom) {
        map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
        console.log(ScrollWheelZoom);
        if (ScrollWheelZoom == true || ScrollWheelZoom == undefined) {
            map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        }
        map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
        if (Keyboard == true || Keyboard == undefined) {
            map.enableKeyboard(); //启用键盘上下左右键移动地图
        }

    }

    //地图控件添加函数：
    function addMapControl() {
        // //向地图中添加缩放控件
        // var ctrl_nav = new BMap.NavigationControl({
        //     anchor: BMAP_ANCHOR_TOP_LEFT,
        //     type: BMAP_NAVIGATION_CONTROL_LARGE
        // });

        // map.addControl(ctrl_nav);
        // //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT
        });
        map.addControl(ctrl_sca);
    }



    //标注点数组,数据库查询所得的json数组数据
    var markerListl1 = [] //一级标注集合
    var markerListl2 = [] //二级标注集合
    var markerListl3 = [] //三级标注集合
    var markerListlM1 = new Array(); //一级标注集合
    var markerListlM2 = new Array(); //二级标注集合
    var markerListlM3 = new Array(); //三级标注集合

    var _level = 1;

    //创建InfoWindow
    function createInfoWindow(i) {
        if (_level == 1) {
            var json = markerListl1[i];
            var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.stationId + "'>" +
                json.stationId + "</b><div class='iw_poi_content'>" + json.province + "<br/>" + json
                .cityName + "<br/>" + "气候区属是" + json.climates + "<br/>" + "纬度是" + json.latitude +
                "<br/>" + "经度是" + json.longitude + "<br/>" + "海拔是" + json.altitude + "</div>");
            return iw;
        } else {
            if (_level == 2) {
                var json = markerListl2[i];
                var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.stationId + "'>" +
                    json.stationId + "</b><div class='iw_poi_content'>" + json.province + "<br/>" + json
                    .cityName + "<br/>" + "气候区属是" + json.climates + "<br/>" + "纬度是" + json.latitude +
                    "<br/>" + "经度是" + json.longitude + "<br/>" + "海拔是" + json.altitude + "</div>");
                return iw;
            } else {
                if (_level == 3) {
                    var json = markerListl3[i];
                    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.stationId + "'>" +
                        json.stationId + "</b><div class='iw_poi_content'>" + json.province + "<br/>" + json
                        .cityName + "<br/>" + "气候区属是" + json.climates + "<br/>" + "纬度是" + json.latitude +
                        "<br/>" + "经度是" + json.longitude + "<br/>" + "海拔是" + json.altitude + "</div>");
                    return iw;
                }
            }
        }
    }

    //1级台站的图标设置(w和h是大小，l和t是位置)
    var stationiconL1 = {
        w: 23,
        h: 25,
        l: 0,
        t: 25 * 11,
        x: 0,
        lb: 5
    };
    //2级台站的图标设置(w和h是大小，l和t是位置)
    var stationiconL2 = {
        w: 18,
        h: 25,
        l: 0,
        t: 22,
        x: 0,
        lb: 5
    };
    //3级台站的图标设置(w和h是大小，l和t是位置)
    var stationiconL3 = {
        w: 18,
        h: 25,
        l: 18,
        t: 23,
        x: 0,
        lb: 5
    };
    //创建一个1级台站的Icon（标注点图片为红色圆点）
    function createIconL1(json) {
        var icon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(json.w,
            json.h), {
            imageOffset: new BMap.Size(-json.l, -json.t),
            infoWindowOffset: new BMap.Size(json.lb + 5, 1),
            offset: new BMap.Size(json.x, json.h)
        })
        return icon;
    }
    //创建一个2级台站的Icon（标注点为蓝色的圆点）
    function createIconL2(json) {
        var icon = new BMap.Icon("http://webmap0.map.bdstatic.com/wolfman/static/common/images/us_cursor_9517a2b.png", new BMap.Size(json.w,
            json.h), {
            imageOffset: new BMap.Size(-json.l, -json.t),
            infoWindowOffset: new BMap.Size(json.lb + 5, 1),
            offset: new BMap.Size(json.x, json.h)
        })
        return icon;
    }
    //创建一个3级台站的Icon（标注点为蓝色的圆点）
    function createIconL3(json) {
        var icon = new BMap.Icon("http://webmap0.map.bdstatic.com/wolfman/static/common/images/us_cursor_9517a2b.png", new BMap.Size(json.w,
            json.h), {
            imageOffset: new BMap.Size(-json.l, -json.t),
            infoWindowOffset: new BMap.Size(json.lb + 5, 1),
            offset: new BMap.Size(json.x, json.h)
        })
        return icon;
    }


    //创建一个标注
    function addMarker(stationList) {
        for (var i = 0; i < stationList.length; i++) {
            var json = stationList[i];

            var p0 = json.longitude;
            var p1 = json.latitude;
            var point = new BMap.Point(p0, p1);

            var marker = new BMap.Marker(point);
            var iw = createInfoWindow(i);
            var label = new BMap.Label(json.cityName, {
                "offset": new BMap.Size(stationiconL1.lb - stationiconL1.x - 10, 25)
            });
            marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                borderColor: "#808080",
                color: "#333",
                cursor: "pointer"
            });

            (function () {
                var index = i;
                var _iw = createInfoWindow(i);
                var _marker = marker;
                _marker.addEventListener("mouseover", function () { //鼠标悬停1s打开文本框
                    console.log(index);
                    timer = setTimeout(function () { //设置延时1s显示
                        _marker.openInfoWindow(_iw);

                    }, 1000);
                })

                markPush(json,marker);

                _marker.addEventListener("mouseout", function () { //鼠标移开关闭对话框

                    _marker.closeInfoWindow(_iw);
                    clearTimeout(timer); //若移开则清除已计算的时间，以此来保证计算停留时间大于1s才执行上面的方法

                })

                _iw.addEventListener("open", function () {
                    _marker.getLabel().hide();
                })
                _iw.addEventListener("close", function () {
                    _marker.getLabel().show();
                })
                label.addEventListener("click", function () {
                    _marker.openInfoWindow(_iw);
                })
                _marker.addEventListener("click",
                    function () {
                        console.log(index);
                        setTimeout("javascript:location.href='homePage.html?stationId=" + stationList[index].stationId + "'", 5);

                    })
            })()

        }


    }

    //设置台站并分级保存
    function markPush(json,marker){
        if (json.level == 1) { //初始显示优先级为1的台站
            var iconImgL1 = createIconL1(stationiconL1);
            marker.setIcon(iconImgL1);
            marker.show();
            markerListlM1.push(marker);

        } else {
            if (json.level == 2) {
                var iconImgL2 = createIconL2(stationiconL2);
                marker.setIcon(iconImgL2);
                marker.show();
                markerListlM2.push(marker)
            } else {
                if (json.level == 3) {
                    var iconImgL3 = createIconL3(stationiconL3);
                    marker.setIcon(iconImgL3);

                    markerListlM3.push(marker)
                }
            }
        }
    }

    function zooming() {

        map.addEventListener("zoomend", function () { //地图等级监控事件，等级发生改变则运行。地图等级小于等于5显示1级；等于6显示2级；大于6显示3级。
            var zoomLevel = this.getZoom();

            // console.log(i);
            // var allOverlay = map.getOverlays();
            // console.log(allOverlay);
            if (zoomLevel <= 6) {

                if (markerListl1.length == 0) {
                    _level = 1;
                    //请求后台数据
                    MarkerBuilding(1);
                }
                // map.setZoom(5);

                for (var j = 0; j < markerListl2.length; j++) {
                    markerListlM2[j].hide();
                }
                for (var j = 0; j < markerListl3.length; j++) {
                    markerListlM3[j].hide();
                }
                // allOverlay.forEach(function (marker) {
                //     marker.show();
                // })
            } else {
                if (zoomLevel == 7) {
                    _level = 2;
                    if (markerListl2.length == 0) {
                        //请求后台数据
                        MarkerBuilding(2);
                    }
                    // map.setZoom(6);


                    for (var i = 0; i < markerListl2.length; i++) {
                        markerListlM2[i].show();
                    }
                    for (var j = 0; j < markerListl3.length; j++) {
                        markerListlM3[j].hide();
                    }

                } else {
                    if (zoomLevel > 7) {
                        _level = 3;
                        // map.setZoom(7);
                        if (markerListl3.length == 0) {
                            //请求后台数据
                            MarkerBuilding(3);
                        }

                        for (var i = 0; i < markerListl3.length; i++) {
                            markerListlM3[i].show();
                        }
                    }
                }
            }

        });
    }

    //查询台站的信息并保存
    function MarkerBuilding(i) {
        $.ajax({
            type: "Get",
            url: "/apis/building/mapinfo/getStationInfoByLevel?level=" + i,
            success: function addMarkerByData(data) {
                if (i == 1) {
                    markerListl1 = data.cityList;
                    console.log(markerListl1)
                    addMarker(markerListl1); //创建1级台站标注
                } else if (i == 2) {
                    markerListl2 = data.cityList;
                    console.log(markerListlM2)
                    addMarker(markerListl2); //创建2级台站标注
                } else if (i == 3) {
                    markerListl3 = data.cityList;
                    console.log(markerListl3)
                    addMarker(markerListl3); //创建3级台站标注
                }

            }
        })
    }

    initMap(); //创建和初始化地图
}