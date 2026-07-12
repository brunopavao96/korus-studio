const SONG_FOLDER = "songs/somebody-told-me";
const SONG_PATH = `${SONG_FOLDER}/song.json`;
const audioTracks = [];

const songTitleElement = document.querySelector('#song-title');
const songArtistElement = document.querySelector('#song-artist');
const trackContainer = document.querySelector('#tracks-container');
const playerControls = document.querySelector("#player-controls");



async function songLoad(){
    const response = await fetch(SONG_PATH);
    const song = await response.json();
    

    renderSong(song);
};

function renderSong (song){
    renderHeader(song);
    renderTracks(song);
    renderControls();
}

function renderHeader(song){
    songTitleElement.textContent = song.title;
    songArtistElement.textContent = song.artist;
}

function renderTracks(song){
    song.tracks.forEach(track => {
        const trackElement = document.createElement('div');
        const trackName = document.createElement('span');
        const trackSlider = document.createElement('input');
        const trackAudio = document.createElement('audio');
        trackAudio.src = `${SONG_FOLDER}/tracks/${track.file}`;
        trackAudio.preload = "auto";
        audioTracks.push(trackAudio);
        trackSlider.type = "range";
        trackSlider.min = 0;
        trackSlider.max = 100;
        trackSlider.value = 100;
        trackName.textContent = track.name;
        trackElement.appendChild(trackName);
        trackElement.appendChild(trackSlider);
        trackContainer.appendChild(trackElement);
    });
}

function renderControls (){
    const playButton = document.createElement('button');
    const pauseButton = document.createElement('button');
    const stopButton = document.createElement('button');
    playButton.textContent = 'Play';
    pauseButton.textContent = 'Pause';
    stopButton.textContent = 'Stop';
    playButton.addEventListener('click', playTracks);
    //pauseButton.addEventListener('click', pauseTrack);
    //stopButton.addEventListener('click', stopTracks);
    playerControls.appendChild(playButton);
    playerControls.appendChild(pauseButton);
    playerControls.appendChild(stopButton);
}

function playTracks(){
    audioTracks.forEach( audio => {
        audio.play();
    })
};

songLoad()