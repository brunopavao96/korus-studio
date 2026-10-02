import { elements } from "../elements.js";
import { renderLibrary } from "./renderLibrary.js";

export async function libraryLoad() {

    elements.playerScreen.classList.add("hidden");

    const user = JSON.parse(
    localStorage.getItem("korusUser")
);

    if (!user) {
        console.error("Nenhum usuário está logado.");
        return;
    }

    const storageKey = `korus_songs_${user.id}`;

    let library = JSON.parse(
        localStorage.getItem(storageKey)
    ) || [];

    library.sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    renderLibrary(library);
}