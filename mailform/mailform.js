/* JavaScript document */

/**********************************************
* mailform.js
* 【機能】
* 1.メールフォーム表示処理
* 2.メールフォームリセット処理
* 3.メールフォーム削除処理
**********************************************/
$(function() {

	/**
	 * お問合せボタン押下
	 */
	$("#contact").on("click", function() {

		var winWidth  = $(window).width();
		var winHeight = $(window).height();
		var docHeight = $(document).height();
		var offsetTop = $(window).scrollTop();

		// 黒バック表示
		backGroundObj = $("<div/>").css({backgroundColor: "#000", opacity: 0})
						.attr("id", "bgMailform");
		backGroundObj.css({width: winWidth, height: (docHeight > winHeight ? docHeight : winHeight)});
		backGroundObj.css({position: "absolute", top: 0, left: 0});
		$("body").append(backGroundObj);
		backGroundObj.animate({
			opacity: 0.7
		}, 500 );

		// メールフォーム表示
		mailformContainer = $("<div/>").attr("id", "mailformContainer");
		mailformContainer.load("./mailform/template/input.html");
		$('body').append(mailformContainer);
		var mailformWidth  = 550;
		var mailformTop  = 50 + offsetTop;
		var mailformLeft = mailformWidth >= winWidth ? 0 : (winWidth - mailformWidth) / 2;
		mailformContainer.css({top:mailformTop, left:mailformLeft});
		mailformContainer.animate({
			opacity: 1.0
		}, 1000 );

	});

	/**
	 * クローズボタン押下
	 */
	$(document).on("click", "#close", function() {
		$('#mailformContainer').fadeOut("slow", function(){$(this).remove()});
		$('#bgMailform').fadeOut("slow", function(){$(this).remove()});
	});

	/**
	 * リセットボタン押下
	 */
	$(document).on("click", "#reset", function() {
		clear();
	});

	/**
	 * 入力フォームクリア
	 */
	var clear = function() {
		// 氏名
		$("#name").val("");
		// メールアドレス
		$("#mailaddress").val("");
		// 内容
		$("#content").val("");
	}

	// 氏名
	var name;
	// メールアドレス
	var mailaddress;
	// 問合せ内容
	var content;

	/**
	 * 確認ボタン押下
	 */
	$(document).on("click", "#confirm", function() {

		//-----------------------------------//
		// パラメータ取得
		//-----------------------------------//
		// 名前
		name = $("#name").val();
		// メールアドレス
		mailaddress = $("#mailaddress").val();
		// 内容
		content = $("#content").val();

		//-----------------------------------//
		// 入力チェック
		//-----------------------------------//
		var errorFlag = false;
		var errorMessage = "";
		// 氏名（必須）
		if (name.replace(/^(\s)+/, "").replace(/^( )+/, "")
				.replace(/(\s)+$/, "").replace(/(　)+$/, "") == "") {
			errorFlag = true;
			errorMessage += "氏名を入力してください<br>";
		}
		// メールアドレス（必須）
		if (mailaddress.replace(/^(\s)+/, "").replace(/^( )+/, "")
					   .replace(/(\s)+$/, "").replace(/(　)+$/, "") == "") {
			errorFlag = true;
			errorMessage += "メールアドレスを入力してください<br>";
		// メールアドレス（形式）
		} else if (!mailaddress.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/)) {
			errorFlag = true;
			errorMessage += "メールアドレスの形式が間違っています<br>";
		}
		// 問合せ内容（必須）
		if (content.replace(/^(\s)+/, "").replace(/^( )+/, "")
				　　.replace(/(\s)+$/, "").replace(/(　)+$/, "") == "") {
			errorFlag = true;
			errorMessage += "内容を入力してください<br>";
		}

		// エラー判定
		if (errorFlag) {
			$("#errorMessage").html(errorMessage);
			return false;
		}

		//-----------------------------------//
		// 画面表示
		//-----------------------------------//
		mailformContainer.load("./mailform/template/confirm.html", function() {
			// 名前
			$("#name").text(name);
			// メールアドレス
			$("#mailaddress").text(mailaddress);
			// 問合せ内容
			$("#content").html(content.replace(/\r|\n|\r\n/, "<br>"));
		});
	});

	/**
	 * 戻るボタン押下
	 */
	$(document).on("click", "#confirmBack", function() {

		mailformContainer.load("./mailform/template/input.html", function() {
			// 名前
			$("#name").val(name);
			// メールアドレス
			$("#mailaddress").val(mailaddress);
			// 問合せ内容
			$("#content").val(content);
		});
	});

	/**
	 * 送信ボタン押下
	 */
	$(document).on("click", "#send", function() {

		// 送信データの生成
		var data = {
			"subject"     : "skuratani.netから問合せ",
			"name"        : name,
			"mailaddress" : mailaddress,
			"content"     : "Shigeru Kuratani.netから問合せがありました。" + "\n"
							+ "【氏名】" + name + "\n"
							+ "【メールアドレス】" + mailaddress + "\n"
							+ "【内容】" + "\n" + content
		};
		
		// ajax通信
		var url = "https://sm.skuratani.net";
		$.ajax({
				type     : "POST",
				url      : url,
				data     : data,	
				dataType : "json",
				success  : function(data) {
					mailformContainer.load("./mailform/template/complete.html");
				},
				error    : function() {
					mailformContainer.load("./mailform/template/error.html");
				}
		});
	});

});



