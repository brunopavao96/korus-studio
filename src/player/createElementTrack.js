export function createElementTrack(track){

    const trackElement = document.createElement('div');
    trackElement.className = 'track-row';


    const trackName = document.createElement('span');
    trackName.className = 'track-name';
    trackName.textContent = track.name;


    const trackSolo = document.createElement("button");
    trackSolo.className = "track-solo";
    trackSolo.textContent = "S";


    const trackSlider = document.createElement('input');
    trackSlider.className = 'track-slider';
    trackSlider.type = "range";
    trackSlider.min = 0;
    trackSlider.max = 100;
    trackSlider.value = track.audio.volume * 100;


    trackElement.appendChild(trackName);
    
    trackElement.appendChild(trackSlider);

    trackElement.appendChild(trackSolo);


    return {
        element: trackElement,
        nomeInstrumento: trackName,
        solo: trackSolo,
        slider: trackSlider,
        track
    };
}