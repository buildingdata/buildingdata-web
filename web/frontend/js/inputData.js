// if ($("#datatype option:checked").text() == "建筑节能设计参数") {
//     if ($("#paramtype option:checked").text() == "室外参数") {
//         $("#outerparam").show();
//         $("#innerparam").hide();
//         $("#meteorologicalyear").hide();
//         $("#innerhotdesignparams").hide();
//         $("#innerwarmcomfortableparams").hide();
//         if ($("#outerparamtype option:checked").text() == "民用建筑热工设计用参数") {
//             $("#outpersonhotparams").show();
//         }
//     } else if ($("#paramtype option:checked").text() == "室内参数") {
//         $("#outerparam").hide();
//         $("#innerparam").show();
//         $("#meteorologicalyear").hide();
//         $("#outpersonwarmwindparams").hide();
//         $("#outpersonhotparams").hide();
//     } else if ($("#paramtype option:checked").text() == "建筑能耗模拟气象年") {
//         $("#outerparam").hide();
//         $("#innerparam").hide();
//         $("#meteorologicalyear").show();
//         $("#outpersonwarmwindparams").hide();
//         $("#outpersonhotparams").hide();
//         $("#innerhotdesignparams").hide();
//         $("#innerwarmcomfortableparams").hide();
//     }
// }
$("#outerparam").show();
$("#outpersonhotparams").show();

function liveSelected() {
    if ($("#paramtype option:selected").text() == "室外参数") {
        $("#outerparam").show();
        $("#innerparam").hide();
        $("#meteorologicalyear").hide();
        $("#innerhotdesignparams").hide();
        $("#innerwarmcomfortableparams").hide();
        $("#outpersonhotparams").show();
        $("#extrememeteorologicalyear").hide();

    } else if ($("#paramtype option:selected").text() == "室内参数") {
        $("#outerparam").hide();
        $("#innerparam").show();
        $("#meteorologicalyear").hide();
        $("#outpersonwarmwindparams").hide();
        $("#outpersonhotparams").hide();
        $("#innerwarmcomfortableparams").show();
        $("#extrememeteorologicalyear").hide();


    } else if ($("#paramtype option:selected").text() == "建筑能耗模拟气象年") {
        $("#outerparam").hide();
        $("#innerparam").hide();
        $("#meteorologicalyear").show();
        $("#outpersonwarmwindparams").hide();
        $("#outpersonhotparams").hide();
        $("#innerhotdesignparams").hide();
        $("#innerwarmcomfortableparams").hide();
        // $("#extrememeteorologicalyear").hide();
    }
}

function chooseouterparam() {
    if ($("#outerparamtype option:selected").text() == "热工设计用室外参数") {
        $("#outpersonhotparams").show();
        $("#outpersonwarmwindparams").hide();
	$("#winsumtypdesignday").hide();

    } else if ($("#outerparamtype option:selected").text() == "暖通空调设计室外用参数") {
        $("#outpersonwarmwindparams").show();
        $("#outpersonhotparams").hide();
    }
}

function chooseoutpersonwarmwind() {
    if ($("#outpersonwarmwindparamstype option:selected").text() == "冬夏季典型设计气象日参数") {
        $("#winsumtypdesignday").show();
    } else {
        $("#winsumtypdesignday").hide();
    }
}

function chooseinnerparam() {
    if ($("#innerparamtype option:selected").text() == "室内热舒适基本要求") {
        $("#innerwarmcomfortableparams").show();
        $("#innerhotdesignparams").hide();

    } else if ($("#innerparamtype option:selected").text() == "热工设计用室内参数") {
        $("#innerwarmcomfortableparams").hide();
        $("#innerhotdesignparams").show();
    }else {
        $("#innerwarmcomfortableparams").hide();
        $("#innerhotdesignparams").hide();
    }
}

