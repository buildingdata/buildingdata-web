//mapStart(param1,param2,param3,param4,param5,param6,param7)
//mapStart(centerCity, zoom, minZoomLevel, maxZoomLevel, showLevel, ScrollWheelZoom, Keyboard)
//centerCity（必填）：地图展示的中心位置，选择城市填入
//zoom（必填）：地图初始化的尺寸级别，即地图展示的大小
//minZoomLevel（必填）：地图的最小尺寸级别
//maxZoomLevel（必填）：地图的最大尺寸级别
//showLevel（必填）：地图的展示级别，可控制地图资源的展示数量:
//——0级：资源全部显示；1级：不显示兴趣标注点；2级：不显示地铁和铁路；3级：不显示地铁、铁路以及城市及以下道路和标注点；4级不显示任何背景、道路和标注点
//ScrollWheelZoom（可选参数）：用于控制是否启用地图滚轮放大缩小
//Keyboard（可选参数）：用于控制启用键盘上下左右键移动地图
mapStart("西安",5,5,9,3,true,true);