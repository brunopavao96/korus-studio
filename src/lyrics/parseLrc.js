export function parseLrc(lrc) {
    return lrc
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "")
        .map(line => {
            const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/);

            if (!match) {
                return null;
            }

            const minutes = Number(match[1]);
            const seconds = Number(match[2]);
            const centiseconds = Number(match[3]);

            return {
                time: minutes * 60 + seconds + centiseconds / 100,
                text: match[4].trim()
            };
        })
        .filter(Boolean);
}