// Initialize button with user's preferred color

function handleFormSubmission() {

    let myForm = document.forms["tabReason"];
    let myInput = myForm["reasonInput"].value;

    chrome.storage.sync.get("latestOpenedTab", (result) => {
        console.log("get latestOpenedTab in popup.js did work/trigger")
        let myTabID = result["latestOpenedTab"];
        chrome.storage.sync.set({[myTabID]: myInput});
        let intTabID = parseInt(myTabID);
        chrome.action.setTitle({tabId: intTabID, title: myInput});
    });
};

let myForm = document.forms["tabReason"];
myForm.addEventListener("submit", handleFormSubmission);
//chrome.storage.sync.get("color", ({ color }) => {
//    changeColor.style.backgroundColor = color;
//});
//
//// When the button is clicked, inject setPageBackgroundColor into current page
//myForm.onsubmit("click", async () => {
//    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//
//    chrome.scripting.executeScript({
//        target: { tabId: tab.id },
//        function: setPageBackgroundColor,
//    });
//});
//
//// The body of this function will be executed as a content script inside the
//// current page
//function setPageBackgroundColor() {
//    chrome.storage.sync.get("color", ({ color }) => {
//        document.body.style.backgroundColor = color;
//    });
//}