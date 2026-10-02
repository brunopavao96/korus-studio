import { elements } from "../elements.js";
import { clearPreview } from "./previewPlayer.js";

export function stopPreview() {

    clearPreview();

    elements.coverCard.src =
        "../assets/logo.png";

    elements.titleCard.textContent =
        "";

    elements.artistCard.textContent =
        "Escolha sua música";

    elements.durationCard.textContent =
        "";
}