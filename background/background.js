chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'createTab' && msg.data.url) {
        chrome.tabs.create({
            url: msg.data.url,
        }, function() {
            sendResponse(true);
        });
        return true;
    }
});