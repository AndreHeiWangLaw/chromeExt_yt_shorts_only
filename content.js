const removeVideos = () => {
    const videos = document.querySelectorAll('ytd-rich-item-renderer');

    videos.forEach(video => {
        const vid = video.querySelector('span.ytd-thumbnail-overlay-time-status-renderer');

        // Remove regular videos (non-Shorts)
        if (vid && !vid.innerText.includes('s')) {
            video.remove(); // Completely remove the video from the DOM
        }
    });
};

const removeRichShelfHeader = () => {
    const richShelfHeader = document.querySelector("#rich-shelf-header");
    if (richShelfHeader) {
        richShelfHeader.remove(); // Remove the header
    }
};

const disableScrollBelowSecondElement = () => {
    const secondElement = document.querySelector("#contents > ytd-rich-section-renderer:nth-child(2)");

    if (secondElement) {
        // Set the maximum height to the second element's bottom offset
        const parent = document.querySelector("#contents");
        const secondElementBottom = secondElement.offsetHeight + secondElement.offsetHeight;

        // Apply the styles to the parent container to prevent scrolling below the second element
        parent.style.maxHeight = `${secondElementBottom}px`;
        parent.style.overflow = "hidden"; // Hide the content below the second element
    }
};

const removeHeader = () => {
    const header = document.querySelector("#header");
    if (header) {
        header.remove(); // Remove the header
    }
};

// Initially remove the videos and the header
removeVideos();
removeRichShelfHeader();
disableScrollBelowSecondElement();
removeHeader();


// Create a MutationObserver to watch for new video elements and the rich shelf header
const observer = new MutationObserver(() => {
    removeVideos();
    removeRichShelfHeader();
    disableScrollBelowSecondElement();
    removeHeader();

});

// Configure the observer to watch for child nodes being added to the body or specific containers
const config = { childList: true, subtree: true };
observer.observe(document.body, config);
