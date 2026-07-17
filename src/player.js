import { formatTime } from "./utils.js";
import { state } from "./state.js";
import { elements } from "./elements.js";
import { backLibrary } from "./main.js";


export async function renderSong (song){
    renderHeader(song);
    renderControls();
    renderProgress();
    renderTracks(song);    
    await renderLyrics(song);
}

export function renderHeader(song){

    elements.songTitle.textContent = song.title;
    elements.songArtist.textContent = song.artist;

}

export function renderTracks(song){
    elements.backButton.addEventListener('click', backLibrary)
    song.tracks.forEach(track => {
        const trackElement = document.createElement('div');
        const trackName = document.createElement('span');
        const trackSlider = document.createElement('input');
        const trackAudio = document.createElement('audio');
        trackAudio.src = `${state.currentSong}/tracks/${track.file}`;
        trackAudio.preload = "auto";
        if (state.audioTracks.length === 0) {

        trackAudio.addEventListener("loadedmetadata", () => {
            state.durationTrack.textContent = formatTime(trackAudio.duration);
        });
        trackAudio.addEventListener("timeupdate", () => {
            state.atualTrack.textContent = formatTime(trackAudio.currentTime);
            state.progressTrack.value = (trackAudio.currentTime / trackAudio.duration) * 100;
        });
    }
        state.audioTracks.push(trackAudio);
        trackSlider.type = "range";
        trackSlider.min = 0;
        trackSlider.max = 100;
        trackSlider.value = 100;
        trackSlider.addEventListener('input', () => {
            trackAudio.volume = trackSlider.value / 100;
        });
        trackName.textContent = track.name;
        trackElement.appendChild(trackName);
        trackElement.appendChild(trackSlider);
        elements.trackContainer.appendChild(trackElement);
    });
}

export function renderControls (){
    const playButton = document.createElement('button');
    const pauseButton = document.createElement('button');
    const stopButton = document.createElement('button');
    playButton.textContent = 'Play';
    pauseButton.textContent = 'Pause';
    stopButton.textContent = 'Stop';
    playButton.addEventListener('click', playTracks);
    pauseButton.addEventListener('click', pauseTracks);
    stopButton.addEventListener('click', stopTracks);
    elements.playerControls.appendChild(playButton);
    elements.playerControls.appendChild(pauseButton);
    elements.playerControls.appendChild(stopButton);
}1

export function renderProgress(){
    state.atualTrack = document.createElement('span');
    state.progressTrack = document.createElement('input'); 
    state.durationTrack = document.createElement('span');
    state.progressTrack.type = "range";
    state.progressTrack.max = 100;
    state.progressTrack.min = 0;
    state.progressTrack.value = 0;
    state.atualTrack.textContent = "00:00";
    state.durationTrack.textContent = "00:00";
    state.progressTrack.addEventListener('input', () => {
        state.audioTracks.forEach(audio => {
            audio.currentTime = (progressTrack.value / 100) * audio.duration
        })
    })
    elements.sliderProgress.appendChild(state.atualTrack);
    elements.sliderProgress.appendChild(state.progressTrack);
    elements.sliderProgress.appendChild(state.durationTrack);
}

async function renderLyrics(song){
    const response = await fetch(`${state.currentSong}/${song.lyrics}`);
    const lyrics = await response.text();
    elements.containerLyrics.textContent = lyrics;
}

export function clearPlayer(){
    elements.trackContainer.innerHTML = '';
    elements.playerControls.innerHTML = '';
    elements.sliderProgress.innerHTML = '';
    elements.containerLyrics.innerHTML = '';

    state.audioTracks.length = 0;
}

export function playTracks(){
    state.audioTracks.forEach( audio => {
        
        audio.play();
    })
};

export function pauseTracks(){
    state.audioTracks.forEach( audio => {
        audio.pause();
    })
}

export function stopTracks(){
    state.audioTracks.forEach( audio => {
        audio.pause();
        audio.currentTime = 0;
    })
}




