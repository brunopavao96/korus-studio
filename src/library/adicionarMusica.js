import { libraryLoad } from "./libraryLoad.js";
import { elements } from "../elements.js";
import { saveTrack, saveLyrics, saveCover} from "./musicStorage.js";
import { state } from "../state.js";

const addMusicScreen = document.querySelector("#add-music-screen");
const libraryScreen = document.querySelector("#library-screen");
const addMusicButton = document.querySelector("#adicionar-musica");
const cancelAddMusic = document.querySelector("#cancel-add-music");
const cancelAddMusicBottom = document.querySelector("#cancel-add-music-bottom");
const saveMusicButton = document.querySelector("#save-music");
const musicTitle = document.querySelector("#music-title");
const musicArtist = document.querySelector("#music-artist");
const selectLyricsButton = document.querySelector("#select-lyrics");
const lyricsFileName = document.querySelector("#lyrics-file-name");
const trackButtons = document.querySelectorAll(".track-config-item button");
const selectCoverButton = document.querySelector("#select-cover");
const coverPreview = document.querySelector(".music-cover-preview");

const selectedTracks = {

    vocal: null,
    baixo: null,
    bateria: null,
    outros: null

};

let selectedLyrics = null;
let selectedCover = null;

selectedLyrics = null;
lyricsFileName.textContent = "Nenhum arquivo selecionado";

selectedCover = null;

coverPreview.innerHTML = `
    <span class="material-symbols-outlined">
        music_note
    </span>
`;

function openAddMusicScreen() {
    if (elements.addMusicScreen && !elements.addMusicScreen.classList.contains("hidden")) {
    return;
}

    if (state.audioTracks) {
        state.audioTracks.forEach(track => {
            if (track.audio) {
                track.audio.pause();
                track.audio.currentTime = 0;
            }
        });
    }
    musicTitle.value = "";
musicArtist.value = "";

selectedTracks.vocal = null;
selectedTracks.baixo = null;
selectedTracks.bateria = null;
selectedTracks.outros = null;

selectedLyrics = null;
lyricsFileName.textContent = "Nenhum arquivo selecionado";

selectedCover = null;

coverPreview.innerHTML = `
    <span class="material-symbols-outlined">
        music_note
    </span>
`;

    elements.libraryScreen.classList.add("hidden");
    elements.playerScreen.classList.add("hidden");
    addMusicScreen.classList.remove("hidden");
}

function closeAddMusicScreen() {

    addMusicScreen.classList.add("hidden");
    elements.libraryScreen.classList.remove("hidden");
    libraryLoad();
}

function selectCover() {

    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", () => {

        const file = input.files[0];

        if (!file) {
            return;
        }

        selectedCover = file;

        const imageURL =
            URL.createObjectURL(file);

        coverPreview.innerHTML = "";

        const image =
            document.createElement("img");

        image.src = imageURL;

        coverPreview.appendChild(image);

    });

    input.click();
}

function selectTrack(button, type) {

    const input = document.createElement("input");

    input.type = "file";
    input.accept = "audio/*";
    input.addEventListener("change", () => {

        const file = input.files[0];

        if (!file) {

            return;
        }

        selectedTracks[type] = file;

        const trackItem = button.closest(".track-config-item");
        const status = trackItem.querySelector("div span");

        if (status) {

            status.textContent = file.name;
        }

        button.textContent = "Selecionado";
    });

    input.click();
}

function selectLyrics() {

    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".lrc";

    input.addEventListener("change", () => {

        const file = input.files[0];

        if (!file) {
            return;
        }

        selectedLyrics = file;

        lyricsFileName.textContent = file.name;

    });

    input.click();
}


async function saveMusic() {

    const title = musicTitle.value.trim();
    const artist = musicArtist.value.trim();

    if (!title || !artist) {

        alert(
            "Preencha o nome da música e o artista."
        );

        return;
    }

    const user = JSON.parse( 
        localStorage.getItem("korusUser")
    );


    if (!user) {

        console.error(
            "Nenhum usuário está logado."
        );

        return;
    }

    const storageKey =
        `korus_songs_${user.id}`;


    const library = JSON.parse(
        localStorage.getItem(storageKey)
    ) || [];

    const music = {

        id: Date.now(),
        title: title,
        artist: artist,
        cover: null,

        tracks: {}
    };


    const userId = user.id;
    const musicId = music.id;

    if (selectedCover) {

    await saveCover(
        userId,
        musicId,
        selectedCover
    );

}

    for (const type of Object.keys(selectedTracks)) {

        const file = selectedTracks[type];


        if (!file) {

            continue;

        }


        await saveTrack(
            userId,
            musicId,
            type,
            file
        );

        music.tracks[type] =
            file.name;

            if (selectedLyrics) {

    await saveLyrics(
        userId,
        musicId,
        selectedLyrics
    );

    music.lyrics =
        selectedLyrics.name;
}
    }

    library.push(music);

    localStorage.setItem(
        storageKey,
        JSON.stringify(library)
    );


    musicTitle.value = "";
    musicArtist.value = "";
    selectedTracks.vocal = null;
    selectedTracks.baixo = null;
    selectedTracks.bateria = null;
    selectedTracks.outros = null;
    selectedLyrics = null;
    lyricsFileName.textContent = "Nenhum arquivo selecionado";

    closeAddMusicScreen();
};

addMusicButton.addEventListener(
    "click",
    openAddMusicScreen
);

cancelAddMusic.addEventListener(
    "click",
    closeAddMusicScreen
);

cancelAddMusicBottom.addEventListener(
    "click",
    closeAddMusicScreen
);

saveMusicButton.addEventListener(
    "click",
    saveMusic
);

trackButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const type =
                button.dataset.track;


            selectTrack(
                button,
                type
            );

        }
    );

});

selectLyricsButton.addEventListener(
    "click",
    selectLyrics
);

selectCoverButton.addEventListener(
    "click",
    selectCover
);