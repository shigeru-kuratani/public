/* JavaScript document */

$(function() {

	/**
	 * オーナーボタン押下
	 */
	$("#profileButton").on("click", function() {

		var winWidth  = $(window).width();
		var winHeight = $(window).height();
		var docHeight = $(document).height();
		var offsetTop = $(window).scrollTop();

		// 黒バック表示
		// backGroundObj = $("<div/>").css({backgroundColor: "#000", opacity: 0})
		// 				.attr("id", "bgProfile");
		// backGroundObj.css({width: winWidth, height: (docHeight > winHeight ? docHeight : winHeight)});
		// backGroundObj.css({position: "absolute", top: 0, left: 0});
		// $("body").append(backGroundObj);
		// backGroundObj.animate({
		// 	opacity: 0.7
		// }, 500 );

		// メールフォーム表示
		profileContainer = $("<div/>").attr("id", "profileContainer");
		profileContainer.load("./template/profile.html");
		$('body').append(profileContainer);
		var profileWidth  = 750;
		var profileTop  = 100 + offsetTop;
		var profileLeft = profileWidth >= winWidth ? 0 : (winWidth - profileWidth) / 2;
		profileContainer.css({top: profileTop, left: profileLeft});
		profileContainer.animate({
			opacity: 1.0, top: 50 + offsetTop
		}, 750 );
	});

	/**
	 * クローズボタン押下
	 */
	$(document).on("click", "#close", function() {
		$('#profileContainer').fadeOut("slow", function(){$(this).remove()});
		// $('#bgProfile').fadeOut("slow", function(){$(this).remove()});
	});


});