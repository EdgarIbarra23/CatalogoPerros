// APIs
const urlPerros = "https://dog.ceo/api/breeds/list/all";

async function getAPI(URL) {
    try {
        const res = await fetch(URL);
        const data = await res.json();
        return data;
        // const breeds = Object.keys(data.message);
        // const breeds = Object.values(data.message);
        // console.log(data);
    } catch (error) {
        console.log(error)        
    }
}

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

        a.addEventListener("click", (e) => {
            console.log("ID: "+e.target.id)
            console.log("Value: "+e.target.value)
        })
    })
}

function createImage(dataDogs) {
    const claves = Object.keys(dataDogs.message);
    const contenido = document.getElementById("contenidoAPI");
    
    claves.forEach(async (keys) => {
        try {
            const imgResponse = await getAPI("https://dog.ceo/api/breed/"+keys+"/images");
            const imgDogs = await imgResponse.message;
            // Tomar solo 5 imagenes o 5 valores del JSON
            const images = await imgDogs.slice(0, 3);

            images.forEach((imagen) => {
                let img = document.createElement("img");
                img.src = imagen;
                img.alt = keys;
        
                contenido.appendChild(img);

                let Checked = false;
                img.addEventListener("click", (e) => {
                    Checked = true;
                    if (Checked) {
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
                        imagen.src = e.target.src;
                        imagen.alt = keys;

                        document.querySelector('main').style.overflow = "hidden";
                        
                        label.appendChild(icono);
                        containerImagen.appendChild(imagen);
                        contenedorFlotante.appendChild(label);
                        contenedorFlotante.appendChild(containerImagen);
                        contenido.appendChild(checkbox);
                        contenido.appendChild(contenedorFlotante);
                        
                        flotacion.addEventListener("click", () => {
                            document.querySelector('main').style.overflow = "scroll";
                            Checked = false;
                            contenido.removeChild(checkbox);
                            contenido.removeChild(contenedorFlotante);
                        })
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }

    });
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

getApiDom(urlPerros, createList);
getApiDom(urlPerros, createImage);








