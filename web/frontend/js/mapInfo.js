    //创建和初始化地图函数：
    function initMap() {
        createMap(); //创建地图
        setMapEvent(); //设置地图事件
        addMapControl(); //向地图添加控件
        zooming(); //添加地图级别监视展示台站信息事件

    }

    //创建地图函数：
    function createMap() {
        var map = new BMap.Map("dituContent", {
            minZoom: 5,
            maxZoom: 9
        }); //在百度地图容器中创建一个地图
        var point = new BMap.Point(104.05997, 38.81127); //定义一个中心点坐标
        map.centerAndZoom(point, 5); //设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map; //将map变量存储在全局

        //城市搜索定位功能
        var searchBtn = document.getElementById('search-btn');
        var local = null;
        searchBtn.addEventListener("click", function () { //点击搜索
            local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            let searchresult = document.getElementById("suggestId").value;
            if(searchresult != null){
                local.search(searchresult);  //这句是一个异步请求到服务器，不能调用后马上去local.getResults().getPoi(0);这样是获取不到值的。 设置下 LocalSearchOptions.onSearchComplete，在回调函数中去做，你要做的事情，这里才可以获取local.getResults()
            }else{
                alert("城市不存在")
            }
        });

        function myFun() {
            if(local.getResults() == null){alert("城市不存在"); return ;}
            console.log(local.getResults());
            var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 9);
            console.log("ZooM是这个：" + map.getZoom());
        };

        //地图样式,例如不显示铁路等。
        var myStyleJson = [{
            "featureType": "road", //道路——全部道路显示
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "tertiaryway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "fourlevelway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "local",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "scenicspotsway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "universityway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "vacationway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "railway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "subway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "highwaysign",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "subwaylabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "tertiarywaysign",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "financelabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "subwaystation",
            "elementType": "geometry",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "transportation",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "educationlabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "educationlabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }];
        map.setMapStyle({
            styleJson: myStyleJson
        });
    }

    //地图事件设置函数：
    function setMapEvent() {
        map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard(); //启用键盘上下左右键移动地图
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


    // //标注点数组
    // var markerArr = [{title:"我的标记",content:"我的备注",point:"116.386159|40.123139",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
    // 	 ];
    // //创建marker
    // function addMarker(){
    //     for(var i=0;i<markerArr.length;i++){
    //         var json = markerArr[i];
    //         var p0 = json.point.split("|")[0];
    //         var p1 = json.point.split("|")[1];
    //         var point = new BMap.Point(p0,p1);
    // 		var iconImg = createIcon(json.icon);
    //         var marker = new BMap.Marker(point,{icon:iconImg});
    // 		var iw = createInfoWindow(i);
    // 		var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
    // 		marker.setLabel(label);
    //         map.addOverlay(marker);
    //         label.setStyle({
    //                     borderColor:"#808080",
    //                     color:"#333",
    //                     cursor:"pointer"
    //         });

    // 		(function(){
    // 			var index = i;
    // 			var _iw = createInfoWindow(i);
    // 			var _marker = marker;
    // 			_marker.addEventListener("click",function(){
    // 			    this.openInfoWindow(_iw);
    // 		    });
    // 		    _iw.addEventListener("open",function(){
    // 			    _marker.getLabel().hide();
    // 		    })
    // 		    _iw.addEventListener("close",function(){
    // 			    _marker.getLabel().show();
    // 		    })
    // 			label.addEventListener("click",function(){
    // 			    _marker.openInfoWindow(_iw);
    // 		    })
    // 			if(!!json.isOpen){
    // 				label.hide();
    // 				_marker.openInfoWindow(_iw);
    // 			}
    // 		})()
    //     }
    // }
    //标注点数组,数据库查询所得的json数组数据
    var markerListl1 = [] //一级标注集合
    var markerListl2 = [] //二级标注集合
    var markerListl3 = [] //三级标注集合
    var markerListlM1 = new Array(); //一级标注集合
    var markerListlM2 = new Array(); //二级标注集合
    var markerListlM3 = new Array(); //三级标注集合

    var _level = 1;

    //隐藏标注点
    function hiddenMarker(eventtype) {
        var allOverlay = map.getOverlays();
        for (var i = 0; i < allOverlay.length; i++) {
            if (allOverlay[i]["layerType"] == eventtype) {
                map.removeOverlay(allOverlay[i]);
            }
        }
    }

    //创建InfoWindow
    function createInfoWindow(i) {
        let opts = {
            width: 210,
            height: 168,
            title: "台站信息"
        }
        if (_level == 1) {
            var json = markerListl1[i];
            var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.stationId + "'>" +
                "台站号：" + json.stationId +
                "</b><div class='iw_poi_content'>" + "<span style='font-weight:bold;'>省份：</span>" + json.province +
                "<br/>" + "<span style='font-weight:bold;'>城市：</span>" + json.cityName +
                "<br/>" + "<span style='font-weight:bold;'>气候区属：</span>" + json.climates +
                "<br/>" + "<span style='font-weight:bold;'>纬度：</span>" + json.latitude.toFixed(2) +
                "<br/>" + "<span style='font-weight:bold;'>经度：</span>" + json.longitude.toFixed(2) +
                "<br/>" + "<span style='font-weight:bold;'>海拔：</span>" + json.altitude.toFixed(2) + "</div>", opts);
            return iw;
        } else {
            if (_level == 2) {
                var json = markerListl2[i];
                var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.stationId + "'>" +
                    "台站号：" + json.stationId +
                    "</b><div class='iw_poi_content'>" + "<span style='font-weight:bold;'>省份：</span>" + json.province +
                    "<br/>" + "<span style='font-weight:bold;'>城市：</span>" + json.cityName +
                    "<br/>" + "<span style='font-weight:bold;'>气候区属：</span>" + json.climates +
                    "<br/>" + "<span style='font-weight:bold;'>纬度：</span>" + json.latitude.toFixed(2) +
                    "<br/>" + "<span style='font-weight:bold;'>经度：</span>" + json.longitude.toFixed(2) +
                    "<br/>" + "<span style='font-weight:bold;'>海拔：</span>" + json.altitude.toFixed(2) + "</div>", opts);
                return iw;
            } else {
                if (_level == 3) {
                    var json = markerListl3[i];
                    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.stationId + "'>" +
                        "台站号：" + json.stationId +
                        "</b><div class='iw_poi_content'>" + "<span style='font-weight:bold;'>省份：</span>" + json.province +
                        "<br/>" + "<span style='font-weight:bold;'>城市：</span>" + json.cityName +
                        "<br/>" + "<span style='font-weight:bold;'>气候区属：</span>" + json.climates +
                        "<br/>" + "<span style='font-weight:bold;'>纬度：</span>" + json.latitude.toFixed(2) +
                        "<br/>" + "<span style='font-weight:bold;'>经度：</span>" + json.longitude.toFixed(2) +
                        "<br/>" + "<span style='font-weight:bold;'>海拔：</span>" + json.altitude.toFixed(2) + "</div>", opts);
                    return iw;
                }
            }
        }
    }

    //1级台站的图标设置(w和h是大小，l和t是位置)
    var stationiconL1 = {
        w: 12,
        h: 15,
        l: 0,
        t: 139,
        x: 0,
        lb: 5
    };
    // //2级台站的图标设置(w和h是大小，l和t是位置)
    // var stationiconL2 = {
    //     w: 18,
    //     h: 25,
    //     l: 0,
    //     t: 22,
    //     x: 0,
    //     lb: 5
    // };
    // //3级台站的图标设置(w和h是大小，l和t是位置)
    // var stationiconL3 = {
    //     w: 18,
    //     h: 25,
    //     l: 18,
    //     t: 23,
    //     x: 0,
    //     lb: 5
    // };
    //创建一个1级台站的Icon（标注点图片为红色圆点）（应要求，所有级别的台站统一改成以及台站的样式）
    function createIconL1(json) {
        var icon = new BMap.Icon("../img/markers.png ", new BMap.Size(json.w,
            json.h), {
            // imageOffset: new BMap.Size(-json.l, -json.t),
            anchor: new BMap.Size(4, 18),
            // infoWindowOffset: new BMap.Size(json.lb + 5, 1),
            // offset: new BMap.Size(json.x, json.h)
        })
        return icon;
    }
    // //创建一个2级台站的Icon（标注点为蓝色的圆点）
    // function createIconL2(json) {
    //     var icon = new BMap.Icon("http://webmap0.map.bdstatic.com/wolfman/static/common/images/us_cursor_9517a2b.png", new BMap.Size(json.w,
    //         json.h), {
    //         imageOffset: new BMap.Size(-json.l, -json.t),
    //         infoWindowOffset: new BMap.Size(json.lb + 5, 1),
    //         offset: new BMap.Size(json.x, json.h)
    //     })
    //     return icon;
    // }
    // //创建一个3级台站的Icon（标注点为蓝色的圆点）
    // function createIconL3(json) {
    //     var icon = new BMap.Icon("http://webmap0.map.bdstatic.com/wolfman/static/common/images/us_cursor_9517a2b.png", new BMap.Size(json.w,
    //         json.h), {
    //         imageOffset: new BMap.Size(-json.l, -json.t),
    //         infoWindowOffset: new BMap.Size(json.lb + 5, 1),
    //         offset: new BMap.Size(json.x, json.h)
    //     })
    //     return icon;
    // }


    //创建一个标注
    function addMarker(stationList) {
        for (let i = 0; i < stationList.length; i++) {
            let json = stationList[i];

            let p0 = json.longitude;
            let p1 = json.latitude;
            let point = new BMap.Point(p0, p1);

            //坐标转换完之后的回调函数
            translateCallback = function (data) {
                // console.log("I---------------"+i);
                if (data.status === 0) {
                    let marker = new BMap.Marker(data.points[0]);

                    // var marker = new BMap.Marker(point);
                    var iw = createInfoWindow(i);
                    // var label = new BMap.Label(json.cityName, {
                    //     "offset": new BMap.Size(stationiconL1.lb - stationiconL1.x - 10, 25)
                    // });
                    // marker.setLabel(label);
                    map.addOverlay(marker);
                    // label.setStyle({
                    //     borderColor: "#808080",
                    //     fontWeight: "bold", //字体加粗
                    //     fontSize: "15px", //字体大小
                    //     color: "#000",
                    //     // border :"0",//边框透明
                    //     // backgroundColor :null, //文本标注背景颜色透明　
                    //     cursor: "pointer"
                    // });

                    if (json.level == 1) { //初始显示优先级为1的台站
                        var iconImgL1 = createIconL1(stationiconL1);
                        marker.setIcon(iconImgL1);
                        marker.show();
                        markerListlM1.push(marker);

                    } else {
                        if (json.level == 2) {
                            var iconImgL2 = createIconL1(stationiconL1); //二级台站样式的创建，和一级一样
                            marker.setIcon(iconImgL2);
                            // marker.show();
                            if(map.getZoom() < 7){
                                marker.hide();
                        }
                            markerListlM2.push(marker)
                        } else {
                            if (json.level == 3) {
                                var iconImgL3 = createIconL1(stationiconL1); //三级台站样式的创建，和一级一样
                                marker.setIcon(iconImgL3);
                                if(map.getZoom() <= 7){
                                        marker.hide();
                                }


                                markerListlM3.push(marker)
                                
                            }
                        }
                    }

                    (function () {
                        var index = i;
                        var _iw = createInfoWindow(i);
                        var _marker = marker;
                        _marker.addEventListener("mouseover", function () { //鼠标悬停1s打开文本框
                            console.log(index);
                            timer = setTimeout(function () { //设置延时1s显示
                                _marker.openInfoWindow(_iw);

                            }, 500);
                        })

                        _marker.addEventListener("mouseout", function () { //鼠标移开关闭对话框

                            _marker.closeInfoWindow(_iw);
                            clearTimeout(timer); //若移开则清除已计算的时间，以此来保证计算停留时间大于1s才执行上面的方法

                        })

                        // _iw.addEventListener("open", function () {
                        //     _marker.getLabel().hide();
                        // })
                        // _iw.addEventListener("close", function () {
                        //     _marker.getLabel().show();
                        // })
                        // label.addEventListener("click", function () {
                        //     _marker.openInfoWindow(_iw);
                        // })
                        _marker.addEventListener("click",
                            function () {
                                console.log(index);
                                setTimeout("javascript:location.href='homePage.html?stationId=" + stationList[index].stationId + "'", 5);

                            })
                    })()

                }
            }
            //坐标转化，实际坐标转化为百度坐标
            let convertor = new BMap.Convertor();
            let pointArr = [];
            pointArr.push(point);
            convertor.translate(pointArr, 1, 5, translateCallback)



        }


    }

    function zooming() {
        map.addEventListener("zoomend", function () { //地图等级监控事件，等级发生改变则运行。地图等级小于等于5显示1级；等于6显示2级；大于6显示3级。
            var zoomLevel = this.getZoom();
            console.log(zoomLevel);
            // console.log(i);
            // var allOverlay = map.getOverlays();
            // console.log(allOverlay);
            if (zoomLevel <= 6) {

                if (markerListl1.length == 0) {
                    _level = 1;

                    //请求后台数据
                    $.ajax({
                        type: "Get",
                        url: "/apis/building/mapinfo/getStationInfoByLevel?level=1",
                        success: function addMarkerByData(data) {

                            markerListl1 = data.cityList;
                            // console.log(markerListl1)
                            addMarker(markerListl1); //创建标注


                        }
                    })
                }


                // map.setZoom(5);
                // console.log(markerListlM3.length);
                for (let j = 0; j < markerListlM2.length; j++) {
                    markerListlM2[j].hide();
                }
                for (let j = 0; j < markerListlM3.length; j++) {
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
                        $.ajax({
                            type: "Get",
                            url: "/apis/building/mapinfo/getStationInfoByLevel?level=2",
                            success: function addMarkerByData(data) {


                                markerListl2 = data.cityList;
                                // console.log(markerListlM2)
                                addMarker(markerListl2); //创建标注


                            }
                        })
                    }
                    // map.setZoom(6);


                    for (let i = 0; i < markerListlM2.length; i++) {
                        markerListlM2[i].show();
                    }
                    for (let j = 0; j < markerListlM3.length; j++) {
                        markerListlM3[j].hide();
                    }

                } else {
                    if (zoomLevel > 7) {
                        _level = 3;
                        // map.setZoom(7);
                        if (markerListl3.length == 0) {
                            //请求后台数据
                            $.ajax({
                                type: "Get",
                                url: "/apis/building/mapinfo/getStationInfoByLevel?level=3",
                                success: function addMarkerByData(data) {
                                    markerListl3 = data.cityList;
                                    // console.log(markerListl3)
                                    addMarker(markerListl3); //创建标注
                                }
                            })
                        }

                        for (let i = 0; i < markerListlM3.length; i++) {
                            markerListlM3[i].show();
                        }
                    }
                }
            }

        });
    }

    $.ajax({
        type: "Get",
        url: "/apis/building/mapinfo/getStationInfoByLevel?level=1",
        success: function addMarkerByData(data) {
            markerListl1 = data.cityList;
            // console.log(markerListl1)
            addMarker(markerListl1); //创建标注
        }
    })

    // var markerArr = [{title:stationId,content: isOpen ,point:longitude+"|"+latitude,}
    // 	 ];

    //创建marker,基于查询数据库台站表所得的信息的修改后的创建方法
    //   function addMarkerByData(){
    //     // for(var i=0;i<getJsonLength(stationList);i++){
    //     //     var json = stationList[i];
    //     //     var p0 = json.longitude;
    //     //     var p1 = json.latitude;
    //     //     var point = new BMap.Point(p0,p1);
    // 	// 	var iconImg = createIcon(stationicon);
    //     //     var marker = new BMap.Marker(point,{icon:iconImg});
    // 	// 	var iw = createInfoWindow(i);
    // 	// 	var label = new BMap.Label(json.stationId,{"offset":new BMap.Size(stationicon.lb-stationicon.x+10,-20)});
    // 	// 	marker.setLabel(label);
    //     //     map.addOverlay(marker);
    //     //     label.setStyle({
    //     //                 borderColor:"#808080",
    //     //                 color:"#333",
    //     //                 cursor:"pointer"
    //     //     });

    // 	// 	(function(){
    // 	// 		var index = i;
    // 	// 		var _iw = createInfoWindow(i);
    // 	// 		var _marker = marker;
    // 	// 		_marker.addEventListener("click",function(){
    // 	// 		    this.openInfoWindow(_iw);
    // 	// 	    });
    // 	// 	    _iw.addEventListener("open",function(){
    // 	// 		    _marker.getLabel().hide();
    // 	// 	    })
    // 	// 	    _iw.addEventListener("close",function(){
    // 	// 		    _marker.getLabel().show();
    // 	// 	    })
    // 	// 		label.addEventListener("click",function(){
    // 	// 		    _marker.openInfoWindow(_iw);
    // 	// 	    })

    // 	// 	})()
    //     // }
    // }
    // //创建InfoWindow
    // function createInfoWindow(i){
    //     var json = stationList[i];
    //     var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.stationId + "'>" + json.stationId + "</b><div class='iw_poi_content'>"+json.province+" "+json.cityName+" "+"气候是"+json.climates+" "+"海拔是"+altitude+"</div>");
    //     return iw;
    // }
    // //创建一个Icon
    // function createIcon(json){
    //     var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
    //     return icon;
    // }

    initMap(); //创建和初始化地图