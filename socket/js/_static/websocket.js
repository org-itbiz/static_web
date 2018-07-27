function onOpen(evt) {
    // recvMemo.text(recvMemo.text() + 'connected \r\n').html();
    // curr_ws = clearInterval(curr_ws);
}

function onClose(evt) {
    // recvMemo.text(recvMemo.text() + 'close \r\n').html();
}

function onMessage(evt) {
    var message = evt.data;

    // recvMemo.text(recvMemo.text() + message + ' \r\n').html();
}

function onError(evt) {
    console.log(evt);
    var message = evt.data;

    // recvMemo.text(recvMemo.text() + message + ' \r\n').html();
}

function sendMessage(text) {
    if (websocket == undefined) {
        console.log(text);
        alert("websocket undefined.");
    } else {
        websocket.send(text);
    }

    // recvMemo.text(recvMemo.text() + text + '\r\n').html();
}

function loadWebsocket(wsPort) {
    var wsUri = "ws://127.0.0.1:" + wsPort;

    websocket = new WebSocket(wsUri);
    websocket.onopen = function (evt) { onOpen(evt) };
    websocket.onclose = function (evt) { onClose(evt) };
    websocket.onmessage = function (evt) { onMessage(evt) };
    websocket.onerror = function (evt) { onError(evt) };
}

// web socket 연결
function currentWebsocket(wsPort) {
    if (window.WebSocket !== undefined) {
        if (typeof String.prototype.startsWith != "function") {
            String.prototype.startsWith = function (str) {
                return this.indexOf(str) == 0;
            };
        }

        window.addEventListener("load", loadWebsocket(+ wsPort), false);
    }
}

function show_console(arg) {
    // recvMemo.text(recvMemo.text() + arg + '\r\n').html();
}

// 전역변수
var websocket, recvMemo, curr_ws;

$(function () {
    recvMemo = $('#ws_debug');

    currentWebsocket(30002);
    // curr_ws = setInterval(function () {
    //     currentWebsocket(33333);
    // }, 500);
});