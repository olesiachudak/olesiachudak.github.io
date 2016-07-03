$(document).ready(function () {
	function height () {
		var windowHeight = $(window).height();
		$('header').css({'height': windowHeight});
	}
	height();
	$(window).resize(function () {
		height();
	});
});