function choosemeteorologicalyear() {
    if ($("#meteorologicalyeartype option:selected").text() == "极端气象年") {
        $("#extrememeteorologicalyear").show();
    } else if ($("#meteorologicalyeartype option:selected").text() == "典型气象年") {
        $("#extrememeteorologicalyear").hide();
    } else if ($("#meteorologicalyeartype option:selected").text() == "未来气象年") {
        $("#extrememeteorologicalyear").hide();
    }
}



//上传按钮点击函数，点击后上传文件

$("#upload").on('click', function() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    console.log("name"+name);
    console.log(fileName);
    if (fileName == null) {
        $("#console").html("请先选择正确格式的文件！");
    } else {
        let point = fileName.name.lastIndexOf(".");
        let type = fileName.name.substr(point + 1);
        // console.log(type);
        if (type == "xls" || type == "xlsx" || type == "txt") {
            // alert("11");
            $("#console").html("");
            if ($("#paramtype option:selected").text() == "室外参数") {
                var action = "";
                console.log("室外参数");
                // $("#outerparam").show();
                if ($("#outerparamtype option:selected").text() == "热工设计用室外参数") {
                    if ($("#outpersonhotparamstype option:selected").text() == "民用建筑热工设计规范附表参数") {
                        console.log("民用建筑热工");
                        $("#upload").attr("disabled", "disabled");
                        uploadoutpersonhot();
                        $("#fileUpload").change(function() {
                            // alert(11);
                            $("#upload").removeAttr("disabled");
                        });
                    } else if ($("#outpersonhotparamstype option:selected").text() == "围护结构隔热设计室外计算参数") {
                        uploadOtmccData();
                        $("#upload").attr("disabled", "disabled");
                        console.log("围护结构隔热设计室外计算参数");
                        $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                        });
                    } else if ($("#outpersonhotparamstype option:selected").text() == "自然通风设计室外计算参数") {
                        action = "ocpnvd";
                        console.log("自然通风设计室外计算参数");
                        $("#upload").attr("disabled", "disabled");
                        uploadOcpnvdData(action);
                        $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                        });
                    } else if ($("#outpersonhotparamstype option:selected").text() == "围护结构动态保温设计室外计算参数") {
                        action = "ocpedid";
                        $("#upload").attr("disabled", "disabled");
                        uploadOcpedidData(action);
                        $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                        });
                    } else if ($("#outpersonhotparamstype option:selected").text() == "建筑遮阳设计室外计算参数") {
                        action = "asdo";
                        $("#upload").attr("disabled", "disabled");
                        uploadAsdoData(action);
                        $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                        });
                    } else if ($("#outpersonhotparamstype option:selected").text() == "围护结构热湿耦合计算室外计算参数") {
                        $("#upload").attr("disabled", "disabled");
                        uploadOcpehhcc();
                        $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                        });
                    }

                } else if ($("#outerparamtype option:selected").text() == "暖通空调设计室外用参数") {
                    if ($("#outpersonwarmwindparamstype option:selected").text() == "多不保证率及多参数组合的室外计算参数") {
                        $("#upload").attr("disabled", "disabled");
                        console.log("多不保证率及多参数组合的室外计算参数");
                        uploadOcpMulGrpc();
                        $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                        });
                    } else if ($("#outpersonwarmwindparamstype option:selected").text() == "同时发生室外计算参数") {
                        $("#upload").attr("disabled", "disabled");
                        console.log("同时发生室外计算参数");
                        uploaduploadSimultaneousOccurrenceParam();
                        $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                        });
                    } else if ($("#outpersonwarmwindparamstype option:selected").text() == "冬夏季典型设计气象日参数") {
                        if ($("#winsumtypdesigndaytype option:selected").text() == "冬季供暖室外计算参数") {
                            $("#upload").attr("disabled", "disabled");
                            console.log("冬季供暖室外计算参数");
                            uploadTypicalWinterHeating();
                            $("#fileUpload").change(function() {
                                $("#upload").removeAttr("disabled");
                            });
                        } else if ($("#winsumtypdesigndaytype option:selected").text() == "冬季空调室外计算参数") {
                            $("#upload").attr("disabled", "disabled");
                            console.log("冬季空调室外计算参数");
                            uploadTypicalWinterAir();
                            $("#fileUpload").change(function() {
                                $("#upload").removeAttr("disabled");
                            });

                        }else if($("#winsumtypdesigndaytype option:selected").text() == "夏季空调室外计算参数"){
                            $("#upload").attr("disabled", "disabled");
                            console.log("夏季空调室外计算参数");
                            uploadTypicalSummerAirconditioner()
                            $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                            });
                        }else if($("#winsumtypdesigndaytype option:selected").text() == "夏季除湿室外计算参数"){
                            $("#upload").attr("disabled", "disabled");
                            console.log("夏季除湿室外计算参数");
                            uploadTypicalSummerDehumidification();
                            $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                            });
                        }else if($("#winsumtypdesigndaytype option:selected").text() == "冬季加湿室外计算参数"){
                            $("#upload").attr("disabled", "disabled");
                            console.log("冬季加湿室外计算参数");
                            uploadOcpWaHum()
                            $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                            });
                        }else if($("#winsumtypdesigndaytype option:selected").text() == "夏季新风计算室外计算参数"){
                            $("#upload").attr("disabled", "disabled");
                            console.log("夏季新风计算室外计算参数");
                            uploadSummerNewWindTime();
                            $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                            });
                        }
                        else if($("#winsumtypdesigndaytype option:selected").text() == "冬季新风计算室外计算参数"){
                            $("#upload").attr("disabled", "disabled");
                            console.log("冬季新风计算室外计算参数");
                            uploadWinterNewWindTime();
                            $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                            });
                        }

                    }
                }
            } else if ($("#paramtype option:selected").text() == "建筑能耗模拟气象年") {
                if ($("#meteorologicalyeartype option:selected").text() == "典型气象年") {
                    $("#upload").attr("disabled", "disabled");
                    console.log("典型气象年");
                    uploadTypicalMeteoroYear();
                    $("#fileUpload").change(function() {
                        $("#upload").removeAttr("disabled");
                    });
                } else if ($("#meteorologicalyeartype option:selected").text() == "极端气象年") {
                    if ($("#extrememeteorologicalyeartype option:selected").text() == "空调负荷极端年") {
                        $("#upload").attr("disabled", "disabled");
                        console.log("空调负荷极端年");
                        uploadExtremeYearAir();
                        $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                        });
                    } else if ($("#extrememeteorologicalyeartype option:selected").text() == "室内过热极端年") {
                        $("#upload").attr("disabled", "disabled");
                        console.log("室内过热极端年");
                        uploadExtremeYearInner();
                        $("#fileUpload").change(function() {
                            $("#upload").removeAttr("disabled");
                        });
                    }

                }
            }

        } else {
            $("#console").html("请先选择正确格式的文件！");
        }
    }
})


