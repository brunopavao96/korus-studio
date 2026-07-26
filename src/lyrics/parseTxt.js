export function parseTxt(text) {

    return text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "")
        .map(line => ({
            time: 0,
            text: line
        }));

}