// Checking page title
alert('1');

chrome.webNavigation.onCompleted.addListener(function(details) {
    //chrome.tabs.executeScript(details.tabId, {
    //code: ' if (document.body.innerText.indexOf("Cat") !=-1) {' +
    //'     alert("Cat not found!");' +
    //' }'
    //});
    alert('load');
}, {
    url: [{
            // Runs on example.com, example.net, but also example.foo.com
            hostContains: '.example.'
    },]
});
//Creating Elements
var btn = document.createElement("BUTTON");
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
//Appending to DOM 
document.body.appendChild(btn);

