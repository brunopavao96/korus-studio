export function bindTrackEvents(tracksElements) {

    tracksElements.forEach( track => {

        track.slider.addEventListener('input', () => {

            track.audio.volume = track.slider.value / 100;

        });
    });

}
