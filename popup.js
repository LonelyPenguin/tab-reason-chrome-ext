// Initialize button with user's preferred color

function handleFormSubmission() {

    let myForm = document.forms["setTabReason"];
    let myInput = myForm["reasonInput"].value;

    chrome.storage.sync.get("latestOpenedTab", (result) => {
        console.log("get latestOpenedTab in popup.js did work/trigger")
        let myTabID = result["latestOpenedTab"];
        chrome.storage.sync.set({ [myTabID]: myInput });
        let intTabID = parseInt(myTabID);
        chrome.action.setTitle({ tabId: intTabID, title: myInput });
    });
}

(async function () {
    let queryOptions = { active: true, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    let popupTabID = tabs[0].id.toString();
    chrome.storage.sync.get([popupTabID], (result) => {
        document.getElementById("currentTabReason").innerHTML = result[popupTabID];
    });
})();

let myForm = document.forms["setTabReason"];
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