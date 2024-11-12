// background.js
chrome.action.onClicked.addListener((tab) => { // on click
    if (tab.url && tab.url.includes("youtube.com")) { // yt tab
        chrome.action.getBadgeText({ tabId: tab.id }, (badgeText) => {  // fetch badge
        if (badgeText === "ON") { 
            chrome.tabs.reload(tab.id); // reload yt page
        } else {
            chrome.scripting.executeScript({ // run content.js
                target: { tabId: tab.id },
                files: ['content.js']
            });
            chrome.action.setBadgeText({ tabId: tab.id, text: "ON" });  // update badge
            chrome.action.setBadgeBackgroundColor({ tabId: tab.id, color: [176, 176, 176, 255] });  // blue background
            chrome.action.setBadgeTextColor({ tabId: tab.id, color: [0, 0, 0, 255] }); // white text
        }
        });
    }
});
