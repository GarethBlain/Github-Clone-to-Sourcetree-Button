chrome.tabs.onUpdated.addListener(
  function (tabId, changeInfo, tab) {
    // Read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage(tabId, {
        message: 'URL_CHANGED'
      })
    }
  }
);