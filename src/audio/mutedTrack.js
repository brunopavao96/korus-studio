export function mutedTrack(track, slider) {
    if (track.volumeAntesMute !== null){
        return;
    }

    track.volumeAntesMute = track.audio.volume;

    track.audio.volume = 0;
    slider.value = 0;
}

export function unmutedTrack(track, slider) {
    if (track.volumeAntesMute === null){
        return;
    }
    track.audio.volume = track.volumeAntesMute;
    slider.value = track.volumeAntesMute * 100;
    track.volumeAntesMute = null;
}

