import { libraryLoad } from "./library/libraryLoad.js";
import { resetPreview } from "./preview/resetPreview.js";
import { setupSpaceControl } from "./keyboardControls/spaceControl.js";
import { playlistActions } from "./playlist/playlistActions.js";
import "./library/adicionarMusica.js";
import { setupSongNavigation } from "./player/songNavigation.js";


playlistActions();
setupSpaceControl()
resetPreview();
libraryLoad();
setupSongNavigation()