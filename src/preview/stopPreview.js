import { elements } from "../elements.js";
import { resetPreview } from "./resetPreview.js";

export function stopPreview(){

    elements.coverCard.src = '';
    elements.titleCard.textContent = '';
    elements.artistCard.textContent = '';
    elements.durationCard.textContent = '';

    resetPreview();
}