// 导入民用建筑热工设计规范附表参数excel表格
function uploadoutpersonhot() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importPersonHotDesign/upload",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        success: function(result) {
            console.log(result);
            console.log(typeof(result.message));
            console.log(result.count);
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
        },
        error: function() {
            alert("请求失败");
        }
    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importPersonHotDesign/flag",
            datatype: "json",
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}

// 导入围护结构隔热设计室外计算参数excel表格
function uploadOtmccData() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importotmcc/uploadotmcc",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);
        },
        error: function() {
            alert("请求失败！");
        }
    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importotmcc/flag",
            datatype: "json",
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}


// 上传自然通风设计室外计算参数excel表格
function uploadOcpnvdData(action) {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importocpedidocpnvdasdo/uploadocpedidocpnvdasdo?action=" + action,
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);
        },
        error: function() {
            alert("请求失败！");
        }
    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importocpedidocpnvdasdo/flag",
            datatype: "json",
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}

// 上传围护结构动态保温设计室外计算参数excel表格
function uploadOcpedidData(action) {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importocpedidocpnvdasdo/uploadocpedidocpnvdasdo?action=" + action,
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);
        },
        error: function() {
            alert("请求失败！");
        }
    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importocpedidocpnvdasdo/flag",
            datatype: "json",
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);
                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}

