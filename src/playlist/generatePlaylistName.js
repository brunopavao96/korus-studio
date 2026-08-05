import { state } from "../state.js";

export function generatePlaylistName(){
    const baseName = "Playlist";
    const areadyExists = state.playlists.some( playlist => playlist.name === baseName );
    if(!areadyExists){
        return baseName;
    }
    let counter = 1;
    while (
        state.playlists.some( playlist => playlist.name === `${baseName} ${counter}`)
    ) {
        counter++
    }

    return `${baseName} ${counter}`;
}