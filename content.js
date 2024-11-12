// content.js
const removeVideos = () => {
    const videos = document.querySelectorAll('ytd-rich-item-renderer');

    videos.forEach(video => {
        const vid = video.querySelector('span.ytd-thumbnail-overlay-time-status-renderer');

        if (vid && !vid.innerText.includes('s')) {
            video.remove(); // remove the video from the DOM
        }
    });
};

const disableScrollBelowShort = () => {
    const shorts = document.querySelector("#contents > ytd-rich-section-renderer:nth-child(2)");

    if (shorts) {
        const parent = document.querySelector("#contents"); // get parent
        const shortBottom = shorts.offsetHeight + shorts.offsetHeight; // get height

        parent.style.maxHeight = `${shortBottom}px`; // set heigh
        parent.style.overflow = "hidden"; // hide content below  shorts
    }
};

const removeHeader = () => { // hide top categories selection
    const header = document.querySelector("#header");
    if (header) {
        header.remove(); // remove the header
    }
};

const removeRichShelfHeader = () => { // hide short logo and X button
    const richShelfHeader = document.querySelector("#rich-shelf-header");
    if (richShelfHeader) {
        richShelfHeader.remove(); // remove the header
    }
};

// function call to remove the videos and the header
removeVideos();
disableScrollBelowShort(); 
removeHeader(); 
removeRichShelfHeader(); 

// remove newly loaded ones
const observer = new MutationObserver(() => {
    disableScrollBelowShort(); 
    removeRichShelfHeader(); 
});

// watch for child nodes being added
const config = { childList: true, subtree: true };
observer.observe(document.body, config);
