import { songLoad } from "./songLoad.js";
import { showPreview } from "../preview/showPreview.js";
import { createLibrary } from "./createLibrary.js";
import { stopPreview } from "../preview/stopPreview.js";
import { elements } from "../elements.js";
import { deleteMusic } from "./musicStorage.js";


export function renderLibrary(library) {

    elements.libraryContainer.innerHTML = "";


    library.forEach(element => {

        const card =
            createLibrary(element);


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


                    // Elementos do modal
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


                    // Mostra o nome da música
                    deleteModalMessage.textContent =
                        `Deseja realmente excluir "${element.title}"?`;


                    // Abre o modal
                    deleteModal.classList.remove(
                        "hidden"
                    );


                    // Cancelar
                    cancelDelete.onclick = () => {

                        deleteModal.classList.add(
                            "hidden"
                        );

                    };


                    // Confirmar exclusão
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


        elements.libraryContainer.appendChild(
            card
        );

    });

}