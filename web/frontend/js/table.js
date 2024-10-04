 jQuery(document).ready(function () {
        TableExport.init();
    });
//为导出功能设置数据源
function setExportDataAttr() {
    $(".export-png").attr("data-table","#export-erea");
    $(".export-xlsx").attr("data-table","#export-erea");
   
    $(".export-png").attr("data-filename","导出测试");
    $(".export-xlsx").attr("data-filename","导出测试");
};

setExportDataAttr();
