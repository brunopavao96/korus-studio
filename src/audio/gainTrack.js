export function toggleTrackMute(trackAudio, trackSlider, trackName){
    if(trackAudio.muted === undefined){
        trackSlider.dataset.oldVolume = trackSlider.value;
    }
    trackAudio.muted = !trackAudio.muted;
    trackName.classList.toggle('muted-active', trackAudio.muted);
    if(trackAudio.muted){
        trackSlider.dataset.oldVolume = trackSlider.value;
        trackSlider.value = 0;
    } else {
        trackSlider.value = trackSlider.dataset.oldVolume || 100; 
    }
}