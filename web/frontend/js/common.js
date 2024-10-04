function initPage(){
	if($('.header-container').length>0){
		$('.header-container').load("header.html");
	}
	if($('.side-container').length>0){
		$('.side-container').load("sidebar.html");
	}
	 $.ajaxSetup({
        async: true
    });
}
initPage();