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
    if ($("#outerparamtype option:selected").text() == "民用建筑热工设计用参数") {
        $("#outpersonhotparams").show();
        $("#outpersonwarmwindparams").hide();

    } else if ($("#outerparamtype option:selected").text() == "民用建筑供暖通风与空气调节设计用参数") {
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

    } else if ($("#innerparamtype option:selected").text() == "热工设计用参数") {
        $("#innerwarmcomfortableparams").hide();
        $("#innerhotdesignparams").show();
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
    console.log(name);
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
                // console.log("室外参数");
                // $("#outerparam").show();
                if ($("#outerparamtype option:selected").text() == "民用建筑热工设计用参数") {
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

                } else if ($("#outerparamtype option:selected").text() == "民用建筑供暖通风与空气调节设计用参数") {
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
                            console.log("冬季供暖室外计算参数");
                            uploadTypicalWinterAir();
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
        url: "http://localhost:8080/building/importPersonHotDesign/upload",
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
            url: "http://localhost:8080/building/importPersonHotDesign/flag",
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
        url: "http://localhost:8080/building/importotmcc/uploadotmcc",
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
            url: "http://localhost:8080/building/importotmcc/flag",
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
        url: "http://localhost:8080/building/importocpedidocpnvdasdo/uploadocpedidocpnvdasdo?action=" + action,
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
            url: "http://localhost:8080/building/importocpedidocpnvdasdo/flag",
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
        url: "http://localhost:8080/building/importocpedidocpnvdasdo/uploadocpedidocpnvdasdo?action=" + action,
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
            url: "http://localhost:8080/building/importocpedidocpnvdasdo/flag",
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
        url: "http://localhost:8080/building/importocpedidocpnvdasdo/uploadocpedidocpnvdasdo?action=" + action + "&_t=" + new Date().getTime(),
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
            url: "http://localhost:8080/building/importocpedidocpnvdasdo/flag?_t=" + new Date().getTime(),
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
        url: "http://localhost:8080/building/importocpehhcc/uploadocpehhcc",
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
            url: "http://localhost:8080/building/importocpehhcc/flag?_t=" + new Date().getTime(),
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
        url: "http://localhost:8080/building/importocpMulGrpc/uploadocpMulGrpc",
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
            url: "http://localhost:8080/building/importocpMulGrpc/flag?_t=" + new Date().getTime(),
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
        url: "http://localhost:8080/building/importSimultaneousOccurrenceParam/uploadSimultaneousOccurrenceParam",
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
            url: "http://localhost:8080/building/importSimultaneousOccurrenceParam/flag?_t=" + new Date().getTime(),
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
        url: "http://localhost:8080/building/importTypicalMeteoroYear/uploadTypicalMeteoroYear",
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
            url: "http://localhost:8080/building/importTypicalMeteoroYear/flag?_t=" + new Date().getTime(),
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
        url: "http://localhost:8080/building/importextrememeteorologicalyearair/uploadextrememeteorologicalyearair",
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
            url: "http://localhost:8080/building/importextrememeteorologicalyearair/flag?_t=" + new Date().getTime(),
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
        url: "http://localhost:8080/building/importextrememeteorologicalyearinner/uploadextrememeteorologicalyearinner",
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
            url: "http://localhost:8080/building/importextrememeteorologicalyearinner/flag?_t=" + new Date().getTime(),
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
        url: "http://localhost:8080/building/importWinSumTypicalDesignDay/uploadTypWinHeat",
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
            url: "http://localhost:8080/building/importWinSumTypicalDesignDay/flag1?_t=" + new Date().getTime(),
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
        url: "http://localhost:8080/building/importWinSumTypicalDesignDay/uploadTrpWinAir",
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
            url: "http://localhost:8080/building/importWinSumTypicalDesignDay/flag2?_t=" + new Date().getTime(),
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