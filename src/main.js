import { libraryLoad } from "./library/libraryLoad.js";
import { resetPreview } from "./preview/resetPreview.js";
import { setupSpaceControl } from "./keyboardControls/spaceControl.js";
import { createPlaylist } from "./playlist/createPlaylist.js";

createPlaylist();
setupSpaceControl()
resetPreview();
libraryLoad();