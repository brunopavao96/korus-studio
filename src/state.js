export const state = {
    libraryPath: `songs/library.json`,
    library: [],
    currentSong: null,

    audioTracks: [],

    currentTrack: null,
    progressTrack: null,
    durationTrack: null,

    tracksInSolo: [],
    volumesAntesDoSolo: {},

    pitch: 0,
    nodesStarted: false
};