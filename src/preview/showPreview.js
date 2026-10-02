import { elements } from "../elements.js";
import {
    getTrack,
    getCover
} from "../library/musicStorage.js";
import {
    previewPlayer,
    setPreviewFile,
    clearPreview} from "./previewPlayer.js";

let hoverTimer = null;

export async function showPreview(song) {

    clearTimeout(hoverTimer);

    clearPreview();


    if (!song.folder) {

        elements.coverCard.src =
        "../assets/logo.png";

        elements.titleCard.textContent =
            song.title;

        elements.artistCard.textContent =
            song.artist;

        elements.durationCard.textContent =
            "";

        try {

            const user = JSON.parse(
                localStorage.getItem("korusUser")
            );

            if (!user) {
                return;
            }

            const coverResult =
    await getCover(
        user.id,
        song.id
    );

if (coverResult && coverResult.file) {

    elements.coverCard.src =
        URL.createObjectURL(
            coverResult.file
        );

}

            let result = await getTrack(
                user.id,
                song.id,
                "vocal"
            );

            if (!result) {
                result = await getTrack(
                    user.id,
                    song.id,
                    "baixo"
                );
            }

            if (!result) {
                result = await getTrack(
                    user.id,
                    song.id,
                    "bateria"
                );
            }

            if (!result) {
                result = await getTrack(
                    user.id,
                    song.id,
                    "outros"
                );
            }

            if (!result || !result.file) {
                console.log(
                    "Nenhuma trilha encontrada para preview."
                );
                return;
            }

            setPreviewFile(result.file);

            hoverTimer = setTimeout(() => {

                previewPlayer.play().catch(error => {

                    console.log(
                        "Preview não pôde iniciar:",
                        error
                    );

                });

            }, 300);

        } catch (error) {

            console.error(
                "Erro ao carregar preview:",
                error
            );
        }

        return;
    }



    try {

        const response = await fetch(
            `songs/${song.folder}/song.json`
        );

        if (!response.ok) {

            throw new Error(
                "Não foi possível carregar song.json"
            );

        }

        const songData =
            await response.json();

        elements.coverCard.src =
            songData.cover
                ? `songs/${song.folder}/${songData.cover}`
                : "../assets/logo.png";

        elements.titleCard.textContent =
            songData.title;

        elements.artistCard.textContent =
            songData.artist;

        elements.durationCard.textContent =
            songData.duration || "";

        if (songData.preview) {

            previewPlayer.src =
                `songs/${song.folder}/${songData.preview}`;

            hoverTimer = setTimeout(() => {

                previewPlayer.play().catch(() => {});

            }, 300);
        }

    } catch (error) {

        console.error(
            "Erro no preview:",
            error
        );
    }
}