// 上传建筑遮阳设计室外计算参数
function uploadAsdoData(action) {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importocpedidocpnvdasdo/uploadocpedidocpnvdasdo?action=" + action + "&_t=" + new Date().getTime(),
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importocpedidocpnvdasdo/flag?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}

// 上传围护结构热湿耦合计算室外计算参数，对应数据库ocpehhcc
function uploadOcpehhcc() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importocpehhcc/uploadocpehhcc",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importocpehhcc/flag?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}



// 上传多不保证率及多参数组合的室外计算参数
function uploadOcpMulGrpc() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importocpMulGrpc/uploadocpMulGrpc",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importocpMulGrpc/flag?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}

// 上传同时发生参数
function uploaduploadSimultaneousOccurrenceParam() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importSimultaneousOccurrenceParam/uploadSimultaneousOccurrenceParam",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importSimultaneousOccurrenceParam/flag?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}

// 上传典型气象年表格
function uploadTypicalMeteoroYear() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importTypicalMeteoroYear/uploadTypicalMeteoroYear",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importTypicalMeteoroYear/flag?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}

// 上传空调负荷极端年表格
function uploadExtremeYearAir() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importextrememeteorologicalyearair/uploadextrememeteorologicalyearair",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importextrememeteorologicalyearair/flag?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}

// 上传室内过热极端年数据
function uploadExtremeYearInner() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importextrememeteorologicalyearinner/uploadextrememeteorologicalyearinner",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importextrememeteorologicalyearinner/flag?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}

// 上传冬夏季典型设计气象日参数的七个表
// 上传冬季供暖室外计算参数Excel表格，对应数据库中的表为t_typical_winter_heating_param和t_typical_winter_heating_time
function uploadTypicalWinterHeating() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importWinSumTypicalDesignDay/uploadTypWinHeat",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importWinSumTypicalDesignDay/flag1?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}

