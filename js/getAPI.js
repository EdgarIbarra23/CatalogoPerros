// Manejo de la API
const urlPerros = "https://dog.ceo/api/breeds/list/all";

async function getAPI(URL) {
    try {
        const res = await fetch(URL);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)        
    }
}

async function getApiDom(URL, create){
    try {
        const data = await getAPI(URL);
        const createElement = create(data);
        createElement;
    } catch (error) {
        console.log(error);
    }
}

// Creaciones y Logica para el DOM
function createList(data){
    const claves = Object.keys(data.message);
    const navLinks = document.getElementById("nav__links");

    claves.forEach( (keys) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = keys;
        a.value = keys;
        a.id = keys;
        a.href = '';
        li.appendChild(a);
        navLinks.appendChild(li);
        
        a.addEventListener("click", async (e) => {
            e.preventDefault();
            imagenRaza(e.target.value)
        });
    })
}

function createImage(dataDogs) {
    const claves = Object.keys(dataDogs.message);
    const contenido = document.getElementById("contenidoAPI");
    claves.forEach(async (keys) => {
        try {
            const imgResponse = await getAPI("https://dog.ceo/api/breed/" + keys + "/images");
            const imgDogs = await imgResponse.message;
            // Tomar solo 5 imágenes o 5 valores del JSON
            const images = imgDogs.slice(-6, -3);

            images.forEach((imagen) => {
                imagenData(imagen, keys, contenido);
            });
        } catch (error) {
            console.log(error);
        }
    });
}

async function imagenRaza(evento) {
    const valor = evento;
    const contenido = document.getElementById("contenidoAPI");
    contenido.textContent = '';

    try {
        // const urlDataValor = await getAPI("https://dog.ceo/api/breed/" + valor + "/list");
        // const urlData = urlDataValor.message;
        // console.log("Datos de Valores: " + urlData);

        const urlImgList = await getAPI("https://dog.ceo/api/breed/"+valor+"/images");
        const dataUrlImgList = await urlImgList.message.slice(-5);

        dataUrlImgList.forEach((imagen) => {
            imagenData(imagen, valor, contenido)
        })
    } catch (error) {
        console.log(error);
    }
}

function imagenData(data, keys, contenido) {
    let img = document.createElement("img");
    img.src = data;
    img.alt = keys;

    contenido.appendChild(img);

    const state = {
        Checked: false,
    };

    img.addEventListener("click", (e) => {
        if (!state.Checked) {
            state.Checked = true;
            imagenPopup(e.target.src, keys, contenido, state);
        }
    });
}

function imagenPopup(eventoEnlace, keys, contenido, state){
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "flotacion";
    checkbox.id = "flotacion";

    const contenedorFlotante = document.createElement("div");
    contenedorFlotante.classList = "contenedor-flotante";

    const containerImagen = document.createElement("div");
    containerImagen.classList = "container-imagen";

    const label = document.createElement("label");
    label.htmlFor = "flotacion";
    label.classList = "activacion-flotante";

    const icono = document.createElement("i");
    icono.classList = "fa-solid fa-xmark";

    const imagen = document.createElement("img");
    imagen.classList = "imagen-flotante";
    imagen.src = eventoEnlace;
    imagen.alt = keys;

    document.querySelector('main').style.overflowY = "hidden";

    label.appendChild(icono);
    containerImagen.appendChild(imagen);
    contenedorFlotante.appendChild(label);
    contenedorFlotante.appendChild(containerImagen);
    contenido.appendChild(checkbox);
    contenido.appendChild(contenedorFlotante);

    checkbox.addEventListener("click", () => {
        document.querySelector('main').style.overflowY = "scroll";
        state.Checked = false;
        contenido.removeChild(checkbox);
        contenido.removeChild(contenedorFlotante);
    });
}

// Llamado al DOM
getApiDom(urlPerros, createList);
getApiDom(urlPerros, createImage);