"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var GOOGLE_API_KEY = "AIzaSyA9MWS4ro7WklvhBrPOQB_foIUl_i2e52A";
var appForm = document.querySelector("form");
var addressInput = document.getElementById("address");
var searchAddressHandler = function (e) {
    //protect page refresh everytime input new address
    e.preventDefault();
    //get value from the input of the address
    var getAddress = addressInput.value;
    //sent it to google's api ===> 
    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyA9MWS4ro7WklvhBrPOQB_foIUl_i2e52A
    //encodeURI funtion to transfer the address to be a string
    axios_1["default"]
        .get("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(getAddress) + "&key=" + GOOGLE_API_KEY)
        .then(function (response) {
        console.log(response);
    })["catch"](function (err) {
        console.log(err);
    });
};
appForm.addEventListener("submit", searchAddressHandler);
