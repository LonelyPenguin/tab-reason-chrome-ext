
chrome.tabs.onCreated.addListener((tab) => {
    var myTabID = tab.id.toString();

    chrome.storage.sync.set({ "latestOpenedTab": myTabID }, function () {
        console.log("key: " + "latestOpenedTab" + " value: " + myTabID);
    });

    chrome.storage.sync.get("latestOpenedTab", result => {
        console.log(result["latestOpenedTab"]);
    });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    chrome.storage.sync.get(null, (result) => {
        console.log(result);
    });

    let myTabID = tabId.toString()
    chrome.storage.sync.remove(myTabID)

    chrome.storage.sync.get(null, (result) => {
        console.log(result);
    });
});

//chrome.tabs.onActivated.addListener((activeInfo) => {
//    let myTabID = activeInfo["tabId"].toString();
//    chrome.storage.sync.get(myTabID, (result) => {
//        let tabReason = result[myTabID];
//        let intTabID = parseInt(myTabID);
//        chrome.browserAction.setTitle({intTabID, tabReason});
//    });
//});