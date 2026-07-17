 export const libraryElement = {
    containerMusic: [],
    musicTitle: [],
    musicArtist: [],
    musicTitle: '',
    musicArtist: ''

};

export async function libraryLoad(){
    elements.playerScreen.classList.add("hidden");
    const response = await fetch(state.libraryPath);
    const library = await response.json();
    renderLibrary(library)
}

export function renderLibrary(library){
    library.forEach( element => {
        libraryElement.containerMusic = document.createElement('div');
        libraryElement.musicTitle = document.createElement('h3');
        libraryElement.musicArtist = document.createElement('span');
        libraryElement.musicTitle.textContent = element.title;
        libraryElement.musicArtist.textContent = element.artist;
        elements.libraryContainer.appendChild(libraryElement.containerMusic);
        libraryElement.containerMusic.appendChild(libraryElement.musicTitle);
        libraryElement.containerMusic.appendChild(libraryElement.musicArtist);
        
        libraryElement.containerMusic.addEventListener('click', () => {
            songLoad(element.folder)
        })
    })
}

export async function songLoad(folder){
    
    elements.playerScreen.classList.remove("hidden");
    elements.libraryScreen.classList.add("hidden");

    state.currentSong = `songs/${folder}`;

    clearList();

    const songPath = `songs/${folder}/song.json`
    const response = await fetch(songPath);
    const song = await response.json();

    await renderSong(song);
};

export function backLibrary(){
    stopTracks();
    clearPlayer();
    elements.playerScreen.classList.add("hidden");
    elements.libraryScreen.classList.remove("hidden");
    libraryLoad();
}

export function clearList(){
    elements.libraryContainer.innerHTML = '';
}
