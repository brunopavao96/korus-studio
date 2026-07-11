const SONG_PATH = "songs/somebody-told-me/song.json";

const songTitleElement = document.querySelector('#song-title');
const songArtistElement = document.querySelector('#song-artist');
const trackContainer = document.querySelector('#tracks-container');



async function songLoad(){
    const response = await fetch(SONG_PATH);
    const song = await response.json();
    renderSong(song);
};

function renderSong (song){
    songTitleElement.textContent = song.title;
    songArtistElement.textContent = song.artist;
    song.tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.textContent = track.name;
        trackContainer.appendChild(trackElement)
    });
}
songLoad()