// 上传冬季空调室外计算参数Excel表格，对应数据库中的表为t_typical_winter_airconditioner_param和t_typical_winter_airconditioner_time
function uploadTypicalWinterAir() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importWinSumTypicalDesignDay/uploadTrpWinAir",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importWinSumTypicalDesignDay/flag2?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}
function uploadTypicalSummerAirconditioner() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importWinSumTypicalDesignDay/uploadTSAT",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importWinSumTypicalDesignDay/flag3?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}
function uploadTypicalSummerDehumidification() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importWinSumTypicalDesignDay/uploadtsd",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importWinSumTypicalDesignDay/flag4?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}
function uploadOcpWaHum() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importWinSumTypicalDesignDay/uploadopcWahum",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importWinSumTypicalDesignDay/flag5?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}
function uploadSummerNewWindTime() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importWinSumTypicalDesignDay/uploadsummernewwind",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importWinSumTypicalDesignDay/flag6?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}
function uploadWinterNewWindTime() {
    let name = $("#fileUpload").val();
    let fileName = $("#fileUpload")[0].files[0];
    let formData = new FormData();
    formData.append("file", fileName);
    formData.append("name", name); //这个地方可以传递很多参数
    $.ajax({
        url: "/apis/building/importWinSumTypicalDesignDay/uploadwinternewwind",
        type: "POST",
        datatype: "json",
        async: true,
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(result) {
            $("#uploadState").prepend(result.count);
            $("#console").prepend(result.message + "\n");
            console.log(result);

        },
        error: function() {
            alert("请求失败！");
        }

    });
    var timer = setInterval(function() {
        $.ajax({
            url: "/apis/building/importWinSumTypicalDesignDay/flag7?_t=" + new Date().getTime(),
            datatype: "json",
            async: false,
            // cache: false,
            success: function(result) {
                console.log(result);
                $("#progress").width(result.flag + "%");
                $("#fontSize").html(result.flag + "%");
                if (result.code == 1) {
                    clearInterval(timer);
                }
                console.log(result.flag);

                if (result.flag == 100) {

                    $("#uploadState").show();
                }
            }
        });
    }, 200);
}
function tableToExcel() {
    var filepath = "../tableInstance/"
    var savefile 
    if ($("#paramtype option:selected").text() == "室外参数") {
        if ($("#outerparamtype option:selected").text() == "热工设计用室外参数"){
            let paramtype1 = $("#outpersonhotparams option:selected").text()
            console.log(paramtype1)
           	if($("#outpersonhotparamstype option:selected").text()=="自然通风设计室外计算参数"){
                filepath = filepath+"zirantongfen.xlsx"
                savefile = "自然通风设计室外计算参数数据模板.xlsx"
            }
            
            else if($("#outpersonhotparamstype option:selected").text()=="建筑遮阳设计室外计算参数"){
                filepath = filepath+"oversun.xlsx"
                savefile = "建筑遮阳设计室外计算参数数据模板.xlsx"
            }
            
            else if($("#outpersonhotparamstype option:selected").text()=="围护结构动态保温设计室外计算参数"){
                filepath = filepath+"baowen.xlsx"
                savefile = "围护结构动态保温设计室外计算参数数据模板.xlsx"
            }
            
            else if($("#outpersonhotparamstype option:selected").text()=="围护结构隔热设计室外计算参数"){
                filepath = filepath+"gere.xlsx"
                savefile = "围护结构隔热设计室外计算参数数据模板.xlsx"
            }
            
            else if($("#outpersonhotparamstype option:selected").text()=="围护结构热湿耦合计算室外计算参数"){
                filepath = filepath+"reouhe.xlsx"
                savefile = "围护结构热湿耦合计算室外计算参数数据模板.xlsx"
            }
            else if($("#outpersonhotparamstype option:selected").text()=="围护结构稳态保温防潮设计室外计算参数"){
                filepath = filepath+"wenbaofang.xlsx"
                savefile = "围护结构稳态保温防潮设计室外计算参数.xlsx"
            }
           
        }
        else if($("#outerparamtype option:selected").text() == "暖通空调设计室外用参数"){
            let paramtype1 = $("#outpersonwarmwindparamstype option:selected").text()
            console.log(paramtype1)
            
            if($("#outpersonwarmwindparamstype option:selected").text()=="多不保证率及多参数组合的室外计算参数"){
             filepath = filepath+"duobu.xlsx"  
             savefile = "多不保证率及多参数组合的室外计算参数数据模板.xlsx" 
            }
            
            else if($("#outpersonwarmwindparamstype option:selected").text()=="同时发生室外计算参数"){
            filepath = filepath+"tongshi.xlsx"
            savefile = "同时发生室外计算参数数据模板.xlsx"
        }      
            else{
                if($("#winsumtypdesigndaytype option:selected").text() == "冬季供暖室外计算参数"){
                    filepath = filepath+"winterHeating.xlsx"
                    savefile="冬季供暖室外计算参数数据模板.xlsx"
                }else if($("#winsumtypdesigndaytype option:selected").text() == "冬季空调室外计算参数"){
                    filepath = filepath+"winterairconditioner.xlsx"
                    savefile="冬季空调室外计算参数数据模板.xlsx"
                }
                else if($("#winsumtypdesigndaytype option:selected").text() == "夏季空调室外计算参数"){
                    filepath = filepath+"summercondition.xlsx"
                    savefile="夏季空调室外计算参数数据模板.xlsx"
                }
                else if($("#winsumtypdesigndaytype option:selected").text() == "夏季除湿室外计算参数"){
                    filepath = filepath+"summerdehum.xlsx"
                    savefile="夏季除湿室外计算参数数据模板.xlsx"
                }
                else if($("#winsumtypdesigndaytype option:selected").text() == "冬季加湿室外计算参数"){
                    filepath = filepath+"winteraddhum.xlsx"
                    savefile="冬季加湿室外计算参数数据模板.xlsx"
                }
                else if($("#winsumtypdesigndaytype option:selected").text() == "夏季新风计算室外计算参数"){
                    filepath = filepath+"summerwind.xlsx"
                    savefile="夏季新风计算室外计算参数数据模板.xlsx"
                }
                else{
                    filepath = filepath+"winternewwind.xlsx"
                    savefile="冬季新风计算室外计算参数数据模板.xlsx"
                }
            
            }
        }
    }
    else if($("#paramtype option:selected").text() == "室内参数"){
        if($("#innerparamtype option:selected").text() == "热工设计用室内参数"){
           if($("#innerhotdesignparamstype option:selected").text()=="非供暖房间保温设计室内计算参数"){
                filepath = filepath+"cainuan.xlsx"
                savefile = "非供暖房间保温设计室内计算参数数据模板.xlsx"
            }
            
            else if($("#innerhotdesignparamstype option:selected").text()=="非空调房间隔热设计室内计算参数"){
                filepath = filepath+"feicainuan.xlsx"
                savefile = "非空调房间隔热设计室内计算参数数据模板.xlsx"
            }
            
            else if($("#innerhotdesignparamstype option:selected").text()=="供暖房间保温设计室内计算参数"){
                filepath = filepath+"weihubaowen.xlsx"
                savefile = "供暖房间保温设计室内计算参数数据模板.xlsx"
            }
            
            else if($("#innerhotdesignparamstype option:selected").text()=="空调房间隔热设计室内计算参数"){
                filepath = filepath+"weihugere.xlsx"
                savefile = "空调房间隔热设计室内计算参数数据模板.xlsx"
            }
            
            else if($("#innerhotdesignparamstype option:selected").text()=="自然通风设计室内计算参数"){
                filepath = filepath+"touminweihu.xlsx"
                savefile = "自然通风设计室内计算参数数据模板.xlsx"
            }
	  else{
		 filepath = filepath+"passivesolar.xlsx"
                savefile = "被动式太阳能建筑设计参数数据模板.xlsx"
		}
        }else if($("#innerparamtype option:selected").text() == "暖通空调设计用参数"){
            filepath = filepath+"nunkongtiao.xlsx"
            savefile="暖通空调设计用参数数据模板.xlsx"
        }
        else if($("#innerparamtype option:selected").text() == "模拟计算分析用参数"){
            filepath = filepath+"jisuan.xlsx"
            savefile="模拟计算分析用参数数据模板.xlsx"
        }
        else {
                if($("#innerwarmcomfortableparamstype option:selected").text() == "室内热环境分级"){
                    filepath = filepath+"rehuant.xlsx"
                    savefile="室内热环境分级数据模板.xlsx"
                }else if($("#innerwarmcomfortableparamstype option:selected").text() == "室内热舒适建议"){
                    filepath = filepath+"suggest.xlsx"
                    savefile="室内热舒适建议数据模板.xlsx"
                }
                else if($("#innerwarmcomfortableparamstype option:selected").text() == "局部热不舒适"){
                    filepath = filepath+"disconfort.xlsx"
                    savefile="局部热不舒适数据模板.xlsx"
                }else if($("#innerwarmcomfortableparamstype option:selected").text() == "不同气候区室内温度设计"){
                    filepath = filepath+"diffrent.xlsx"
                    savefile="不同气候区室内温度设计数据模板.xlsx"
                }
                else{ 
                    filepath = filepath+"building.xlsx"
                    savefile="不同建筑的操作温度数据模板.xlsx"
                }
        }
    }
    else {
        if($("#meteorologicalyeartype option:selected").text() == "典型气象年"){
            filepath = filepath+"typical.xlsx"
            savefile="典型年数据模板.xlsx"
        }else if($("#meteorologicalyeartype option:selected").text() == "极端气象年"){
            if($("#extrememeteorologicalyeartype option:selected").text() == "空调负荷极端年"){
                filepath = filepath+"extreme.xlsx"
                savefile="空调负荷极端年数据模板.xlsx"
            }else {
                filepath = filepath+"extreme.xlsx"
                savefile="室内过热极端年数据模板.xlsx"
            }   
        }
        else if($("#meteorologicalyeartype option:selected").text() == "未来气象年"){
            filepath = filepath+"weilai.xlsx"
            savefile="未来气象年数据模板.xlsx"
        }
        
    }

    console.log(filepath)
    if(savefile=="") alert("暂无此参数的规范数据")
    else{
        let link = document.createElement("a");
        link.href = filepath;
      //对下载的文件命名
        link.download = savefile;
         document.body.appendChild(link);
         link.click();
        document.body.removeChild(link);
    }
    
}




