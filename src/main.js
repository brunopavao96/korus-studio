import { libraryLoad } from "./library/libraryLoad.js";
import { resetPreview } from "./preview/resetPreview.js";
import { setupSpaceControl } from "./keyboardControls/spaceControl.js";
import { playlistActions } from "./playlist/playlistActions.js";
import "./library/adicionarMusica.js";


playlistActions();
setupSpaceControl()
resetPreview();
libraryLoad();