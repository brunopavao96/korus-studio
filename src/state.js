import { generatePlaylistName } from "./playlist/generatePlaylistName.js";

export const state = {
    libraryPath: `songs/library.json`,
    library: [],
    currentSong: null,
    audioTracks: [],
    currentTrack: null,
    progressTrack: null,
    durationTrack: null,
    tracksInSolo: [],
    pitch: 0,
    nodesStarted: false,
    
    lyrics: [],
    lyricElements: [],
    activeLyric: -1,
    lyricsPreviewTime: 1.5,

    playlists: [],
    currentPlaylist: null,
};