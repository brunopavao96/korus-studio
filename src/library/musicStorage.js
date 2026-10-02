const DB_NAME = "korusDB";
const DB_VERSION = 1;
const STORE_NAME = "tracks";


function openDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(
            DB_NAME,
            DB_VERSION
        );


        request.onupgradeneeded = () => {

            const db = request.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

                db.createObjectStore(
                    STORE_NAME,
                    { keyPath: "id" }
                );

            }

        };


        request.onsuccess = () => {

            resolve(request.result);

        };


        request.onerror = () => {

            reject(request.error);

        };

    });

}

export async function saveTrack(
    userId,
    musicId,
    type,
    file
) {

    const db = await openDatabase();


    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORE_NAME,
                "readwrite"
            );


        const store =
            transaction.objectStore(
                STORE_NAME
            );


        const id =
            `${userId}_${musicId}_${type}`;


        store.put({

            id: id,

            userId: userId,

            musicId: musicId,

            type: type,

            name: file.name,

            file: file

        });


        transaction.oncomplete = () => {

            resolve(id);

        };


        transaction.onerror = () => {

            reject(transaction.error);

        };

    });

}


export async function getTrack(
    userId,
    musicId,
    type
) {

    const db = await openDatabase();


    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORE_NAME,
                "readonly"
            );


        const store =
            transaction.objectStore(
                STORE_NAME
            );


        const id =
            `${userId}_${musicId}_${type}`;


        const request =
            store.get(id);


        request.onsuccess = () => {

            resolve(request.result);

        };


        request.onerror = () => {

            reject(request.error);

        };

    });

}

export async function getUserTracks(userId, musicId) {

    const types = [
        "vocal",
        "baixo",
        "bateria",
        "outros"
    ];

    const tracks = {};

    for (const type of types) {

        const result = await getTrack(
            userId,
            musicId,
            type
        );

        if (result) {
            tracks[type] = result.file;
        }
    }

    return tracks;
}

export async function saveLyrics(
    userId,
    musicId,
    file
) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORE_NAME,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                STORE_NAME
            );

        const id =
            `${userId}_${musicId}_lyrics`;

        store.put({
            id: id,
            userId: userId,
            musicId: musicId,
            type: "lyrics",
            name: file.name,
            file: file
        });

        transaction.oncomplete = () => {
            resolve(id);
        };

        transaction.onerror = () => {
            reject(transaction.error);
        };

    });
}

export async function getLyrics(
    userId,
    musicId
) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORE_NAME,
                "readonly"
            );

        const store =
            transaction.objectStore(
                STORE_NAME
            );

        const id =
            `${userId}_${musicId}_lyrics`;

        const request =
            store.get(id);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };

    });
}

export async function deleteMusic(
    userId,
    musicId
) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORE_NAME,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                STORE_NAME
            );

        const types = [
    "vocal",
    "baixo",
    "bateria",
    "outros",
    "lyrics",
    "cover"
];

        types.forEach(type => {

            const id =
                `${userId}_${musicId}_${type}`;

            store.delete(id);

        });

        transaction.oncomplete = () => {
            resolve();
        };

        transaction.onerror = () => {
            reject(transaction.error);
        };

    });
}

export async function saveCover(
    userId,
    musicId,
    file
) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORE_NAME,
                "readwrite"
            );

        const store =
            transaction.objectStore(
                STORE_NAME
            );

        const id =
            `${userId}_${musicId}_cover`;

        store.put({
            id: id,
            userId: userId,
            musicId: musicId,
            type: "cover",
            name: file.name,
            file: file
        });

        transaction.oncomplete = () => {
            resolve(id);
        };

        transaction.onerror = () => {
            reject(transaction.error);
        };

    });
}


export async function getCover(
    userId,
    musicId
) {

    const db = await openDatabase();

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(
                STORE_NAME,
                "readonly"
            );

        const store =
            transaction.objectStore(
                STORE_NAME
            );

        const id =
            `${userId}_${musicId}_cover`;

        const request =
            store.get(id);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };

    });
}