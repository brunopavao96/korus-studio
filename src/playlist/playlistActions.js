import  { elements } from "../elements.js";
import { createPlaylist } from "./createPlaylist.js";
import { playlistArea } from "./playlistArea.js";


export function playlistActions(){
   elements.createPlaylist.addEventListener("click", createPlaylist);
   elements.buttonPlaylists.addEventListener("click", playlistArea);
}