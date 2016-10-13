const TRACK_CLICKS_ATTRIBUTE_NAME = 'track-click';

const elementsToTrack = document.querySelectorAll(`[${TRACK_CLICKS_ATTRIBUTE_NAME}]`);
const trackClick = e => {
    const elemId = e.target.id;
    if (elemId) analytics.track(`Clicked on ${elemId}`)
};

for (let el of elementsToTrack) el.addEventListener('click', trackClick);