import { elements } from "../elements.js";

export function resetPreview() {
    elements.coverCard.src = "../assets/logo.png";
    elements.artistCard.textContent = "Escolha sua música";
}