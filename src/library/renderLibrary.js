import { songLoad } from "./songLoad.js";
import { showPreview } from "../preview/showPreview.js";
import { createLibrary } from "./createLibrary.js";
import { stopPreview } from "../preview/stopPreview.js";
import { elements } from "../elements.js";
import { deleteMusic } from "./musicStorage.js";


export function renderLibrary(library) {

    elements.libraryContainer.innerHTML = "";

    let draggedCard = null;

    library.forEach(element => {

        const card =
            createLibrary(element);

        card.draggable = true;

        card.addEventListener("dragstart", event => {

            draggedCard = card;

            card.classList.add("dragging");

            event.dataTransfer.effectAllowed = "move";

        });


        card.addEventListener("dragend", () => {

            card.classList.remove("dragging");

            draggedCard = null;

        });


        card.addEventListener("dragover", event => {

            event.preventDefault();

            if (!draggedCard || draggedCard === card) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const middle =
                rect.top + rect.height / 2;

            if (event.clientY < middle) {

                elements.libraryContainer.insertBefore(
                    draggedCard,
                    card
                );

            } else {

                elements.libraryContainer.insertBefore(
                    draggedCard,
                    card.nextSibling
                );

            }

        });


        card.addEventListener("drop", event => {

            event.preventDefault();

            if (!draggedCard) {
                return;
            }

            const cards =
                [...elements.libraryContainer.children];

            const newLibrary =
                cards.map(cardElement => {

                    return library.find(
                        music =>
                            music.id == cardElement.dataset.musicId
                    );

                }).filter(Boolean);


            const user =
                JSON.parse(
                    localStorage.getItem("korusUser")
                );


            if (!user) {

                console.error(
                    "Nenhum usuário está logado."
                );

                return;
            }


            const storageKey =
                `korus_songs_${user.id}`;


            localStorage.setItem(
                storageKey,
                JSON.stringify(newLibrary)
            );


            library = newLibrary;

        });


        card.addEventListener("click", () => {

            songLoad(element);

        });


        card.addEventListener("mouseenter", () => {

            showPreview(element);

        });


        card.addEventListener("mouseleave", () => {

            stopPreview();

        });


        if (!element.folder) {

            const deleteButton =
                card.querySelector(".delete-music");


            deleteButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const deleteModal =
                        document.querySelector(
                            "#delete-modal"
                        );


                    const deleteModalMessage =
                        document.querySelector(
                            "#delete-modal-message"
                        );


                    const cancelDelete =
                        document.querySelector(
                            "#cancel-delete"
                        );


                    const confirmDelete =
                        document.querySelector(
                            "#confirm-delete"
                        );


                    deleteModalMessage.textContent =
                        `Deseja realmente excluir "${element.title}"?`;


                    deleteModal.classList.remove(
                        "hidden"
                    );


                    cancelDelete.onclick = () => {

                        deleteModal.classList.add(
                            "hidden"
                        );

                    };


                    confirmDelete.onclick = async () => {

                        deleteModal.classList.add(
                            "hidden"
                        );


                        const user =
                            JSON.parse(
                                localStorage.getItem(
                                    "korusUser"
                                )
                            );


                        if (!user) {

                            console.error(
                                "Nenhum usuário está logado."
                            );

                            return;
                        }


                        try {

                            await deleteMusic(
                                user.id,
                                element.id
                            );


                            const storageKey =
                                `korus_songs_${user.id}`;


                            let userLibrary =
                                JSON.parse(
                                    localStorage.getItem(
                                        storageKey
                                    )
                                ) || [];


                            userLibrary =
                                userLibrary.filter(
                                    music =>
                                        music.id !== element.id
                                );


                            localStorage.setItem(
                                storageKey,
                                JSON.stringify(
                                    userLibrary
                                )
                            );


                            renderLibrary(
                                userLibrary
                            );


                        } catch (error) {

                            console.error(
                                "Erro ao excluir música:",
                                error
                            );


                            alert(
                                "Não foi possível excluir a música."
                            );

                        }

                    };

                }
            );

        }


        card.dataset.musicId =
            element.id;


        elements.libraryContainer.appendChild(
            card
        );

    });

}