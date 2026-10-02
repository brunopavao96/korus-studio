const startupSound = document.querySelector("#startup-sound");
startupSound.volume = 0.5;

startupSound.play().catch(() => {
    console.log("O navegador bloqueou o áudio automático.");
});

const logoutButton = document.querySelector("#logout-button");

const authScreen = document.querySelector("#auth-screen");
const app = document.querySelector("#app");

const loginContainer = document.querySelector("#login-container");
const registerContainer = document.querySelector("#register-container");

const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

const loginMessage = document.querySelector("#login-message");
const registerMessage = document.querySelector("#register-message");

const showRegister = document.querySelector("#show-register");
const showLogin = document.querySelector("#show-login");


showRegister.addEventListener("click", () => {

    loginContainer.classList.add("hidden");
    registerContainer.classList.remove("hidden");

});


showLogin.addEventListener("click", () => {

    registerContainer.classList.add("hidden");
    loginContainer.classList.remove("hidden");

});


loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.querySelector("#login-email").value;

    const password =
        document.querySelector("#login-password").value;

    loginMessage.textContent = "Entrando...";


    try {

        const response = await fetch(
            "http://localhost:3000/api/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            }
        );


        const data = await response.json();


        if (!response.ok) {

            loginMessage.textContent = data.message;

            return;
        }


        console.log(
            "Usuário logado:",
            data.user
        );


        localStorage.setItem(
            "korusUser",
            JSON.stringify(data.user)
        );


        authScreen.classList.add("hidden");
        app.classList.remove("hidden");


        const { libraryLoad } =
            await import("./library/libraryLoad.js");

        await libraryLoad();


    } catch (error) {

        console.error(error);

        loginMessage.textContent =
            "Não foi possível conectar ao servidor.";

    }

});


registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const name =
        document.querySelector("#register-name").value;

    const email =
        document.querySelector("#register-email").value;

    const password =
        document.querySelector("#register-password").value;

    const passwordConfirm =
        document.querySelector(
            "#register-password-confirm"
        ).value;


    if (password !== passwordConfirm) {

        registerMessage.textContent =
            "As senhas não são iguais.";

        return;
    }


    registerMessage.textContent =
        "Criando conta...";


    try {

        const response = await fetch(
            "http://localhost:3000/api/users",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            }
        );


        const data = await response.json();


        if (!response.ok) {

            registerMessage.textContent =
                data.message;

            return;
        }


        registerMessage.textContent =
            "Conta criada com sucesso!";


        registerForm.reset();


        setTimeout(() => {

            registerContainer.classList.add("hidden");
            loginContainer.classList.remove("hidden");

            registerMessage.textContent = "";

        }, 1000);


    } catch (error) {

        console.error(error);

        registerMessage.textContent =
            "Não foi possível conectar ao servidor.";

    }

});

const savedUser =
    localStorage.getItem("korusUser");


if (savedUser) {

    const user =
        JSON.parse(savedUser);


    console.log(
        "Usuário já está logado:",
        user
    );


    authScreen.classList.add("hidden");
    app.classList.remove("hidden");

    const { libraryLoad } =
        await import("./library/libraryLoad.js");

    await libraryLoad();

}

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("korusUser");

    location.reload();
});