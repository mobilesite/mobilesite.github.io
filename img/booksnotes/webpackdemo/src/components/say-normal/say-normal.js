'use strict';
module.exports = function (containerId, msg) {
    var msgNode = document.createElement('p');
    msgNode.innerHTML = msg;
    document.getElementById(containerId).appendChild(msgNode);
}
