let LIBRARY_PATH = "songs/library.json";
const audioTracks = [];

let atualTrack;
let progressTrack;
let durationTrack;
let currentSong;
let library = [];


const libraryContainer = document.querySelector("#library-container");
const songTitleElement = document.querySelector("#song-title");
const songArtistElement = document.querySelector("#song-artist");
const trackContainer = document.querySelector("#tracks-container");
const playerControls = document.querySelector("#player-controls");
const sliderProgress = document.querySelector("#slider-progress");
const containerLyrics = document.querySelector(".container-lyrics");
const libraryScreen = document.querySelector("#library-screen");
const playerScreen = document.querySelector("#player-screen");
const backButton = document.querySelector("#back-button");

async function libraryLoad(){
    playerScreen.classList.add("hidden");
    const response = await fetch(LIBRARY_PATH);
    const library = await response.json();
    renderLibrary(library)
}



function backLibrary(){
    stopTracks();
    clearPlayer();
    playerScreen.classList.add("hidden");
    libraryScreen.classList.remove("hidden");
    libraryLoad();
}

function renderLibrary(library){
    library.forEach( element => {
        containerMusic = document.createElement('div');
        musicTitle = document.createElement('h3');
        musicArtist = document.createElement('span');
        musicTitle.textContent = element.title;
        musicArtist.textContent = element.artist;
        libraryContainer.appendChild(containerMusic);
        containerMusic.appendChild(musicTitle);
        containerMusic.appendChild(musicArtist);
        
        containerMusic.addEventListener('click', () => {
            songLoad(element.folder)
        })
    })
}


function clearPlayer(){
    trackContainer.innerHTML = '';
    playerControls.innerHTML = '';
    sliderProgress.innerHTML = '';
    containerLyrics.innerHTML = '';
    audioTracks.length = 0;
}

function clearList(){
    libraryContainer.innerHTML = '';
}

async function songLoad(folder){
    
    playerScreen.classList.remove("hidden");
    libraryScreen.classList.add("hidden");

    currentSong = `songs/${folder}`;

    clearList();

    const songPath = `songs/${folder}/song.json`
    const response = await fetch(songPath);
    const song = await response.json();

    await renderSong(song);
};

async function renderLyrics(song){
    const response = await fetch(`${currentSong}/${song.lyrics}`);
    const lyrics = await response.text();
    containerLyrics.textContent = lyrics;
}

async function renderSong (song){
    renderHeader(song);
    renderControls();
    renderProgress();
    renderTracks(song);    
    await renderLyrics(song);
}

function renderHeader(song){
    songTitleElement.textContent = song.title;
    songArtistElement.textContent = song.artist;

}

function renderTracks(song){
    backButton.addEventListener('click', backLibrary)
    song.tracks.forEach(track => {
        const trackElement = document.createElement('div');
        const trackName = document.createElement('span');
        const trackSlider = document.createElement('input');
        const trackAudio = document.createElement('audio');
        trackAudio.src = `${currentSong}/tracks/${track.file}`;
        trackAudio.preload = "auto";
        if (audioTracks.length === 0) {

        trackAudio.addEventListener("loadedmetadata", () => {
            durationTrack.textContent = formatTime(trackAudio.duration);
        });

        trackAudio.addEventListener("timeupdate", () => {
            atualTrack.textContent = formatTime(trackAudio.currentTime);
            progressTrack.value = (trackAudio.currentTime / trackAudio.duration) * 100;
        });

    }
        
        audioTracks.push(trackAudio);
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
    pauseButton.addEventListener('click', pauseTracks);
    stopButton.addEventListener('click', stopTracks);
    playerControls.appendChild(playButton);
    playerControls.appendChild(pauseButton);
    playerControls.appendChild(stopButton);
}

function playTracks(){
    audioTracks.forEach( audio => {
        
        audio.play();
    })
};

function pauseTracks(){
    audioTracks.forEach( audio => {
        audio.pause();
    })
}

function stopTracks(){
    audioTracks.forEach( audio => {
        audio.pause();
        audio.currentTime = 0;
    })
}

function renderProgress(){
    atualTrack = document.createElement('span');
    progressTrack = document.createElement('input'); 
    durationTrack = document.createElement('span');
    progressTrack.type = "range";
    progressTrack.max = 100;
    progressTrack.min = 0;
    progressTrack.value = 0;
    atualTrack.textContent = "00:00";
    durationTrack.textContent = "00:00";
    progressTrack.addEventListener('input', () => {
        audioTracks.forEach(audio => {
            audio.currentTime = (progressTrack.value / 100) * audio.duration
        })
    })
    sliderProgress.appendChild(atualTrack);
    sliderProgress.appendChild(progressTrack);
    sliderProgress.appendChild(durationTrack);
}

function formatTime (seconds){

    let minutes = Math.floor(seconds / 60)
    let secondsLeft = Math.floor(seconds % 60);
    
    if (secondsLeft < 10){
        secondsLeft = "0" + secondsLeft;
    };

    if (minutes < 10){
        minutes = "0" + minutes;
    }

    return `${minutes}:${secondsLeft}`
    
}

libraryLoad()