export async function connectTracks(song ,folder){
    const tracks = song.tracks.map( track => {
        const audio = new Audio(
            `songs/${folder}/tracks/${track.file}`
        );
        audio.preload = "auto";

        return {
            id: track.id,
            name: track.name,
            audio
        }
    });
    return tracks;
}