// 原来的inputData.js

// let val=$("#datatype option:checked").text();
// if(val=='建筑节能设计参数'){
// 	$('#paramtype').show();
// 	if($("#paramtype option:checked").text()=='室外参数'){
// 		$('#outerparam').show();
// 		$('#innnerparam').hide();
// 	}
// 	else if($("#paramtype option:checked").text()=='室内参数'){
// 		$('#outerparam').hide();
// 		$('#innnerparam').show();
// 	}
// 	else if($("#paramtype option:checked").text()=='建筑能耗模拟气象年'){
// 		$('#outerparam').hide();
// 		$('#innnerparam').hide();
// 	}
// }

// function liveSelected(){
// 	let val=$("#datatype option:checked").text();
// 	if(val=='建筑节能设计参数'){
// 		$('#paramtype').show();
// 		if($("#paramtype option:checked").text()=='室外参数'){
// 			$('#outerparam').show();
// 			$('#innnerparam').hide();
// 			if($("#outerparam option:checked").text()=='民用建筑热工设计'){
// 				$('#personHotdesign').show();
// 			}			
// 		}
// 		else if($("#paramtype option:checked").text()=='室内参数'){
// 			$('#outerparam').hide();
// 			$('#innnerparam').show();
// 			$('#personHotdesign').hide();
// 		}
// 		else if($("#paramtype option:checked").text()=='建筑能耗模拟气象年'){
// 			$('#outerparam').hide();
// 			$('#innnerparam').hide();
// 		}
// 	}
// }

