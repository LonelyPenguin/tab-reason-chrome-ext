
chrome.tabs.onCreated.addListener((tab) => {
    var myTabID = tab.id.toString();
    var myValue = "Hello";
    
    chrome.storage.sync.set({[myTabID]: myValue}, function () {
        console.log("key: " + myTabID + " value: " +myValue)
    });

    chrome.storage.sync.get(myTabID, result => {
        console.log(result[myTabID]);
    });
});
