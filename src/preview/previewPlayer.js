export const previewPlayer = new Audio();

previewPlayer.volume = 0.6;

let previewObjectUrl = null;

export function setPreviewFile(file) {

    if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        previewObjectUrl = null;
    }

    previewObjectUrl = URL.createObjectURL(file);

    previewPlayer.src = previewObjectUrl;
    previewPlayer.currentTime = 0;
}

export function clearPreview() {

    previewPlayer.pause();

    previewPlayer.currentTime = 0;

    previewPlayer.src = "";

    if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        previewObjectUrl = null;
    }
}