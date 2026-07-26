import { seekTo } from "../player/seekTo.js";

export function createLyricElement(line, index) {

    const p = document.createElement("p");

    p.className = "lyric";
    p.dataset.index = index;
    p.dataset.time = line.time;
    p.textContent = line.text;


    p.addEventListener("click", () => {

        seekTo(Number(line.time));

    });


    return p;
}