import { stopTracks } from "../player/actions.js";
import { clearPlayer } from "../player/clearPlayer.js";
import { elements } from "../elements.js";
import { libraryLoad } from "./libraryLoad.js";

export function backLibrary(){
    
    stopTracks();
    clearPlayer();
    libraryLoad();
}