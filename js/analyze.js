/* JavaScript Document */
var app  = "Skuratani.net";
var path = location.pathname;
var lang = window.navigator.userLanguage || window.navigator.language;
var req = new XMLHttpRequest();
req.open("POST", "https://al.skuratani.net/Logging", true);
req.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
req.send("App=" + app + "&" + "Path=" + path + "&" + "Lang=" + lang);