// function typeSelected(){
// 	if($("#paramtype option:checked").text()=='室外参数'){
// 			$('#outerparam').show();
// 			$('#innnerparam').hide();
// 			if($("#outerparam option:checked").text()=='民用建筑热工设计'){
// 				$('#personHotdesign').show();
// 			}
// 	}
// 	else if($("#paramtype option:checked").text()=='室内参数'){
// 		$('#outerparam').hide();
// 		$('#innnerparam').show();
// 		$('#personHotdesign').hide();
// 	}
// 	else if($("#paramtype option:checked").text()=='建筑能耗模拟气象年'){
// 		$('#outerparam').hide();
// 		$('#innnerparam').hide();
// 		$('#personHotdesign').hide();
// 	}
// }

// function outerParamSelected(){
// 	if($("#outerparam option:checked").text()=='民用建筑热工设计'){
// 		$('#personHotdesign').show();
// 	}
// 	else{
// 		$('#personHotdesign').hide();
// 	}
// }

// var table;
// var searchFlag;
// var pageFlag = false;
// function closeDialog() {
//     $('#showUserDialog').modal('hide');
// }
// function importExcel(){
//     $('#showUserDialog').modal({
//         show : true,
//         backdrop : 'static'
//     });
// }
// function closeModal(){
//     $('#showUserDialog').modal('hide');
//     window.location.reload();
// }



//  /*$(function() {
//    $('#fileUpload').click(function(){
//         var name =$("#fileUpload")[0].files[0];
//         if(!name){
//             $("#uploadExcel").attr("disabled",false);
//         }
//     })*/ 
//     function upload(){
//     	if($("#paramtype option:checked").text()=='建筑能耗模拟气象年'){
//     		uploadSome();
//     	}
//     }
//     function uploadone(){
//         var formData = new FormData();
//         var name = $("#fileUpload").val();
//         var fileName=$("#fileUpload")[0].files[0];

