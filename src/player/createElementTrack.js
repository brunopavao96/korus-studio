

export function createElementTrack(track){
    const trackElement = document.createElement('div');
    trackElement.className = 'track-row';

    const trackName = document.createElement('span');
    trackName.className = 'track-name';
    trackName.textContent = track.name;

    const trackSlider = document.createElement('input');
    trackSlider.className = 'track-slider';
    trackSlider.type = "range";
    trackSlider.min = 0;
    trackSlider.max = 100;
    trackSlider.value = 100;
        
    trackElement.appendChild(trackName);
    trackElement.appendChild(trackSlider);

    return { 
        trackElement,
        trackName,
        trackSlider
    }
}