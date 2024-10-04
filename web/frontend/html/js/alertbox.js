var myAlert = {
    alertbox : function(alertContent){
        var windowWidth = window.innerWidth; 
            windowHeight = window.innerHeight; 
            alertContainer = document.createElement("div");
            alertContainer.id = "myAlertBox";
            alertContainer.style.cssText="position:absolute;left:0px;top:0px;width:100%;z-index:9999;";
            alertContainer.style.height = windowHeight+"px"; 
            alertOpacity = document.createElement("div");
            alertOpacity.style.cssText="position:absolute;left:0px;top:0px;width:100%;background:#000;opacity:0.5;z-index:9999;";
            alertOpacity.style.height = windowHeight+"px"; 
            alertContainer.appendChild(alertOpacity)
            alertMainBox = document.createElement("div");
            alertMainBox.style.cssText="position:absolute;width:200px;height:200px;line-height:200px;text-align:center;background:green;z-index:10000;"
            alertMainBoxLeft = (windowWidth-200)/2;
            alertMainBoxTop = (windowHeight-200)/2;
            alertMainBox.style.left = alertMainBoxLeft+"px";
            alertMainBox.style.top = alertMainBoxTop+"px";
            alertMainBox.innerHTML = alertContent;
            alertContainer.appendChild(alertMainBox);
            alertClose = document.createElement("div");
            alertClose.id = "closeBox";
            alertClose.style.cssText = "position:absolute;right:0px;top:0px;width:30px;height:30px;background:red;cursor:pointer";
            alertMainBox.appendChild(alertClose);
            document.body.appendChild(alertContainer);
            closeButton = document.getElementById("closeBox");
            console.log(closeButton)
            closeButton.onclick = function(){
                document.body.removeChild(document.getElementById("myAlertBox"));
            }
    }
}