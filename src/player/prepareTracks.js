import { connectTracks } from "../audio/connectTracks.js";

import { bindTrackEvents } from "./bindTrackEvents.js";

import { renderTracks } from "./renderTracks.js";

import { saveTracks } from "./saveTracks.js";

import { getUserTracks } from "../library/musicStorage.js";

export async function prepareTracks(song, folder) {

    let tracks;

    if (folder) {

        tracks = await connectTracks(
            song,
            folder
        );

    }
    else {

        const user =
            JSON.parse(
                sessionStorage.getItem("korusUser")
            );

        if (!user) {
            throw new Error(
                "Nenhum usuário está logado."
            );
        }

        const userTracks =
            await getUserTracks(
                user.id,
                song.id
            );

        tracks = Object.entries(
            userTracks
        ).map(([type, file]) => {

            const audio =
                new Audio(
                    URL.createObjectURL(file)
                );

            audio.preload = "auto";

            return {

                id: type,

                name: type,

                audio,

                volumeAntesMute: null,

                volumeAntesSolo: null

            };

        });

    }

    const trackElements =
        renderTracks(tracks);

    bindTrackEvents(
        trackElements
    );

    saveTracks(tracks);
}