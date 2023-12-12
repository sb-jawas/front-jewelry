import { rolRoute } from "./routes.js"

export function navbar(username, rol){
    let nav = document.getElementById("navbar")

    nav.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand mx-3" href="#">Jawalry</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <div class="position">
                    <li class="nav-item">
                        <a class="nav-link active position-absolute top-50 start-50 translate-middle"
                            aria-current="page" href="${rolRoute[rol]}">Home</a>
                    </li>
                </div>
                <div class="position">
                    <div class="position-absolute top-50 end-0 translate-middle">
                    <li class="nav-item dropdown mx-3">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            ${username}
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="../my-profile/">Mi perfil</a></li>
                            <li><a class="dropdown-item" href="../selection-rol">Cambiar rol</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" id="logout" href="#">Cerrar sesión</a></li>
                        </ul>
                    </li>
                </div>

                </div>
            </ul>
        </div>
    </div>
</nav>`
}