//         if(fileName==undefined){
//             $("#console").html("请先选择正确的导入文件");
//         }
//         else{
//             var point=fileName.name.lastIndexOf(".");
//             var type=fileName.name.substr(point);

//             if(type==".xls"||type==".xlsx"){
//                 $("#console").html("");
//                 $("#showUserDialog").attr("disabled","disabled");
//                 formData.append("file",$("#fileUpload")[0].files[0]);
//                 formData.append("name",name);//这个地方可以传递多个参数
//                 var contextPath = "/apis/building";
//                 var action;
//                 if($("#personHotdesign option:checked").text()=='自然通风设计室外参数'){
//                     action='ocpnvd'
//                 }
//                 else if($("#personHotdesign option:checked").text()=='围护结构隔热设计室外参数'){
//                     action='otmcc'
//                 }
//                 alert(action);
//                 $.ajax({
//                     url : contextPath + "/importExcel/uploadExcel?action="+action,
//                     type : 'POST',
//                     dataType: "json",
//                     async : false,
//                     data : formData,
//                     processData : false,
//                     contentType : false,
//                     success : function(result) {
//                         console.log(result);
//                         $("#uploadState").prepend(result.count);
//                         $("#console").prepend(result.message+"\n");
//                     }
//                 });

//                 var timer = setInterval(function() {
//                     $.ajax({
//                         url : contextPath + "/importExcel/test",
//                         dataType: "json",
//                         success : function(result) {
//                             $("#progress").width(result.flag+"%");
//                             $("#fontSize").html(result.flag+"%");
//                             if (result.code ==1) {
//                                 clearInterval(timer);
//                             }
//                             if(result.flag==100){
//                                   $("#uploadState").show();
//                             }
//                         }
//                     });
//                 }, 200);
//             }
//             else{
//                 $("#console").html("请先选择正确的导入文件");
//             }
//         }
//     } 

//     function uploadSome(){
//     	var formData = new FormData();
//         var name = $("#fileUpload").val();
//         var fileName=$("#fileUpload")[0].files[0];   
//         console.log(name);
//         console.log(fileName); 
//         if(fileName==undefined){
//             $("#console").html("请先选择正确的导入文件");
//         }
//         else{
//             var point=fileName.name.lastIndexOf(".");
//             var type=fileName.name.substr(point);

//             if(type==".xls"||type==".xlsx"){
//                 $("#console").html("");
//                 $("#showUserDialog").attr("disabled","disabled");
//                 formData.append("file",$("#fileUpload")[0].files[0]);
//                 formData.append("name",name);//这个地方可以传递多个参数
//                 var contextPath = "/apis/building";
//                 var action;
//                 if($("#personHotdesign option:checked").text()=='自然通风设计室外参数'){
//                     action='ocpnvd'
//                 }
//                 else if($("#personHotdesign option:checked").text()=='围护结构隔热设计室外参数'){
//                     action='otmcc'
//                 }
//                 alert(action);
//                 $.ajax({
//                     url : contextPath + "/importExcel/uploadExcel?action="+action,
//                     type : 'POST',
//                     dataType: "json",
//                     async : false,
//                     data : formData,
//                     processData : false,
//                     contentType : false,
//                     success : function(result) {
//                         console.log(result);
//                         $("#uploadState").prepend(result.count);
//                         $("#console").prepend(result.message+"\n");
//                     }
//                 });

//                 var timer = setInterval(function() {
//                     $.ajax({
//                         url : contextPath + "/importExcel/test",
//                         dataType: "json",
//                         success : function(result) {
//                             $("#progress").width(result.flag+"%");
//                             $("#fontSize").html(result.flag+"%");
//                             if (result.code ==1) {
//                                 clearInterval(timer);
//                             }
//                             if(result.flag==100){
//                                   $("#uploadState").show();
//                             }
//                         }
//                     });
//                 }, 200);
//             }
//             else{
//                 $("#console").html("请先选择正确的导入文件");
//             }
//         }
//     }