// ==UserScript==
// @name         slither-nest
// @namespace    slither-nest.lukeeeebennett
// @version      0.0.0
// @description  slither-nest mod for slither.io lets you view your rooms ip and connect to a specific ip.
// @author       Luke Bennett <lukeeeebennettplus@gmail.com>
// @match        http://slither.io/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

(function (window) {
    // Initialization function.
    var init = function init() {
        setTimeout(function initTimout() {
            // Create new slitherNest interface.
            createSlitherNestInterface();
            return;
        }, 500);
        return;
    };

    // Create slitherNest interface.
    var createSlitherNestInterface = function configureSlitherNestInterface() {
        // Find #nick_holder container.
        var nickHolderContainer = document.getElementById('nick_holder');
        if (nickHolderContainer) {
            // Clone #nick_holder container and children.
            slitherNestHolderContainer = nickHolderContainer.cloneNode(true);
            // Configure new #slitherNest_holder container.
            slitherNestHolderContainer.id = 'slitherNest_holder';
            slitherNestHolderContainer.style.opacity = 1;
            // Create new #slitherNest_holder input.
            createSlitherNestInput(slitherNestHolderContainer.firstElementChild);
            createSlitherNestButton();
            createSlitherNestIPContainer();
            // Append new #slitherNest_holder container and children to the parent of the #nick_holder container.
            nickHolderContainer.parentElement.appendChild(slitherNestHolderContainer);
        }
        return;
    };

    // Create a new slitherNest input field.
    var createSlitherNestInput = function createSlitherNestInput(slitherNestHolderInput) {
        slitherNestHolderInput.placeholder = '0.0.0.0:420';
        slitherNestHolderInput.id = 'slitherNest';
        slitherNestHolderInput.removeAttribute('maxLength');
        return;
    };

    // Create new slitherNest button.
    var createSlitherNestButton = function createSlitherNestButton() {
        var slitherNestButton = document.createElement('button');
        slitherNestButton.innerText = 'CONNECT TO IP';
        slitherNestButton.style.position = 'relative';
        slitherNestButton.style.top = '-68px';
        slitherNestButton.style.left = '5px';
        slitherNestButton.style.height = '51px';
        slitherNestButton.style.textAlign = 'center';
        slitherNestButton.style.borderRadius = '20px';
        slitherNestButton.style.backgroundColor = '#631111';
        slitherNestButton.style.color = '#ffffff';
        slitherNestButton.style.padding = '9px';
        slitherNestButton.style.border = '0';
        slitherNestButton.style.boxShadow = '0 0 8px black';
        slitherNestButton.onclick = connect;
        document.getElementById('playh').appendChild(slitherNestButton);
        return;
    };

    // Connect function.
    var connect = function connect() {
        // Return if not ready to connect.
        if (!window.connect) {
            return;
        }
        // Retrieve current slitherNest ip address and port values.
        var slitherNestInput = document.getElementById('slitherNest');
        if (!slitherNestInput) {
            return;
        }
        var slitherNestValue = document.getElementById('slitherNest').value.split(':');
        // Return and alert if not a valid ip.
        if (slitherNestValue.length !== 2) {
            alert('<ip-address>:<port> required.');
            return;
        }
        // Conform.
        window.forcing = true;
        // Configure server object.
        if (!window.bso) {
            window.bso = {};
        }
        window.bso.ip = slitherNestValue[0];
        window.bso.po = slitherNestValue[1];
        // Begin global connect method.
        window.connect();
        checkConnectionStatusAndUpdate();
        return;
    };

    // Update global property when connection complete.
    var checkConnectionStatusAndUpdate = function checkConnectionStatus() {
        if (!window.connecting) {
            window.forcing = false;
            return;
        }
        setTimeout(checkConnectionStatusAndUpdate, 1000);
        return;
    };

    // Create the slitherNest ip container.
    var createSlitherNestIPContainer = function createSlitherNestIPContainer() {
        var slitherNestIPContainer = document.createElement('div');
        slitherNestIPContainer.id = 'slitherNestIPContainer';
        slitherNestIPContainer.style.position = 'absolute';
        slitherNestIPContainer.style.bottom = '10px';
        slitherNestIPContainer.style.textAlign = 'center';
        slitherNestIPContainer.style.width = '100%';
        slitherNestIPContainer.style.zIndex = '420';
        slitherNestIPContainer.style.color = '#ffffff';
        slitherNestIPContainer.style.visibility = 'hidden';
        slitherNestIPContainer.style.fontFamily = 'Arial, \'Helvetica Neue\', Helvetica, sans-serif';
        slitherNestIPContainer.style.userSelect = 'text';
        slitherNestIPContainer.innerText = 'IP ADDRESS: <NO-IP-ADDRESS-AVAILABLE>';
        checkCurrentIP();
        document.getElementsByTagName('body')[0].appendChild(slitherNestIPContainer);
        return;
    };

    // Poll check current IP and display results in slitherNest ip container.
    var checkCurrentIP = function checkCurrentIP() {
        var slitherNestIPContainer = document.getElementById('slitherNestIPContainer');
        if (slitherNestIPContainer) {
            if (window.bso && window.bso.ip && window.bso.po) {
                slitherNestIPContainer.innerText = 'IP ADDRESS: ' + window.bso.ip + ':' + window.bso.po;
                slitherNestIPContainer.style.visibility = 'visible';
            }
            else {
                slitherNestIPContainer.innerText = 'IP ADDRESS: <NO-IP-ADDRESS-AVAILABLE>';
                slitherNestIPContainer.style.visibility = 'hidden';
            }
        }
        setTimeout(checkCurrentIP, 5000);
        return;
    };

    // Init slitherNest.io.
    init();
    return;
})(window);
